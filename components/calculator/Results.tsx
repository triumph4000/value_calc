'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { CalculatorInputs, CalculatorResults } from '@/lib/types'
import { formatCurrency, formatLargeCurrency, formatPercent, getMaturityDescription } from '@/lib/calculations'
import LeadCapture from './LeadCapture'

interface ResultsProps {
  inputs: CalculatorInputs
  results: CalculatorResults
}

function StatCard({ label, value, sub, accent }: {
  label: string; value: string; sub?: string; accent?: 'green' | 'amber' | 'red'
}) {
  const accents = {
    green: 'border-[#17C662]/30 bg-[#17C662]/5',
    amber: 'border-amber-300/50 bg-amber-50',
    red:   'border-red-300/50 bg-red-50',
  }
  const text = { green: 'text-[#17C662]', amber: 'text-amber-600', red: 'text-red-500' }

  return (
    <div className={`rounded-2xl border p-5 sm:p-6 ${accent ? accents[accent] : 'bg-gray-50 border-gray-200'}`}>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</p>
      <p className={`text-3xl sm:text-4xl font-black tracking-tight ${accent ? text[accent] : 'text-[#32373c]'}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1.5 font-medium">{sub}</p>}
    </div>
  )
}

function MonetizationMeter({ rate }: { rate: number }) {
  const clamped = Math.min(100, Math.max(0, rate))
  const barColor = clamped < 40 ? 'bg-red-500' : clamped < 65 ? 'bg-amber-500' : 'bg-[#17C662]'

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Current Monetization Rate</p>
      <div className="flex items-end gap-3 mb-3">
        <span className="text-4xl font-black text-[#32373c]">{formatPercent(clamped, 1)}</span>
        <span className="text-gray-400 text-sm mb-1 font-medium">of your wallet captured</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div className={`h-full rounded-full transition-all duration-1000 ${barColor}`} style={{ width: `${clamped}%` }} />
      </div>
      <div className="flex justify-between text-xs text-gray-400 font-medium">
        <span>0%</span>
        <span>Industry potential: 100%</span>
      </div>
      <p className="text-xs text-gray-400 mt-3 font-medium">
        Top-performing MSPs capture <span className="text-[#32373c] font-bold">60–75%</span> wallet share.
        Most sit below <span className="text-red-500 font-bold">40%</span>.
      </p>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string
}) => {
  if (!active || !payload?.length) return null
  const current = payload.find((p) => p.dataKey === 'current')?.value ?? 0
  const benchmark = payload.find((p) => p.dataKey === 'benchmark')?.value ?? 0
  const gap = Math.max(0, benchmark - current)
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg">
      <p className="text-sm font-black text-[#32373c] mb-2">{label}</p>
      <p className="text-xs text-[#17C662] font-bold">Your rate: {current}%</p>
      <p className="text-xs text-gray-400 font-medium">Benchmark: {benchmark}%</p>
      {gap > 0 && <p className="text-xs text-amber-500 font-bold mt-1">Gap: {gap}%</p>}
    </div>
  )
}

const MATURITY_COLORS = ['text-red-500', 'text-red-500', 'text-amber-500', 'text-[#32373c]', 'text-[#17C662]']
const MATURITY_BARS   = ['bg-red-500',   'bg-red-500',   'bg-amber-500',   'bg-[#32373c]',   'bg-[#17C662]'  ]
const MATURITY_PCTS   = ['5%',           '25%',          '50%',            '75%',             '100%'          ]

export default function Results({ inputs, results }: ResultsProps) {
  const [leadCaptured, setLeadCaptured] = useState(false)
  const score = results.operationalMaturityScore

  const chartData = results.whitespaceByProduct.map((p) => ({
    name: p.productLabel.split(' ')[0].replace('/', ''),
    current: Math.round(p.currentPenetration),
    benchmark: Math.round(p.benchmarkRate),
  }))

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center">
        <p className="text-xs font-bold text-[#17C662] uppercase tracking-widest mb-2">Analysis Complete</p>
        <h2 className="text-3xl sm:text-4xl font-black text-[#32373c] mb-3 tracking-tight">Your Hidden Revenue Report</h2>
        <p className="text-gray-400 max-w-xl mx-auto text-sm font-medium">
          Based on your inputs and industry benchmarks, here is how much recurring revenue is sitting uncaptured in your existing customer base.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Hidden MRR" value={`${formatLargeCurrency(results.totalHiddenMRR)}/mo`} sub="Estimated MRR you're not capturing" accent="green" />
        <StatCard label="3-Year Contract Value" value={formatLargeCurrency(results.threeYearValue)} sub={`Based on ${inputs.sectionC.avgContractTermMonths || 36}-month avg term`} accent="amber" />
        <StatCard label="Est. Annual Commission" value={formatLargeCurrency(results.annualCommission)} sub="At 15% commission model assumption" />
      </div>

      {/* Monetization meter */}
      <MonetizationMeter rate={results.currentMonetizationRate} />

      {/* Chart */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Your Penetration vs Industry Benchmark</p>
        <p className="text-xs text-gray-400 mb-5 font-medium">The gap between bars is your whitespace — customers who could buy but aren&apos;t.</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v}%`} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px', color: '#9ca3af', paddingTop: '16px', fontWeight: 600 }} formatter={(v: string) => v === 'current' ? 'Your Penetration' : 'Industry Benchmark'} />
            <Bar dataKey="current" name="current" fill="#32373c" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="benchmark" name="benchmark" fill="#d1d5db" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top 3 */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Top 3 Whitespace Opportunities</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {results.topThreeWhitespace.map((item, i) => (
            <div key={item.productKey} className="bg-white border border-gray-200 rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#17C662]" />
              <span className="text-xs font-black text-[#17C662] mb-2 block tracking-wider">#{i + 1} OPPORTUNITY</span>
              <h4 className="text-lg font-black text-[#32373c] mb-3 tracking-tight">{item.productLabel}</h4>
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-medium">Whitespace customers</span>
                  <span className="text-[#32373c] font-bold">{item.whitespaceCustomers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-medium">Avg spend / mo</span>
                  <span className="text-[#32373c] font-bold">{formatCurrency(item.avgSpend)}</span>
                </div>
                <div className="flex justify-between text-sm pt-1.5 border-t border-gray-100">
                  <span className="text-[#32373c] font-bold">Hidden MRR</span>
                  <span className="text-[#17C662] font-black">{formatCurrency(item.hiddenMRR)}/mo</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gated: Exit Valuation + Maturity */}
      {!leadCaptured ? (
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 blur-sm pointer-events-none select-none">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Exit Valuation Lift</p>
              <p className="text-4xl font-black text-[#32373c]">$X.XXM</p>
              <p className="text-xs text-gray-400 mt-1.5 font-medium">At 5x EBITDA on captured whitespace</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Operational Maturity</p>
              <p className="text-4xl font-black text-[#32373c]">X/4</p>
              <p className="text-xs text-gray-400 mt-1.5 font-medium">Best-in-Class practices in place</p>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center bg-white border border-gray-200 rounded-xl px-5 py-3 shadow-sm">
              <p className="text-sm text-[#32373c] font-bold">Enter your email below to unlock</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Exit Valuation Lift</p>
            <p className="text-4xl font-black text-[#32373c]">{formatLargeCurrency(results.exitValuationLift)}</p>
            <p className="text-xs text-gray-400 mt-1.5 font-medium">
              Estimated additional enterprise value at 5x EBITDA on a 40% margin assumption.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Operational Maturity</p>
            <div className="flex items-end gap-2 mb-3">
              <span className={`text-4xl font-black ${MATURITY_COLORS[score]}`}>{score}/4</span>
              <span className={`text-sm font-black mb-1 ${MATURITY_COLORS[score]}`}>{results.operationalMaturityLabel}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
              <div className={`h-full rounded-full ${MATURITY_BARS[score]}`} style={{ width: MATURITY_PCTS[score] }} />
            </div>
            <p className="text-xs text-gray-400 font-medium">{getMaturityDescription(score)}</p>
          </div>
        </div>
      )}

      <LeadCapture inputs={inputs} results={results} onCaptured={() => setLeadCaptured(true)} />
    </div>
  )
}
