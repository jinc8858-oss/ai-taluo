'use client';

import { useState } from 'react';
import { Spread, DrawnCard } from '@/lib/types';

interface Props {
  spread: Spread;
  drawnCards: DrawnCard[];
  interpretation?: string;
}

export default function ShareButton({ spread, drawnCards, interpretation }: Props) {
  const [copied, setCopied] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const buildShareText = () => {
    const lines: string[] = [];
    lines.push(`🔮 AI 塔罗 · ${spread.name}`);
    lines.push('');
    for (const dc of drawnCards) {
      const pos = spread.positions.find((p) => p.index === dc.position);
      const dir = dc.isReversed ? '逆位' : '正位';
      lines.push(`【${pos?.name || ''}】${dc.card.nameZh} ${dir}`);
    }
    lines.push('');
    lines.push('✨ 免费在线抽牌 + AI 专业解读');
    lines.push(window.location.href);
    return lines.join('\n');
  };

  const handleShare = async () => {
    const text = buildShareText();

    // 尝试原生分享
    if (navigator.share) {
      try {
        await navigator.share({
          title: `AI 塔罗 · ${spread.name}`,
          text: text,
          url: window.location.href,
        });
        return;
      } catch {
        // 用户取消或不可用，降级到复制
      }
    }

    // 降级：复制到剪贴板
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 最后的降级方案
    }
  };

  const shareText = buildShareText();

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10
            text-sm text-foreground/60 hover:text-foreground/80 hover:bg-white/10
            transition-all duration-200"
        >
          {copied ? (
            <>
              <span className="text-green-400">✓</span>
              已复制
            </>
          ) : (
            <>
              <span>📤</span>
              分享结果
            </>
          )}
        </button>

        <button
          onClick={() => setShowPanel(!showPanel)}
          className="px-3 py-2 rounded-xl bg-white/5 border border-white/10
            text-sm text-foreground/40 hover:text-foreground/60 hover:bg-white/10
            transition-all duration-200"
        >
          {showPanel ? '收起' : '📋'}
        </button>
      </div>

      {/* 展开的分享面板 */}
      {showPanel && (
        <div className="absolute top-full mt-2 right-0 z-20 w-80 p-4 rounded-xl bg-surface border border-white/10 shadow-xl shadow-black/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-foreground/50 font-medium">分享文本预览</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareText);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-xs px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-primary-light/70 transition-colors"
            >
              {copied ? '已复制 ✓' : '复制'}
            </button>
          </div>
          <pre className="text-xs text-foreground/60 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
            {shareText}
          </pre>
        </div>
      )}
    </div>
  );
}
