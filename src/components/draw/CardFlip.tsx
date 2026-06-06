'use client';

import { motion } from 'framer-motion';
import { DrawnCard } from '@/lib/types';
import { getCardVisual, CardVisual } from '@/data/card-visuals';

interface Props {
  drawnCard: DrawnCard;
  isFlipped: boolean;
  onClick?: () => void;
  delay?: number;
}

// 图案装饰组件
function CardPattern({ pattern, color }: { pattern: CardVisual['pattern']; color: string }) {
  const c = color + '20';
  const c2 = color + '10';

  switch (pattern) {
    case 'stars':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[[15, 20], [70, 15], [25, 60], [80, 50], [50, 75], [10, 40], [85, 70], [60, 30]].map(([x, y], i) => (
            <div key={i} className="absolute text-[8px] opacity-30"
              style={{ left: `${x}%`, top: `${y}%`, color: c }}>
              ✦
            </div>
          ))}
        </div>
      );
    case 'rays':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ background: `conic-gradient(from 0deg at 40% 30%, transparent, ${c} 5deg, transparent 10deg, transparent 30deg, ${c2} 35deg, transparent 40deg, transparent 60deg, ${c} 65deg, transparent 70deg, transparent 90deg, ${c2} 95deg, transparent 100deg)` }} />
      );
    case 'waves':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="absolute w-full h-px opacity-20"
              style={{
                background: `linear-gradient(90deg, transparent, ${c}, transparent)`,
                top: `${25 + i * 20}%`,
                transform: `scaleY(${1 + i * 1.5})`,
              }}
            />
          ))}
          {[0, 1, 2].map((i) => (
            <div key={`w${i}`} className="absolute w-full h-px opacity-10"
              style={{
                background: `linear-gradient(90deg, transparent, ${c2}, transparent)`,
                top: `${35 + i * 20}%`,
                transform: `scaleY(${1.5 + i * 1.2})`,
              }}
            />
          ))}
        </div>
      );
    case 'circles':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[[50, 40, 60], [50, 40, 45], [50, 40, 30], [75, 65, 25], [25, 70, 20]].map(([x, y, s], i) => (
            <div key={i} className="absolute rounded-full border opacity-15"
              style={{
                left: `${x}%`, top: `${y}%`,
                width: `${s}%`, paddingBottom: `${s}%`,
                transform: 'translate(-50%, -50%)',
                borderColor: i % 2 === 0 ? c : c2,
              }}
            />
          ))}
        </div>
      );
    case 'grid':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />
        </div>
      );
    case 'spiral':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="absolute rounded-full border opacity-10"
              style={{
                left: '50%', top: '50%',
                width: `${20 + i * 15}%`,
                paddingBottom: `${20 + i * 15}%`,
                transform: 'translate(-50%, -50%)',
                borderColor: i % 2 === 0 ? c : c2,
                borderWidth: i === 0 ? '2px' : '1px',
              }}
            />
          ))}
        </div>
      );
    default:
      return null;
  }
}

