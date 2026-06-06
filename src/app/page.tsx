'use client';

import { useState, useMemo } from 'react';
import CategoryTabs from '@/components/home/CategoryTabs';
import SpreadCard from '@/components/home/SpreadCard';
import { categories } from '@/data/categories';
import spreadsData from '@/data/spreads.json';
import { Spread } from '@/lib/types';

const spreads: Spread[] = spreadsData as Spread[];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSpreads = useMemo(() => {
    if (activeCategory === 'all') return spreads;
    return spreads.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-16 md:py-24 text-center">
        {/* 背景光效 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
          <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 rounded-full bg-accent/40 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-primary-light/50 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="text-primary-light">AI 塔罗</span>
            <span className="text-foreground/80"> · 你的灵性向导</span>
          </h1>
          <p className="text-foreground/50 text-base md:text-lg leading-relaxed mb-8">
            静心片刻，在心中提出你的问题<br />
            选择适合的牌阵，让塔罗牌为你揭示答案
          </p>
          <div className="flex items-center justify-center gap-3 text-sm text-foreground/40">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
              免费抽牌
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              AI 专业解读
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
              10种牌阵
            </div>
          </div>
        </div>
      </section>

      {/* 分类标签 */}
      <section className="px-4 pb-6">
        <CategoryTabs
          categories={categories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
      </section>

      {/* 牌阵卡片网格 */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSpreads.map((spread) => (
            <SpreadCard key={spread.slug} spread={spread} />
          ))}
        </div>
        {filteredSpreads.length === 0 && (
          <p className="text-center text-foreground/40 py-12">
            该分类暂无牌阵
          </p>
        )}
      </section>
    </div>
  );
}
