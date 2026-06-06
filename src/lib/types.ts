// 牌组类型
export type Suit = 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';

// 单张塔罗牌
export interface TarotCard {
  id: string;
  nameZh: string;
  nameEn: string;
  suit: Suit;
  number: number;
  keywords: string[];
  meaning: {
    upright: string;
    reversed: string;
  };
  detail: {
    upright: string;
    reversed: string;
  };
  interpretations: {
    love: string;
    career: string;
    health: string;
  };
}

// 牌阵中的位置定义
export interface SpreadPosition {
  index: number;
  name: string;
  description: string;
}

// 牌阵定义
export interface Spread {
  slug: string;
  name: string;
  category: string;
  cardCount: number;
  description: string;
  suitableFor: string;
  positions: SpreadPosition[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// 牌阵分类
export interface SpreadCategory {
  slug: string;
  name: string;
}

// 抽出的牌结果
export interface DrawnCard {
  card: TarotCard;
  isReversed: boolean;
  position: number;
}

// AI解读请求
export interface InterpretRequest {
  spread: string;
  userContext?: string;
  cards: {
    cardId: string;
    isReversed: boolean;
    position: number;
  }[];
}
