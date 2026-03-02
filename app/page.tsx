import Calculator from '@/components/calculator/Calculator'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-900 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-12 sm:pt-24 sm:pb-16 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase">
              Powered by Bridgepointe
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              &ldquo;Hidden MSP MRR&rdquo;
            </span>
            <br />
            Calculator
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl font-semibold text-slate-300 mb-4 max-w-2xl mx-auto">
            Find out how much revenue is hiding in your existing customer base.
          </p>

          {/* Value prop */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl px-6 py-5 max-w-2xl mx-auto mb-6">
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              Most MSPs monetize less than{' '}
              <span className="text-red-400 font-bold">40%</span> of their customer&apos;s total
              technology wallet.
            </p>
            <p className="text-sm text-slate-400 mt-2">
              See how much recurring revenue you are leaving on the table with missed{' '}
              <span className="text-slate-300">
                Network, UCaaS, CX, Cloud, Colocation, and Security
              </span>{' '}
              cross-sell opportunities.
            </p>
          </div>

          {/* Time CTA */}
          <p className="text-slate-400 text-sm mb-10">
            In under{' '}
            <span className="text-white font-semibold">3 minutes</span>, calculate your untapped
            cross-sell MRR.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-12 text-sm">
            {[
              { value: '40%', label: 'Avg wallet share captured' },
              { value: '10x', label: 'Product categories analyzed' },
              { value: '5x', label: 'EBITDA valuation model' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-blue-400">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="pb-20 sm:pb-32">
        <Calculator />
      </section>

      {/* About Bridgepointe */}
      <section className="border-t border-slate-800 bg-slate-900/80">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">
            About Bridgepointe
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            We help MSPs grow faster — and exit smarter.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
            Bridgepointe is a technology advisory firm with deep expertise in MSP operations,
            cross-sell strategy, and exit planning. We specialize in helping managed service
            providers unlock the revenue already hiding in their customer base — across Network,
            UCaaS, Security, Cloud, and CX solutions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 text-xs text-slate-300">
              Network / SD-WAN / SASE
            </span>
            <span className="bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 text-xs text-slate-300">
              UCaaS / CCaaS
            </span>
            <span className="bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 text-xs text-slate-300">
              Cybersecurity
            </span>
            <span className="bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 text-xs text-slate-300">
              Cloud / Colocation
            </span>
            <span className="bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 text-xs text-slate-300">
              MSP M&A Advisory
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Bridgepointe Technologies. All rights reserved.</p>
          <p>
            Results are estimates based on industry benchmarks. Actual results may vary.
          </p>
        </div>
      </footer>
    </main>
  )
}
