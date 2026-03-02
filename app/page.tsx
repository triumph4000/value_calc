import Calculator from '@/components/calculator/Calculator'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-[#32373c] font-black text-lg tracking-tight">bridgepointe</span>
            <span className="text-[#17C662] font-black text-lg tracking-tight">technologies</span>
          </div>
          <a
            href="https://www.bridgepointetechnologies.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-[#32373c] transition-colors hidden sm:block font-medium"
          >
            bridgepointetechnologies.com
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 pt-14 pb-12 sm:pt-20 sm:pb-16 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 border border-gray-200 bg-gray-50 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#17C662]" />
            <span className="text-xs font-bold text-[#32373c] tracking-wider uppercase">
              MSP Cross-Sell Opportunity Analyzer
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#32373c] leading-tight mb-5 tracking-tight">
            The &ldquo;Hidden MSP MRR&rdquo;
            <br />
            <span className="text-[#17C662]">Calculator</span>
          </h1>

          <p className="text-xl sm:text-2xl font-semibold text-[#32373c] mb-5 max-w-2xl mx-auto">
            Find out how much revenue is hiding in your existing customer base.
          </p>

          {/* Value prop */}
          <div className="border border-gray-200 bg-gray-50 rounded-2xl px-6 py-5 max-w-2xl mx-auto mb-5 text-left">
            <p className="text-base sm:text-lg font-bold text-[#32373c] mb-2">
              Most MSPs monetize less than{' '}
              <span className="text-[#17C662]">40%</span> of their customer&apos;s total technology wallet.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              See how much recurring revenue you are leaving on the table with missed{' '}
              <span className="text-[#32373c] font-medium">
                Network, UCaaS, CX, Cloud, Colocation, and Security
              </span>{' '}
              cross-sell opportunities.
            </p>
          </div>

          <p className="text-sm text-gray-400 mb-10 font-medium">
            In under <span className="text-[#32373c] font-bold">3 minutes</span>, calculate your untapped cross-sell MRR.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 mb-4">
            {[
              { value: '<40%', label: 'Avg wallet share captured' },
              { value: '10', label: 'Product categories analyzed' },
              { value: '5x', label: 'EBITDA exit valuation model' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-black text-[#32373c]">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-gray-50 py-14 sm:py-20">
        <Calculator />
      </section>

      {/* About */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-20 text-center">
          <p className="text-xs font-bold text-[#17C662] uppercase tracking-widest mb-4">
            About Bridgepointe Technologies
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-[#32373c] mb-5 tracking-tight">
            We help MSPs grow faster — and exit smarter.
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
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
                className="border border-gray-200 bg-gray-50 rounded-full px-4 py-1.5 text-xs text-[#32373c] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-[#32373c] py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Bridgepointe Technologies. All rights reserved.</p>
          <p>Results are estimates based on industry benchmarks. Actual results may vary.</p>
        </div>
      </footer>
    </main>
  )
}