export default function CardFlip({ drawnCard, isFlipped, onClick, delay = 0 }: Props) {
  const { card, isReversed } = drawnCard;
  const visual = getCardVisual(card.id);

  return (
    <motion.div
      className="card-container cursor-pointer select-none"
      style={{ width: 150, height: 240 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={isFlipped ? { scale: 1.05, y: -4 } : { scale: 1.02 }}
    >
      <motion.div
        className="card-inner"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ============ 牌背面 ============ */}
        <div className="card-back rounded-2xl border-2 border-primary/25 bg-gradient-to-br from-[#161630] via-[#1a1a38] to-[#12122a] flex items-center justify-center overflow-hidden shadow-lg shadow-black/30">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-3 rounded-xl border border-primary/15" />
            <div className="absolute inset-5 rounded-lg border border-primary/10" />
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-primary/30 rounded-tl" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-primary/30 rounded-tr" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-primary/30 rounded-bl" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-primary/30 rounded-br" />
            <div className="text-center z-10">
              <div className="relative w-16 h-16 mx-auto mb-2">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rotate-45 border border-primary/20" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rotate-45 border border-primary/15" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-2xl opacity-70">✦</div>
              </div>
              <div className="text-[9px] text-primary/35 tracking-[0.3em] font-medium">TAROT</div>
            </div>
          </div>
        </div>

        {/* ============ 牌正面 ============ */}
        <div
          className="card-front rounded-2xl border-2 shadow-lg shadow-black/40 flex flex-col overflow-hidden relative"
          style={{
            transform: 'rotateY(180deg)',
            borderColor: visual.accentColor + '50',
            background: `linear-gradient(180deg, ${visual.accentColor}15 0%, #0f0f1e 40%, #0f0f1e 85%, ${visual.accentColor}10 100%)`,
          }}
        >
          {/* 装饰图案 */}
          <CardPattern pattern={visual.pattern} color={visual.accentColor} />

          {/* 顶部标题栏 */}
          <div
            className="shrink-0 px-3 py-2.5 text-center border-b relative z-10"
            style={{
              background: `linear-gradient(180deg, ${visual.accentColor}25, transparent)`,
              borderColor: visual.accentColor + '20',
            }}
          >
            <div
              className={`text-[10px] font-medium mb-1 tracking-wider ${
                isReversed ? 'text-red-400/80' : 'text-emerald-400/80'
              }`}
            >
              {isReversed ? '▼ 逆位 ▼' : '▲ 正位 ▲'}
            </div>
            <div className="text-sm font-bold leading-tight" style={{ color: visual.accentColor }}>
              {card.nameZh}
            </div>
            <div className="text-[9px] text-foreground/20 mt-0.5 font-serif italic">
              {card.nameEn}
            </div>
          </div>

          {/* 主视觉区 */}
          <div className="flex-1 flex flex-col items-center justify-center p-3 relative z-10">
            {/* 发光背景 */}
            {visual.glowColor && (
              <div
                className="absolute inset-0 rounded-full opacity-20 blur-2xl pointer-events-none"
                style={{
                  backgroundColor: visual.glowColor,
                  width: '70%',
                  height: '50%',
                  left: '15%',
                  top: '25%',
                }}
              />
            )}

            {/* 主符号 */}
            <div
              className="text-4xl mb-1.5 relative"
              style={{
                filter: `drop-shadow(0 0 12px ${visual.accentColor}50) drop-shadow(0 0 4px ${visual.accentColor}30)`,
              }}
            >
              {visual.icon}
            </div>

            {/* 副符号 */}
            {visual.secondaryIcon && (
              <div className="text-xl mb-2 opacity-50" style={{ color: visual.accentColor }}>
                {visual.secondaryIcon}
              </div>
            )}

            {/* 牌组标识 */}
            <div className="text-[9px] tracking-[0.2em] mb-2 opacity-40" style={{ color: visual.accentColor }}>
              {card.suit === 'major'
                ? 'MAJOR ARCANA'
                : card.suit === 'wands'
                ? 'WANDS · 权杖'
                : card.suit === 'cups'
                ? 'CUPS · 圣杯'
                : card.suit === 'swords'
                ? 'SWORDS · 宝剑'
                : 'PENTACLES · 星币'}
            </div>

            {/* 关键词 */}
            <div className="flex flex-wrap justify-center gap-1">
              {card.keywords.slice(0, 3).map((kw) => (
                <span
                  key={kw}
                  className="text-[9px] px-1.5 py-0.5 rounded-full border"
                  style={{
                    color: visual.accentColor + 'cc',
                    borderColor: visual.accentColor + '20',
                    backgroundColor: visual.accentColor + '08',
                  }}
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* 底部 */}
          <div className="shrink-0 relative z-10">
            <div
              className="h-0.5"
              style={{ background: `linear-gradient(90deg, transparent, ${visual.accentColor}40, transparent)` }}
            />
            {isReversed && (
              <div className="text-center py-0.5">
                <span className="text-[10px] opacity-30" style={{ color: visual.accentColor }}>⟲</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
