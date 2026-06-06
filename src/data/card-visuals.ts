// 每张塔罗牌的独有视觉配置
export interface CardVisual {
  id: string;
  icon: string;          // 核心符号
  bgGradient: string;    // 背景渐变
  accentColor: string;   // 强调色
  pattern: 'stars' | 'rays' | 'waves' | 'circles' | 'grid' | 'spiral' | 'none';
  secondaryIcon?: string;
  glowColor?: string;
}

export const cardVisuals: Record<string, CardVisual> = {
  // ============ 大阿尔卡纳 (22张) ============
  m00: { id: 'm00', icon: '🌟', bgGradient: 'from-sky-900/50 via-indigo-800/40 to-violet-950/60', accentColor: '#f0c060', pattern: 'stars', secondaryIcon: '⛰️', glowColor: '#f0c060' },
  m01: { id: 'm01', icon: '🔮', bgGradient: 'from-amber-900/40 via-yellow-800/30 to-orange-950/50', accentColor: '#fbbf24', pattern: 'rays', secondaryIcon: '∞', glowColor: '#fbbf24' },
  m02: { id: 'm02', icon: '🌙', bgGradient: 'from-indigo-900/50 via-blue-900/40 to-slate-950/60', accentColor: '#818cf8', pattern: 'waves', secondaryIcon: '📜', glowColor: '#818cf8' },
  m03: { id: 'm03', icon: '🌿', bgGradient: 'from-emerald-900/40 via-green-800/30 to-lime-950/40', accentColor: '#34d399', pattern: 'circles', secondaryIcon: '♀', glowColor: '#34d399' },
  m04: { id: 'm04', icon: '👑', bgGradient: 'from-red-900/50 via-rose-800/40 to-amber-950/50', accentColor: '#f87171', pattern: 'grid', secondaryIcon: '🐏', glowColor: '#f87171' },
  m05: { id: 'm05', icon: '✝️', bgGradient: 'from-stone-800/40 via-zinc-700/30 to-slate-900/50', accentColor: '#a3a3a3', pattern: 'grid', secondaryIcon: '🔑', glowColor: '#d4d4d8' },
  m06: { id: 'm06', icon: '💕', bgGradient: 'from-pink-900/40 via-rose-800/30 to-purple-950/50', accentColor: '#f472b6', pattern: 'rays', secondaryIcon: '👼', glowColor: '#f472b6' },
  m07: { id: 'm07', icon: '⚔️', bgGradient: 'from-slate-800/50 via-zinc-700/40 to-amber-900/40', accentColor: '#fbbf24', pattern: 'rays', secondaryIcon: '🏇', glowColor: '#fbbf24' },
  m08: { id: 'm08', icon: '🦁', bgGradient: 'from-amber-800/40 via-yellow-700/30 to-orange-900/40', accentColor: '#f59e0b', pattern: 'rays', secondaryIcon: '🤝', glowColor: '#f59e0b' },
  m09: { id: 'm09', icon: '🏮', bgGradient: 'from-slate-900/60 via-gray-800/50 to-blue-950/50', accentColor: '#94a3b8', pattern: 'stars', secondaryIcon: '🪄', glowColor: '#e2a03f' },
  m10: { id: 'm10', icon: '🎡', bgGradient: 'from-blue-900/40 via-indigo-800/30 to-purple-900/40', accentColor: '#60a5fa', pattern: 'circles', secondaryIcon: '☸️', glowColor: '#60a5fa' },
  m11: { id: 'm11', icon: '⚖️', bgGradient: 'from-slate-800/40 via-zinc-700/30 to-stone-900/40', accentColor: '#e2e8f0', pattern: 'grid', secondaryIcon: '🗡️', glowColor: '#e2e8f0' },
  m12: { id: 'm12', icon: '🙃', bgGradient: 'from-teal-900/40 via-cyan-800/30 to-blue-950/50', accentColor: '#2dd4bf', pattern: 'waves', secondaryIcon: '🌊', glowColor: '#2dd4bf' },
  m13: { id: 'm13', icon: '🦋', bgGradient: 'from-zinc-900/50 via-neutral-800/40 to-slate-950/60', accentColor: '#a8a29e', pattern: 'spiral', secondaryIcon: '💀', glowColor: '#9b59b6' },
  m14: { id: 'm14', icon: '🏺', bgGradient: 'from-cyan-900/40 via-teal-800/30 to-emerald-950/40', accentColor: '#22d3ee', pattern: 'waves', secondaryIcon: '🌈', glowColor: '#22d3ee' },
  m15: { id: 'm15', icon: '⛓️', bgGradient: 'from-red-950/60 via-rose-900/50 to-black/70', accentColor: '#ef4444', pattern: 'grid', secondaryIcon: '🔥', glowColor: '#ef4444' },
  m16: { id: 'm16', icon: '⚡', bgGradient: 'from-yellow-900/40 via-amber-800/30 to-red-950/50', accentColor: '#fbbf24', pattern: 'rays', secondaryIcon: '🏰', glowColor: '#fbbf24' },
  m17: { id: 'm17', icon: '⭐', bgGradient: 'from-blue-900/40 via-indigo-800/30 to-violet-950/50', accentColor: '#e2e8f0', pattern: 'stars', secondaryIcon: '💧', glowColor: '#c4b5fd' },
  m18: { id: 'm18', icon: '🌙', bgGradient: 'from-violet-950/60 via-indigo-900/50 to-slate-950/60', accentColor: '#a78bfa', pattern: 'waves', secondaryIcon: '🐺', glowColor: '#a78bfa' },
  m19: { id: 'm19', icon: '☀️', bgGradient: 'from-yellow-800/40 via-amber-700/30 to-orange-900/40', accentColor: '#fde047', pattern: 'rays', secondaryIcon: '🌻', glowColor: '#fde047' },
  m20: { id: 'm20', icon: '📯', bgGradient: 'from-sky-900/40 via-blue-800/30 to-indigo-950/50', accentColor: '#7dd3fc', pattern: 'rays', secondaryIcon: '🪽', glowColor: '#7dd3fc' },
  m21: { id: 'm21', icon: '🌍', bgGradient: 'from-emerald-900/40 via-teal-800/30 via-purple-900/40 to-amber-900/40', accentColor: '#34d399', pattern: 'circles', secondaryIcon: '💃', glowColor: '#34d399' },

  // ============ 权杖牌组 — 火元素 (14张) ============
  w01: { id: 'w01', icon: '🔥', bgGradient: 'from-red-900/50 via-orange-800/40 to-amber-950/50', accentColor: '#f97316', pattern: 'rays', secondaryIcon: '🪔', glowColor: '#f97316' },
  w02: { id: 'w02', icon: '🌍', bgGradient: 'from-orange-900/40 via-amber-800/30 to-yellow-950/40', accentColor: '#fbbf24', pattern: 'grid', secondaryIcon: '🗺️', glowColor: '#fbbf24' },
  w03: { id: 'w03', icon: '⛵', bgGradient: 'from-amber-900/40 via-yellow-800/30 to-orange-950/40', accentColor: '#f59e0b', pattern: 'waves', secondaryIcon: '🔭', glowColor: '#f59e0b' },
  w04: { id: 'w04', icon: '🎉', bgGradient: 'from-yellow-800/40 via-amber-700/30 to-orange-900/40', accentColor: '#fde047', pattern: 'circles', secondaryIcon: '🏠', glowColor: '#fde047' },
  w05: { id: 'w05', icon: '⚔️', bgGradient: 'from-red-900/40 via-rose-800/30 to-orange-950/40', accentColor: '#ef4444', pattern: 'rays', secondaryIcon: '🤺', glowColor: '#ef4444' },
  w06: { id: 'w06', icon: '🏆', bgGradient: 'from-amber-800/40 via-yellow-700/30 to-orange-900/40', accentColor: '#fbbf24', pattern: 'rays', secondaryIcon: '🐎', glowColor: '#fbbf24' },
  w07: { id: 'w07', icon: '🛡️', bgGradient: 'from-red-900/50 via-rose-800/40 to-amber-950/50', accentColor: '#f87171', pattern: 'grid', secondaryIcon: '⚔️', glowColor: '#f87171' },
  w08: { id: 'w08', icon: '💨', bgGradient: 'from-orange-900/40 via-amber-800/30 to-yellow-950/40', accentColor: '#fb923c', pattern: 'rays', secondaryIcon: '✈️', glowColor: '#fb923c' },
  w09: { id: 'w09', icon: '🏰', bgGradient: 'from-red-950/50 via-rose-900/40 to-amber-950/50', accentColor: '#f97316', pattern: 'grid', secondaryIcon: '💪', glowColor: '#f97316' },
  w10: { id: 'w10', icon: '🏋️', bgGradient: 'from-stone-800/40 via-red-900/30 to-amber-950/40', accentColor: '#dc2626', pattern: 'grid', secondaryIcon: '📦', glowColor: '#dc2626' },
  w11: { id: 'w11', icon: '📨', bgGradient: 'from-amber-900/40 via-yellow-800/30 to-orange-950/40', accentColor: '#fbbf24', pattern: 'stars', secondaryIcon: '🌱', glowColor: '#fbbf24' },
  w12: { id: 'w12', icon: '🏇', bgGradient: 'from-red-800/40 via-orange-700/30 to-amber-900/40', accentColor: '#f97316', pattern: 'rays', secondaryIcon: '⚡', glowColor: '#f97316' },
  w13: { id: 'w13', icon: '👸', bgGradient: 'from-amber-800/40 via-yellow-700/30 to-orange-900/40', accentColor: '#f59e0b', pattern: 'rays', secondaryIcon: '🐱', glowColor: '#f59e0b' },
  w14: { id: 'w14', icon: '🤴', bgGradient: 'from-red-900/50 via-amber-800/40 to-orange-950/50', accentColor: '#f97316', pattern: 'rays', secondaryIcon: '👑', glowColor: '#f97316' },

  // ============ 圣杯牌组 — 水元素 (14张) ============
  c01: { id: 'c01', icon: '💧', bgGradient: 'from-blue-900/50 via-cyan-800/40 to-sky-950/50', accentColor: '#38bdf8', pattern: 'waves', secondaryIcon: '🕊️', glowColor: '#38bdf8' },
  c02: { id: 'c02', icon: '💑', bgGradient: 'from-sky-900/40 via-blue-800/30 via-rose-900/40 to-pink-950/40', accentColor: '#60a5fa', pattern: 'circles', secondaryIcon: '🤝', glowColor: '#60a5fa' },
  c03: { id: 'c03', icon: '🎊', bgGradient: 'from-cyan-900/40 via-teal-800/30 to-blue-950/40', accentColor: '#22d3ee', pattern: 'circles', secondaryIcon: '🍇', glowColor: '#22d3ee' },
  c04: { id: 'c04', icon: '🤔', bgGradient: 'from-slate-900/50 via-blue-900/40 to-indigo-950/50', accentColor: '#67e8f9', pattern: 'waves', secondaryIcon: '☁️', glowColor: '#67e8f9' },
  c05: { id: 'c05', icon: '😢', bgGradient: 'from-blue-950/50 via-indigo-900/40 to-slate-950/50', accentColor: '#818cf8', pattern: 'waves', secondaryIcon: '💔', glowColor: '#818cf8' },
  c06: { id: 'c06', icon: '🌸', bgGradient: 'from-pink-900/40 via-rose-800/30 to-sky-950/40', accentColor: '#f472b6', pattern: 'circles', secondaryIcon: '🏡', glowColor: '#f472b6' },
  c07: { id: 'c07', icon: '🌈', bgGradient: 'from-purple-900/40 via-violet-800/30 via-blue-900/40 to-cyan-950/50', accentColor: '#c084fc', pattern: 'stars', secondaryIcon: '☁️', glowColor: '#c084fc' },
  c08: { id: 'c08', icon: '🚶', bgGradient: 'from-indigo-950/50 via-slate-900/40 to-blue-950/50', accentColor: '#818cf8', pattern: 'waves', secondaryIcon: '🌄', glowColor: '#818cf8' },
  c09: { id: 'c09', icon: '😊', bgGradient: 'from-sky-800/40 via-blue-700/30 to-cyan-900/40', accentColor: '#7dd3fc', pattern: 'circles', secondaryIcon: '✨', glowColor: '#7dd3fc' },
  c10: { id: 'c10', icon: '🌈', bgGradient: 'from-blue-800/40 via-sky-700/30 via-pink-800/40 to-purple-900/50', accentColor: '#38bdf8', pattern: 'rays', secondaryIcon: '👨‍👩‍👧‍👦', glowColor: '#38bdf8' },
  c11: { id: 'c11', icon: '🐠', bgGradient: 'from-cyan-900/40 via-teal-800/30 to-blue-950/40', accentColor: '#2dd4bf', pattern: 'waves', secondaryIcon: '🎨', glowColor: '#2dd4bf' },
  c12: { id: 'c12', icon: '🤴', bgGradient: 'from-blue-900/40 via-sky-800/30 to-cyan-950/40', accentColor: '#60a5fa', pattern: 'waves', secondaryIcon: '🐎', glowColor: '#60a5fa' },
  c13: { id: 'c13', icon: '👸', bgGradient: 'from-indigo-900/40 via-blue-800/30 to-violet-950/50', accentColor: '#a78bfa', pattern: 'waves', secondaryIcon: '🌊', glowColor: '#a78bfa' },
  c14: { id: 'c14', icon: '🧙', bgGradient: 'from-slate-900/50 via-blue-900/40 to-cyan-950/50', accentColor: '#67e8f9', pattern: 'waves', secondaryIcon: '🌊', glowColor: '#67e8f9' },

  // ============ 宝剑牌组 — 风元素 (14张) ============
  s01: { id: 's01', icon: '⚔️', bgGradient: 'from-slate-800/50 via-zinc-700/40 to-gray-900/50', accentColor: '#e2e8f0', pattern: 'rays', secondaryIcon: '👑', glowColor: '#e2e8f0' },
  s02: { id: 's02', icon: '🤐', bgGradient: 'from-slate-900/50 via-gray-800/40 to-neutral-950/50', accentColor: '#a3a3a3', pattern: 'waves', secondaryIcon: '🌊', glowColor: '#a3a3a3' },
  s03: { id: 's03', icon: '💔', bgGradient: 'from-zinc-900/50 via-slate-800/40 to-gray-950/60', accentColor: '#ef4444', pattern: 'rays', secondaryIcon: '☁️', glowColor: '#ef4444' },
  s04: { id: 's04', icon: '😴', bgGradient: 'from-slate-900/50 via-blue-900/40 to-indigo-950/50', accentColor: '#94a3b8', pattern: 'grid', secondaryIcon: '⛪', glowColor: '#818cf8' },
  s05: { id: 's05', icon: '🏴', bgGradient: 'from-slate-900/50 via-red-900/30 to-gray-950/50', accentColor: '#ef4444', pattern: 'rays', secondaryIcon: '😏', glowColor: '#ef4444' },
  s06: { id: 's06', icon: '⛵', bgGradient: 'from-blue-950/50 via-indigo-900/40 to-slate-950/50', accentColor: '#60a5fa', pattern: 'waves', secondaryIcon: '🌅', glowColor: '#60a5fa' },
  s07: { id: 's07', icon: '🕵️', bgGradient: 'from-slate-950/50 via-gray-900/40 to-neutral-950/50', accentColor: '#78716c', pattern: 'grid', secondaryIcon: '🎪', glowColor: '#78716c' },
  s08: { id: 's08', icon: '🪢', bgGradient: 'from-gray-950/50 via-slate-900/40 to-zinc-950/50', accentColor: '#d4d4d8', pattern: 'grid', secondaryIcon: '😰', glowColor: '#d4d4d8' },
  s09: { id: 's09', icon: '😱', bgGradient: 'from-slate-950/60 via-gray-900/50 to-black/70', accentColor: '#9ca3af', pattern: 'grid', secondaryIcon: '🕛', glowColor: '#9ca3af' },
  s10: { id: 's10', icon: '🌅', bgGradient: 'from-zinc-950/60 via-slate-900/50 to-amber-950/40', accentColor: '#fbbf24', pattern: 'rays', secondaryIcon: '☠️', glowColor: '#fbbf24' },
  s11: { id: 's11', icon: '🔍', bgGradient: 'from-sky-900/40 via-blue-800/30 to-slate-950/40', accentColor: '#7dd3fc', pattern: 'stars', secondaryIcon: '📖', glowColor: '#7dd3fc' },
  s12: { id: 's12', icon: '⚡', bgGradient: 'from-slate-800/50 via-zinc-700/40 to-gray-900/50', accentColor: '#94a3b8', pattern: 'rays', secondaryIcon: '💨', glowColor: '#94a3b8' },
  s13: { id: 's13', icon: '👸', bgGradient: 'from-slate-800/40 via-zinc-700/30 to-gray-900/40', accentColor: '#e2e8f0', pattern: 'grid', secondaryIcon: '⚔️', glowColor: '#e2e8f0' },
  s14: { id: 's14', icon: '🤴', bgGradient: 'from-slate-900/50 via-gray-800/40 to-neutral-950/50', accentColor: '#f1f5f9', pattern: 'grid', secondaryIcon: '👑', glowColor: '#f1f5f9' },

  // ============ 星币牌组 — 土元素 (14张) ============
  p01: { id: 'p01', icon: '🪙', bgGradient: 'from-emerald-900/50 via-green-800/40 to-lime-950/50', accentColor: '#34d399', pattern: 'circles', secondaryIcon: '🌳', glowColor: '#34d399' },
  p02: { id: 'p02', icon: '🎭', bgGradient: 'from-green-900/40 via-emerald-800/30 to-teal-950/40', accentColor: '#2dd4bf', pattern: 'waves', secondaryIcon: '∞', glowColor: '#2dd4bf' },
  p03: { id: 'p03', icon: '🏗️', bgGradient: 'from-stone-800/40 via-emerald-900/30 to-green-950/40', accentColor: '#4ade80', pattern: 'grid', secondaryIcon: '⛪', glowColor: '#4ade80' },
  p04: { id: 'p04', icon: '🔒', bgGradient: 'from-emerald-950/50 via-green-900/40 to-stone-950/50', accentColor: '#10b981', pattern: 'grid', secondaryIcon: '🏰', glowColor: '#10b981' },
  p05: { id: 'p05', icon: '🥶', bgGradient: 'from-slate-900/50 via-gray-800/40 to-emerald-950/40', accentColor: '#6ee7b7', pattern: 'stars', secondaryIcon: '⛪', glowColor: '#6ee7b7' },
  p06: { id: 'p06', icon: '🤲', bgGradient: 'from-green-900/40 via-emerald-800/30 to-lime-950/40', accentColor: '#34d399', pattern: 'circles', secondaryIcon: '⚖️', glowColor: '#34d399' },
  p07: { id: 'p07', icon: '🌳', bgGradient: 'from-emerald-900/40 via-green-800/30 to-stone-950/40', accentColor: '#22c55e', pattern: 'spiral', secondaryIcon: '⏳', glowColor: '#22c55e' },
  p08: { id: 'p08', icon: '🔨', bgGradient: 'from-stone-900/50 via-zinc-800/40 to-amber-950/40', accentColor: '#fbbf24', pattern: 'grid', secondaryIcon: '⚒️', glowColor: '#fbbf24' },
  p09: { id: 'p09', icon: '🦅', bgGradient: 'from-green-800/40 via-emerald-700/30 to-lime-900/40', accentColor: '#34d399', pattern: 'circles', secondaryIcon: '🌺', glowColor: '#34d399' },
  p10: { id: 'p10', icon: '🏰', bgGradient: 'from-emerald-900/50 via-green-800/40 via-amber-900/40 to-yellow-950/50', accentColor: '#4ade80', pattern: 'grid', secondaryIcon: '🏛️', glowColor: '#4ade80' },
  p11: { id: 'p11', icon: '📚', bgGradient: 'from-green-900/40 via-emerald-800/30 to-lime-950/40', accentColor: '#6ee7b7', pattern: 'stars', secondaryIcon: '🎓', glowColor: '#6ee7b7' },
  p12: { id: 'p12', icon: '🐂', bgGradient: 'from-stone-900/50 via-green-900/40 to-emerald-950/50', accentColor: '#4ade80', pattern: 'grid', secondaryIcon: '🐎', glowColor: '#4ade80' },
  p13: { id: 'p13', icon: '👸', bgGradient: 'from-emerald-900/40 via-green-800/30 to-lime-950/40', accentColor: '#34d399', pattern: 'circles', secondaryIcon: '🌿', glowColor: '#34d399' },
  p14: { id: 'p14', icon: '🤴', bgGradient: 'from-green-900/50 via-emerald-800/40 to-stone-950/50', accentColor: '#10b981', pattern: 'grid', secondaryIcon: '🍇', glowColor: '#10b981' },
};

export function getCardVisual(cardId: string): CardVisual {
  return cardVisuals[cardId] || {
    id: cardId,
    icon: '✦',
    bgGradient: 'from-slate-800/40 via-zinc-700/30 to-gray-900/40',
    accentColor: '#e2a03f',
    pattern: 'none',
  };
}
