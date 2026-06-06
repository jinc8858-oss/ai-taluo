export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface/30">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-xs text-foreground/40 space-y-2">
        <p>
          本网站仅供娱乐和自我探索，AI解读结果仅供参考，不应视为专业建议。
        </p>
        <p>
          塔罗牌是一种自我反思的工具，请以积极和理性的态度对待每一次解读。
        </p>
        <p>&copy; {new Date().getFullYear()} AI 塔罗 — 用心倾听你内在的声音</p>
      </div>
    </footer>
  );
}
