import Calculator from '@/components/calculator/Calculator'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      {/* Nav bar */}
      <nav className="border-b border-[#2A2A2A] bg-[#0D0D0D]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white font-black text-xl tracking-tight">bridgepointe</span>
            <span className="text-[#17C662] font-black text-xl tracking-tight">technologies</span>
          </div>
          <a
            href="https://www.bridgepointetechnologies.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#6B7280] hover:text-white transition-colors hidden sm:block"
          >
            bridgepointetechnologies.com
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Subtle green glow top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#17C662]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-12 sm:pt-24 sm:pb-20 text-center">
          {/* Eyebrow tag */}
          <div className="inline-flex items-center gap-2 border border-[#17C662]/30 bg-[#17C662]/5 rounded-full px-4 py-1.5 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#17C662] animate-pulse" />
            <span className="text-xs font-bold text-[#17C662] tracking-widest uppercase">
              MSP Cross-Sell Opportunity Analyzer
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
            The &ldquo;Hidden MSP MRR&rdquo;
            <br />
            <span className="text-[#17C662]">Calculator</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl font-semibold text-white/80 mb-6 max-w-2xl mx-auto">
            Find out how much revenue is hiding in your existing customer base.
          </p>

          {/* Value prop box */}
          <div className="border border-[#2A2A2A] bg-[#161616] rounded-2xl px-6 py-6 max-w-2xl mx-auto mb-6 text-left">
            <p className="text-base sm:text-lg font-bold text-white mb-2">
              Most MSPs monetize less than{' '}
              <span className="text-[#17C662]">40%</span> of their customer&apos;s total technology wallet.
            </p>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              See how much recurring revenue you are leaving on the table with missed{' '}
              <span className="text-white/70">
                Network, UCaaS, CX, Cloud, Colocation, and Security
              </span>{' '}
              cross-sell opportunities.
            </p>
          </div>

          <p className="text-sm text-[#6B7280] mb-10">
            In under{' '}
            <span className="text-white font-bold">3 minutes</span>, calculate your untapped
            cross-sell MRR.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 mb-14">
            {[
              { value: '<40%', label: 'Avg wallet share captured' },
              { value: '10', label: 'Product categories analyzed' },
              { value: '5x', label: 'EBITDA exit valuation model' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-black text-[#17C662]">{stat.value}</p>
                <p className="text-xs text-[#6B7280] mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="pb-24 sm:pb-36">
        <Calculator />
      </section>

      {/* About Bridgepointe */}
      <section className="border-t border-[#2A2A2A] bg-[#161616]">
        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-20 text-center">
          <p className="text-xs font-bold text-[#17C662] uppercase tracking-widest mb-4">
            About Bridgepointe Technologies
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-5 tracking-tight">
            We help MSPs grow faster — and exit smarter.
          </h2>
          <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
            Bridgepointe is a technology advisory firm with deep expertise in MSP operations,
            cross-sell strategy, and exit planning. We specialize in helping managed service
            providers unlock the revenue already hiding in their customer base — across Network,
            UCaaS, Security, Cloud, and CX solutions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              'Network / SD-WAN / SASE',
              'UCaaS / CCaaS',
              'Cybersecurity',
              'Cloud / Colocation',
              'MSP M&A Advisory',
            ].map((tag) => (
              <span
                key={tag}
                className="border border-[#2A2A2A] bg-[#0D0D0D] rounded-full px-4 py-1.5 text-xs text-white/60 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2A2A2A] py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
          <p>&copy; {new Date().getFullYear()} Bridgepointe Technologies. All rights reserved.</p>
          <p>Results are estimates based on industry benchmarks. Actual results may vary.</p>
        </div>
      </footer>
    </main>
  )
}
