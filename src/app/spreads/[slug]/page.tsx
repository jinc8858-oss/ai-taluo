'use client';

import { useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import CardFlip from '@/components/draw/CardFlip';
import InterpretPanel from '@/components/draw/InterpretPanel';
import ShareButton from '@/components/share/ShareButton';
import { drawCards } from '@/lib/draw';
import { DrawnCard, Spread } from '@/lib/types';
import spreadsData from '@/data/spreads.json';

const spreads: Spread[] = spreadsData as Spread[];

export default function SpreadPage() {
  const params = useParams();
  const slug = params.slug as string;
  const spread = spreads.find((s) => s.slug === slug);

  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<Set<number>>(new Set());
  const [showCards, setShowCards] = useState(false);
  const [flippingIndex, setFlippingIndex] = useState<number | null>(null);

  const handleDraw = useCallback(() => {
    if (!spread) return;
    const cards = drawCards(spread);
    setDrawnCards(cards);
    setShowCards(true);
    setFlippedIndices(new Set());
    setFlippingIndex(null);

    // 依次翻牌
    let delay = 500;
    for (let i = 0; i < cards.length; i++) {
      setTimeout(() => {
        setFlippingIndex(i);
        setTimeout(() => {
          setFlippedIndices((prev) => {
            const next = new Set(prev);
            next.add(i);
            return next;
          });
          setFlippingIndex(null);
        }, 600);
      }, delay);
      delay += 900;
    }
  }, [spread]);

  const handleCardClick = (index: number) => {
    if (flippingIndex !== null) return;
    if (flippedIndices.has(index)) return;
    setFlippingIndex(index);
    setTimeout(() => {
      setFlippedIndices((prev) => {
        const next = new Set(prev);
        next.add(index);
        return next;
      });
      setFlippingIndex(null);
    }, 600);
  };

  if (!spread) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-foreground/50 text-lg mb-4">该牌阵不存在</p>
        <Link href="/" className="text-primary-light hover:text-primary transition-colors">
          ← 返回首页
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      {/* 返回 + 标题 */}
      <div className="mb-8">
        <Link href="/" className="text-sm text-foreground/40 hover:text-primary-light transition-colors inline-flex items-center gap-1 mb-4">
          ← 返回牌阵列表
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground/90 mb-2">
          {spread.name}
        </h1>
        <p className="text-foreground/50 text-sm leading-relaxed max-w-xl">
          {spread.description}
        </p>
        <div className="flex items-center gap-3 mt-3 text-xs text-foreground/40">
          <span>{spread.cardCount} 张牌</span>
          <span>·</span>
          <span>{spread.category}</span>
          <span>·</span>
          <span>{spread.suitableFor}</span>
        </div>
      </div>

      {/* 牌子布局说明 */}
      {!showCards && (
        <div className="mb-8 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <h3 className="text-sm font-medium text-foreground/70 mb-3">牌阵位置说明</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {spread.positions.map((pos) => (
              <div key={pos.index} className="flex items-start gap-2 text-sm">
                <span className="text-primary-light shrink-0 mt-0.5">{pos.index}.</span>
                <div>
                  <span className="text-foreground/70 font-medium">{pos.name}</span>
                  <span className="text-foreground/40 ml-1">— {pos.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 抽牌按钮 */}
      {!showCards && (
        <div className="text-center py-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDraw}
            className="px-8 py-3 rounded-xl bg-primary/20 text-primary-light border border-primary/30
              hover:bg-primary/30 transition-all duration-300 font-medium text-base
              shadow-lg shadow-primary/10"
          >
            ✨ 开始抽牌
          </motion.button>
          <p className="text-xs text-foreground/30 mt-3">
            点击按钮将从78张塔罗牌中为你随机抽取 {spread.cardCount} 张
          </p>
        </div>
      )}

      {/* 牌面区域 */}
      <AnimatePresence>
        {showCards && drawnCards.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-10"
          >
            {/* 牌阵布局 */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6">
              {drawnCards.map((dc, index) => {
                const pos = spread.positions[index];
                return (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <CardFlip
                      drawnCard={dc}
                      isFlipped={flippedIndices.has(index)}
                      onClick={() => handleCardClick(index)}
                      delay={index * 0.15}
                    />
                    <span className="text-xs text-foreground/40">
                      位置{pos?.index} · {pos?.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 翻牌后显示牌面摘要 */}
            {flippedIndices.size > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {drawnCards
                  .filter((_, i) => flippedIndices.has(i))
                  .map((dc, idx) => {
                    const pos = spread.positions[dc.position - 1];
                    const meaning = dc.isReversed ? dc.card.meaning.reversed : dc.card.meaning.upright;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-primary-light">
                            {pos?.name}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${dc.isReversed ? 'bg-red-400/10 text-red-400' : 'bg-green-400/10 text-green-400'}`}>
                            {dc.isReversed ? '逆' : '正'}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-foreground/80 mb-1">
                          {dc.card.nameZh}
                        </div>
                        <p className="text-xs text-foreground/50 line-clamp-2">{meaning}</p>
                      </motion.div>
                    );
                  })}
              </div>
            )}

            {/* 操作栏：分享 + 重新抽牌 */}
            {flippedIndices.size === drawnCards.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6"
              >
                <ShareButton spread={spread} drawnCards={drawnCards} />
                <button
                  onClick={handleDraw}
                  className="text-sm text-foreground/30 hover:text-primary-light transition-colors"
                >
                  🔄 重新抽牌
                </button>
              </motion.div>
            )}

            {/* 翻完前只显示重新抽牌 */}
            {flippedIndices.size < drawnCards.length && (
              <div className="text-center mt-6">
                <button
                  onClick={handleDraw}
                  className="text-sm text-foreground/30 hover:text-primary-light transition-colors"
                >
                  🔄 重新抽牌
                </button>
              </div>
            )}

            {/* AI 解读面板 */}
            {flippedIndices.size === drawnCards.length && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <InterpretPanel spread={spread} drawnCards={drawnCards} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
