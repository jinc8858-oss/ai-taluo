import Link from 'next/link';
import { Spread } from '@/lib/types';

interface Props {
  spread: Spread;
}

const difficultyLabels: Record<string, { text: string; color: string }> = {
  beginner: { text: '入门', color: 'text-green-400' },
  intermediate: { text: '进阶', color: 'text-primary-light' },
  advanced: { text: '深度', color: 'text-accent' },
};

export default function SpreadCard({ spread }: Props) {
  const diff = difficultyLabels[spread.difficulty];

  return (
    <Link
      href={`/spreads/${spread.slug}`}
      className="group block p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]
        hover:bg-white/[0.06] hover:border-primary/20 transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-semibold text-foreground/90 group-hover:text-primary-light transition-colors">
          {spread.name}
        </h3>
        <span className={`text-xs ${diff.color} bg-white/5 px-2 py-0.5 rounded-full shrink-0 ml-2`}>
          {spread.cardCount}张 · {diff.text}
        </span>
      </div>
      <p className="text-sm text-foreground/50 leading-relaxed mb-3 line-clamp-2">
        {spread.description}
      </p>
      <div className="text-xs text-foreground/30">
        {spread.suitableFor}
      </div>
    </Link>
  );
}
