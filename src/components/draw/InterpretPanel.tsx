'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Spread, DrawnCard } from '@/lib/types';
import { generateInterpretation } from '@/lib/interpret';

interface Props {
  spread: Spread;
  drawnCards: DrawnCard[];
}

export default function InterpretPanel({ spread, drawnCards }: Props) {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const startInterpret = useCallback(async () => {
    setLoading(true);
    setText('');
    setError('');
    setDone(false);

    try {
      const gen = generateInterpretation(drawnCards, spread.slug);
      for await (const chunk of gen) {
        setText((prev) => prev + chunk);
      }
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '解读失败，请重试');
    } finally {
      setLoading(false);
    }
  }, [spread.slug, drawnCards]);

  const formatText = (raw: string) => {
    return raw
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary-light font-semibold">$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="interpretation-area rounded-2xl p-6 sm:p-8 relative overflow-hidden">
      {/* 背景微光 */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-accent/3 blur-3xl pointer-events-none" />

      <div className="relative">
        {/* 标题区 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-primary-light mb-1 flex items-center gap-2">
              <span>🔮</span>
              专业解读
            </h3>
            <p className="text-xs text-foreground/40">
              结合牌阵位置与牌义，由 AI 深度综合分析
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!loading && !done && !text && (
              <motion.button
                key="start"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={startInterpret}
                className="shrink-0 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20
                  text-primary-light border border-primary/20 hover:from-primary/30 hover:to-accent/30
                  transition-all duration-300 font-medium text-sm flex items-center gap-2
                  shadow-lg shadow-primary/5"
              >
                <span className="text-base">✨</span>
                开始解读
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* 加载动画 */}
        {loading && !text && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center py-16 gap-6"
          >
            {/* 星光旋转 */}
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-2 border-primary/10" />
              <div className="absolute inset-2 rounded-full border border-primary/15 animate-spin" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-4 rounded-full border border-accent/15 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary/60 animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-foreground/60 font-medium">正在解读你的牌面...</p>
              <p className="text-xs text-foreground/30">结合 {spread.name} 牌阵结构与牌义分析中</p>
            </div>
          </motion.div>
        )}

        {/* 错误提示 */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-5 rounded-xl bg-red-400/5 border border-red-400/15 text-center"
          >
            <p className="text-red-400/80 text-sm mb-3">{error}</p>
            <button
              onClick={startInterpret}
              className="px-4 py-1.5 rounded-lg bg-red-400/10 text-red-400/90 text-sm hover:bg-red-400/20 transition-colors"
            >
              重试
            </button>
          </motion.div>
        )}

        {/* 解读文本 */}
        {text && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* 文本内容 */}
            <div
              className="text-sm sm:text-base leading-7 text-foreground/75 max-w-none"
              dangerouslySetInnerHTML={{ __html: formatText(text) }}
            />

            {/* 打字光标 */}
            {!done && (
              <span className="typing-cursor text-lg text-primary-light" />
            )}

            {/* 完成后的操作栏 */}
            {done && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5"
              >
                <button
                  onClick={startInterpret}
                  className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-foreground/50
                    hover:text-primary-light hover:bg-white/10 transition-all"
                >
                  🔄 重新解读
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(text);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-foreground/50
                    hover:text-foreground/70 hover:bg-white/10 transition-all"
                >
                  📋 复制全文
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
