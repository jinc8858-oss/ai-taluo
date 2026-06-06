// 客户端塔罗解读（静态导出模式，无需后端 API）
import { Spread, TarotCard, DrawnCard } from './types';
import cardsData from '@/data/cards.json';
import spreadsData from '@/data/spreads.json';

const allCards: TarotCard[] = cardsData as TarotCard[];
const allSpreads: Spread[] = spreadsData as Spread[];

function buildLocalInterpretation(
  spread: Spread,
  drawnCards: DrawnCard[]
): string {
  const parts: string[] = [];

  parts.push('**整体概览**');
  const cardNames = drawnCards
    .map((dc) => {
      const dir = dc.isReversed ? '逆位' : '正位';
      return `${dc.card.nameZh}（${dir}）`;
    })
    .join('、');
  parts.push(`你抽到的牌阵【${spread.name}】显示出${drawnCards.length}张牌：${cardNames}。这些牌共同描绘了你当前处境的能量图景，每张牌都携带独特的信息，它们的组合为你揭示了一条清晰的脉络。`);
  parts.push('');

  parts.push('**逐牌解读**');
  for (const dc of drawnCards) {
    const pos = spread.positions.find((p) => p.index === dc.position);
    const dirLabel = dc.isReversed ? '逆位' : '正位';
    const detail = dc.isReversed ? dc.card.detail.reversed : dc.card.detail.upright;
    parts.push(`「${pos?.name || ''}」— ${dc.card.nameZh}（${dirLabel}）`);
    parts.push(detail);
    parts.push('');
  }

  parts.push('**综合解析**');
  const combined = drawnCards
    .map((dc) => {
      const pos = spread.positions.find((p) => p.index === dc.position);
      const meaning = dc.isReversed ? dc.card.meaning.reversed : dc.card.meaning.upright;
      return `在「${pos?.name || ''}」位置上出现了${dc.card.nameZh}（${dc.isReversed ? '逆位' : '正位'}），${meaning}`;
    })
    .join('；');
  parts.push(`${combined}。将这些牌串联起来，可以看到一个清晰的故事在展开。牌阵的每个位置之间有着内在的联系和呼应，它们共同构成了一幅关于你内心世界的完整图景。请记住，牌面所揭示的是一种趋势和能量的流动，你作为生命的主人，始终拥有选择的权利。`);
  parts.push('');

  parts.push('**行动建议**');
  parts.push('1. 安静下来，回顾今天抽到的每一张牌，感受它们在你生活中的具体对应。觉察是改变的第一步。');
  parts.push('2. 关注那些让你感到共鸣的牌面信息——它们往往指向你最需要关注的生命领域。将这份觉察转化为一个小小的行动。');
  parts.push('3. 无论牌面传达的是顺境还是挑战，都以开放的心态接纳。每一次凝视塔罗牌，都是一次与自己内心对话的机会。带着这份来自内在的指引，勇敢而温柔地走好接下来的路。');

  return parts.join('\n');
}

export async function* generateInterpretation(
  drawnCards: DrawnCard[],
  spreadSlug: string
): AsyncGenerator<string> {
  const spread = allSpreads.find((s) => s.slug === spreadSlug);
  if (!spread) throw new Error('牌阵不存在');

  const text = buildLocalInterpretation(spread, drawnCards);
  const chars = text.split('');
  for (let i = 0; i < chars.length; i++) {
    yield chars[i];
    if (i % 4 === 0) {
      await new Promise((r) => setTimeout(r, 8));
    }
  }
}
