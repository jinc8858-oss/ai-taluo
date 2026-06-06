import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TarotCard } from '@/lib/types';
import cardsData from '@/data/cards.json';

const cards: TarotCard[] = cardsData as TarotCard[];

export function generateStaticParams() {
  return cards.map((card) => ({ id: card.id }));
}

const suitLabels: Record<string, string> = {
  major: '大阿尔卡纳',
  wands: '权杖牌组（火元素）',
  cups: '圣杯牌组（水元素）',
  swords: '宝剑牌组（风元素）',
  pentacles: '星币牌组（土元素）',
};

export default async function CardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const card = cards.find((c) => c.id === id);
  if (!card) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <Link href="/" className="text-sm text-foreground/40 hover:text-primary-light transition-colors inline-flex items-center gap-1 mb-6">
        ← 返回首页
      </Link>

      <div className="space-y-8">
        {/* 牌面信息头部 */}
        <div className="flex items-start gap-5">
          <div className="w-16 h-24 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-2xl text-primary/30">
            ✦
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary-light mb-1">
              {card.nameZh}
            </h1>
            <p className="text-sm text-foreground/40 mb-3">
              {card.nameEn} · {suitLabels[card.suit]} · 编号 {card.number}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {card.keywords.map((kw) => (
                <span key={kw} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary-light/80 border border-primary/10">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 正逆位含义 */}
        <section>
          <h2 className="text-base font-semibold text-foreground/80 mb-4">牌义总览</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-green-400/[0.03] border border-green-400/10">
              <h3 className="text-sm font-medium text-green-400 mb-2">正位含义</h3>
              <p className="text-sm text-foreground/60 mb-3">{card.meaning.upright}</p>
              <p className="text-xs text-foreground/40 leading-relaxed">{card.detail.upright}</p>
            </div>
            <div className="p-4 rounded-xl bg-red-400/[0.03] border border-red-400/10">
              <h3 className="text-sm font-medium text-red-400 mb-2">逆位含义</h3>
              <p className="text-sm text-foreground/60 mb-3">{card.meaning.reversed}</p>
              <p className="text-xs text-foreground/40 leading-relaxed">{card.detail.reversed}</p>
            </div>
          </div>
        </section>

        {/* 各领域解读 */}
        <section>
          <h2 className="text-base font-semibold text-foreground/80 mb-4">各领域解读</h2>
          <div className="space-y-3">
            {[
              { label: '💕 爱情', text: card.interpretations.love },
              { label: '💼 事业', text: card.interpretations.career },
              { label: '🌿 健康', text: card.interpretations.health },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <h3 className="text-sm font-medium text-foreground/70 mb-2">{item.label}</h3>
                <p className="text-sm text-foreground/50 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
