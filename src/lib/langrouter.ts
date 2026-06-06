// LangRouter API 封装 — 调用 DeepSeek V4 pro 进行 AI 解读
// 根据用户配置，LangRouter 是本地代理服务

const LANGROUTER_BASE = process.env.LANGROUTER_URL || 'http://localhost:8080';

export async function* streamInterpret(prompt: string): AsyncGenerator<string> {
  const response = await fetch(`${LANGROUTER_BASE}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'deepseek-v4-pro',
      messages: [
        {
          role: 'system',
          content: '你是一位温暖、专业的塔罗牌解读师。请用中文回复，语气温和有深度。',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      stream: true,
      temperature: 0.8,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`LangRouter API 错误: ${response.status} ${errorText}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('无法读取响应流');
  }

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
        if (data === '[DONE]') return;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            yield content;
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
