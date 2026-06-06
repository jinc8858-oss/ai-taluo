import { NextRequest } from 'next/server';
import spreadsData from '@/data/spreads.json';
import cardsData from '@/data/cards.json';
import { Spread, TarotCard, InterpretRequest } from '@/lib/types';

const spreads: Spread[] = spreadsData as Spread[];
const cards: TarotCard[] = cardsData as TarotCard[];

function buildPrompt(
  spread: Spread,
  reqCards: InterpretRequest['cards'],
  userContext?: string
): string {
  const cardDescriptions = reqCards
    .map((rc) => {
      const pos = spread.positions.find((p) => p.index === rc.position);
      const card = cards.find((c) => c.id === rc.cardId);
      if (!card) return '';
      const direction = rc.isReversed ? '逆位' : '正位';
      const meaning = rc.isReversed ? card.meaning.reversed : card.meaning.upright;
      return `位置${rc.position}「${pos?.name || ''}」- ${card.nameZh}（${direction}）—— ${meaning}`;
    })
    .filter(Boolean)
    .join('\n');

  const positionDescriptions = spread.positions
    .map((p) => `位置${p.index}「${p.name}」：${p.description}`)
    .join('\n');

  return `你是一位经验丰富的塔罗牌解读师，拥有20年解读经验。你的风格温暖、有深度、充满人文关怀。

用户选择牌阵：【${spread.name}】（${spread.description}）
用户背景信息：${userContext || '无'}

抽牌结果如下：
${cardDescriptions}

牌阵位置参考含义：
${positionDescriptions}

请在解读时结合牌阵位置含义和每张牌的传统意义，按以下结构给出解读：

1. **整体概览** —— 用2-3句话概括整体能量趋势
2. **逐牌解读** —— 每张牌结合其所在位置的含义，说明与用户问题的关联
3. **综合解析** —— 将各牌关联起来，合成一个完整的故事线
4. **行动建议** —— 给出3条具体可行的建议

请注意：
- 用语温暖正面，即使遇到挑战牌也解读为成长的契机
- 不要绝对化预测（不用"一定会""绝对不会"等词）
- 鼓励用户主动选择，而非被动接受命运
- 使用中文回复`;
}

// 本地降级：当 AI 不可用时，基于牌义数据生成结构化解读
function buildLocalInterpretation(
  spread: Spread,
  reqCards: InterpretRequest['cards']
): string {
  const parts: string[] = [];

  // 整体概览
  parts.push('**整体概览**');
  const cardNames = reqCards
    .map((rc) => {
      const card = cards.find((c) => c.id === rc.cardId);
      const dir = rc.isReversed ? '逆位' : '正位';
      return card ? `${card.nameZh}（${dir}）` : '';
    })
    .filter(Boolean)
    .join('、');
  parts.push(`你抽到的牌阵【${spread.name}】显示出${reqCards.length}张牌：${cardNames}。这些牌共同描绘了你当前处境的能量图景。每张牌都携带独特的信息，它们的组合为你揭示了一条清晰的脉络。`);
  parts.push('');

  // 逐牌解读
  parts.push('**逐牌解读**');
  for (const rc of reqCards) {
    const pos = spread.positions.find((p) => p.index === rc.position);
    const card = cards.find((c) => c.id === rc.cardId);
    if (!card) continue;
    const dirLabel = rc.isReversed ? '逆位' : '正位';
    const detail = rc.isReversed ? card.detail.reversed : card.detail.upright;

    parts.push(`「${pos?.name || ''}」— ${card.nameZh}（${dirLabel}）`);
    parts.push(detail);
    parts.push('');
  }

  // 综合解析
  parts.push('**综合解析**');
  const combinedMeanings = reqCards
    .map((rc) => {
      const card = cards.find((c) => c.id === rc.cardId);
      const pos = spread.positions.find((p) => p.index === rc.position);
      if (!card) return '';
      const meaning = rc.isReversed ? card.meaning.reversed : card.meaning.upright;
      return `在「${pos?.name || ''}」位置上出现了${card.nameZh}（${rc.isReversed ? '逆位' : '正位'}），${meaning}`;
    })
    .filter(Boolean)
    .join('；');
  parts.push(`${combinedMeanings}。将这些牌串联起来，可以看到一个清晰的故事在展开。牌阵的每个位置之间有着内在的联系和呼应，它们不是孤立的符号，而是共同构成了一幅关于你内心世界的完整图景。请记住，牌面所揭示的是一种趋势和能量的流动，你作为生命的主人，始终拥有选择的权利。`);
  parts.push('');

  // 行动建议
  parts.push('**行动建议**');
  parts.push('1. 安静下来，回顾今天抽到的每一张牌，感受它们在你生活中的具体对应。觉察是改变的第一步。');
  parts.push('2. 关注那些让你感到共鸣的牌面信息——它们往往指向你最需要关注的生命领域。将这份觉察转化为一个小小的行动。');
  parts.push('3. 无论牌面传达的是顺境还是挑战，都以开放的心态接纳。每一次凝视塔罗牌，都是一次与自己内心对话的机会。带着这份来自内在的指引，勇敢而温柔地走好接下来的路。');

  return parts.join('\n');
}

