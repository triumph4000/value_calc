import Image from 'next/image'
import Calculator from '@/components/calculator/Calculator'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="https://www.bridgepointetechnologies.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="/bpt_logo.png"
              alt="Bridgepointe Technologies"
              width={200}
              height={48}
              className="h-10 w-auto"
              priority
            />
          </a>
          <a
            href="https://www.bridgepointetechnologies.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-[#003B5C] hover:text-[#17C662] transition-colors hidden sm:block font-medium"
          >
            bridgepointetechnologies.com
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 pt-14 pb-12 sm:pt-20 sm:pb-16 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#003B5C] leading-tight mb-5 tracking-tight">
            The MSP &ldquo;Hidden MRR&rdquo;
            <br />
            <span className="text-[#17C662]">Calculator</span>
          </h1>

          <p className="text-xl sm:text-2xl font-semibold text-[#003B5C] mb-6 max-w-2xl mx-auto">
            Find out how much revenue is hiding in your existing customer base.
          </p>

          <div className="border border-gray-200 bg-gray-50 rounded-2xl px-6 py-6 max-w-2xl mx-auto mb-6 text-left">
            <p className="text-lg font-bold text-[#003B5C] mb-2">
              Most MSPs monetize less than{' '}
              <span className="text-[#17C662]">40%</span> of their customer&apos;s total technology wallet.
            </p>
            <p className="text-base text-[#003B5C] leading-relaxed">
              See how much recurring revenue you are leaving on the table with missed{' '}
              Network, UCaaS, CX, Cloud, Colocation, and Security cross-sell opportunities.
            </p>
          </div>

          <p className="text-base text-[#003B5C] mb-10">
            In under <span className="font-bold">3 minutes</span>, calculate your untapped cross-sell MRR.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 mb-4">
            {[
              { value: '<40%', label: 'Avg wallet share captured' },
              { value: '10', label: 'Product categories analyzed' },
              { value: '5x', label: 'EBITDA exit valuation model' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-black text-[#003B5C]">{stat.value}</p>
                <p className="text-base text-[#003B5C] mt-1 font-medium">{stat.label}</p>
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
          <h2 className="text-2xl sm:text-3xl font-black text-[#003B5C] mb-5 tracking-tight">
            We help MSPs grow faster — and exit smarter.
          </h2>
          <p className="text-base text-[#003B5C] leading-relaxed max-w-xl mx-auto mb-8">
            Bridgepointe is a technology advisory firm with deep expertise in MSP operations,
            cross-sell strategy, and exit planning. We specialize in helping managed service
            providers unlock the revenue already hiding in their customer base — across Network,
            UCaaS, Security, Cloud, and CX solutions.
          </p>
          <p className="text-base text-[#003B5C]">
            Network / SD-WAN / SASE &nbsp;&middot;&nbsp; UCaaS / CCaaS &nbsp;&middot;&nbsp;
            Cybersecurity &nbsp;&middot;&nbsp; Cloud / Colocation &nbsp;&middot;&nbsp; MSP M&amp;A Advisory
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-[#003B5C] py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-base text-white/70">
          <p>&copy; {new Date().getFullYear()} Bridgepointe Technologies. All rights reserved.</p>
          <p>Results are estimates based on industry benchmarks. Actual results may vary.</p>
        </div>
      </footer>
    </main>
  )
}
