import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 md:py-16">
      <Link href="/" className="text-sm text-foreground/40 hover:text-primary-light transition-colors inline-flex items-center gap-1 mb-8">
        ← 返回首页
      </Link>

      <h1 className="text-2xl md:text-3xl font-bold text-primary-light mb-8">关于 AI 塔罗</h1>

      <div className="space-y-6 text-sm text-foreground/60 leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-foreground/80 mb-3">这是什么？</h2>
          <p>
            AI 塔罗是一个免费的在线塔罗牌抽牌和解读平台。我们结合了传统塔罗牌的智慧与 AI 技术，为你的每一个问题提供温暖、深入的专业级解读。
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground/80 mb-3">AI 解读原理</h2>
          <p>
            当你完成抽牌后，系统会将你抽到的牌面、牌阵位置含义以及正逆位信息发送给 AI 模型。
            AI 会以资深塔罗解读师的角色，结合塔罗牌的传统象征意义和牌阵的逻辑结构，
            为你生成一份结构化的解读——包括整体概览、逐牌解读、综合解析和行动建议。
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground/80 mb-3">使用提示</h2>
          <ul className="space-y-2">
            <li>· 抽牌前先静下来，在心中明确你真正想问的问题</li>
            <li>· 选择与你的问题最匹配的牌阵</li>
            <li>· AI 解读仅供参考和自我反思，结果不应被视为绝对的命运预言</li>
            <li>· 面对挑战牌时，理解它们是成长的契机而非困境</li>
            <li>· 你永远拥有自由意志和选择的权利</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground/80 mb-3">免责声明</h2>
          <p>
            本网站仅供娱乐和自我探索之用。所有抽牌结果和 AI 解读仅供参考，
            不应替代专业的心理咨询、医疗建议或法律意见。请以积极和理性的态度对待每一次解读。
          </p>
        </section>
      </div>
    </div>
  );
}
