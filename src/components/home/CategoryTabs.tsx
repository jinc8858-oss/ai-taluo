'use client';

import { SpreadCategory } from '@/lib/types';

interface Props {
  categories: SpreadCategory[];
  active: string;
  onSelect: (slug: string) => void;
}

export default function CategoryTabs({ categories, active, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onSelect(cat.slug)}
          className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
            active === cat.slug
              ? 'bg-primary/20 text-primary-light border border-primary/40'
              : 'bg-white/5 text-foreground/60 border border-transparent hover:bg-white/10 hover:text-foreground/80'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
