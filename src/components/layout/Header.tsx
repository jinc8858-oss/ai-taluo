'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-[#0f0f1a]/80 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">✨</span>
          <span className="text-lg font-semibold tracking-wide text-primary-light group-hover:text-primary transition-colors">
            AI 塔罗
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="text-foreground/70 hover:text-primary-light transition-colors">
            牌阵
          </Link>
          <Link href="/about" className="text-foreground/70 hover:text-primary-light transition-colors">
            关于
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground/70 hover:text-primary-light transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="菜单"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-surface/95 backdrop-blur-lg">
          <nav className="flex flex-col p-4 gap-3 text-sm">
            <Link href="/" className="text-foreground/70 hover:text-primary-light transition-colors" onClick={() => setMobileOpen(false)}>
              牌阵列表
            </Link>
            <Link href="/about" className="text-foreground/70 hover:text-primary-light transition-colors" onClick={() => setMobileOpen(false)}>
              关于
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