// 从 ReadableStream 转发 AI 流式响应的每一块内容
async function forwardAIStream(
  aiResponse: Response,
  encoder: TextEncoder,
  controller: ReadableStreamDefaultController<Uint8Array>
): Promise<void> {
  const reader = aiResponse.body?.getReader();
  if (!reader) throw new Error('无法获取AI响应流');

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;

        const data = trimmed.slice(6);
        if (data === '[DONE]') {
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          return;
        }

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            controller.enqueue(encoder.encode(`data: ${content}\n\n`));
          }
        } catch {
          // 跳过无法解析的行
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

// 模拟流式输出本地解读（逐字符发送）
async function streamLocalText(
  text: string,
  encoder: TextEncoder,
  controller: ReadableStreamDefaultController<Uint8Array>
): Promise<void> {
  const chars = text.split('');
  for (let i = 0; i < chars.length; i++) {
    controller.enqueue(encoder.encode(`data: ${chars[i]}\n\n`));
    // 适当延迟让打字机效果更明显，但不要太慢
    if (i % 3 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }
  controller.enqueue(encoder.encode('data: [DONE]\n\n'));
}

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();

  try {
    const body: InterpretRequest = await request.json();
    const { spread: spreadSlug, cards: reqCards, userContext } = body;

    const spread = spreads.find((s) => s.slug === spreadSlug);
    if (!spread) {
      return Response.json({ error: '牌阵不存在' }, { status: 400 });
    }

    if (!reqCards || reqCards.length !== spread.cardCount) {
      return Response.json({ error: '牌数与牌阵不匹配' }, { status: 400 });
    }

    const prompt = buildPrompt(spread, reqCards, userContext);
    const langrouterUrl = process.env.LANGROUTER_URL || 'http://localhost:8080';

    // 尝试调用 AI
    let aiResponse: Response | null = null;
    let useLocalFallback = false;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      aiResponse = await fetch(`${langrouterUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'deepseek-v4-pro',
          messages: [
            {
              role: 'system',
              content: '你是一位温暖、专业的塔罗牌解读师。请用中文回复，语气温和有深度。',
            },
            { role: 'user', content: prompt },
          ],
          stream: true,
          temperature: 0.8,
          max_tokens: 4096,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
    } catch {
      useLocalFallback = true;
    }

    // AI 返回错误状态码也降级
    if (aiResponse && !aiResponse.ok) {
      console.warn('LangRouter returned status:', aiResponse.status);
      useLocalFallback = true;
    }

    const stream = new ReadableStream({
      async start(controller) {
        try {
          if (aiResponse && !useLocalFallback) {
            await forwardAIStream(aiResponse, encoder, controller);
          } else {
            // 本地降级生成
            const localText = buildLocalInterpretation(spread, reqCards);
            await streamLocalText(localText, encoder, controller);
          }
        } catch (err) {
          // 转发过程出错，回退到本地生成
          try {
            const localText = buildLocalInterpretation(spread, reqCards);
            await streamLocalText(localText, encoder, controller);
          } catch (fallbackErr) {
            const errorMsg = fallbackErr instanceof Error ? fallbackErr.message : 'Unknown error';
            controller.enqueue(encoder.encode(`error: ${errorMsg}\n\n`));
            controller.close();
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (err) {
    console.error('Interpret API error:', err);
    return Response.json({ error: '服务器内部错误' }, { status: 500 });
  }
}
