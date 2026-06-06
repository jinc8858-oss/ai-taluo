import { TarotCard, DrawnCard, Spread } from './types';
import cardsData from '@/data/cards.json';

const allCards: TarotCard[] = cardsData as TarotCard[];

// Fisher-Yates 洗牌算法
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 从78张牌中随机抽取指定数量
export function drawCards(spread: Spread): DrawnCard[] {
  const shuffled = shuffle(allCards);
  return spread.positions.map((pos) => ({
    card: shuffled[pos.index - 1],
    isReversed: Math.random() > 0.5,
    position: pos.index,
  }));
}

// 构建 AI 解读的提示词
export function buildInterpretPrompt(
  spread: Spread,
  drawnCards: DrawnCard[],
  userContext?: string
): string {
  const cardDescriptions = drawnCards
    .map((dc) => {
      const pos = spread.positions.find((p) => p.index === dc.position);
      const direction = dc.isReversed ? '逆位' : '正位';
      return `位置${dc.position}「${pos?.name}」- ${dc.card.nameZh}（${direction}）`;
    })
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
