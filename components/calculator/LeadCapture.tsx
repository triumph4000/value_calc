'use client'

import { useState } from 'react'
import type { CalculatorInputs, CalculatorResults } from '@/lib/types'

interface LeadCaptureProps {
  inputs: CalculatorInputs
  results: CalculatorResults
  onCaptured: () => void
}

export default function LeadCapture({ inputs, results, onCaptured }: LeadCaptureProps) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [company, setCompany] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) { setError('Please enter a valid email address.'); return }
    setError('')
    setLoading(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName: firstName || undefined, company: company || undefined, submittedAt: new Date().toISOString(), inputs, results }),
      })
    } finally {
      setLoading(false)
      setSubmitted(true)
      onCaptured()
    }
  }

  if (submitted) {
    return (
      <div className="border border-gray-200 bg-gray-50 rounded-2xl p-8 text-center animate-fade-in">
        <div className="w-14 h-14 bg-[#17C662]/10 border border-[#17C662]/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-[#17C662]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-[#003B5C] mb-2">You&apos;re all set.</h3>
        <p className="text-base text-[#003B5C] max-w-sm mx-auto">
          A Bridgepointe advisor will reach out within 24 hours to walk you through a custom Cross-Sell Blueprint for your book of business.
        </p>
      </div>
    )
  }

  return (
    <div className="border border-gray-200 bg-gray-50 rounded-2xl p-6 sm:p-8">
      <div className="max-w-xl mx-auto">
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-black text-[#003B5C] mb-3">
            Want a custom Cross-Sell Blueprint built around your customer base?
          </h3>
          <p className="text-base text-[#003B5C]">
            Enter your email to unlock the complete analysis — including a prioritized action plan, top whitespace categories, and a 90-day revenue acceleration roadmap.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-base font-bold text-[#003B5C] mb-1.5">First Name (optional)</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Alex"
                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-[#003B5C] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#003B5C] focus:border-transparent transition-colors font-medium text-base" />
            </div>
            <div>
              <label className="block text-base font-bold text-[#003B5C] mb-1.5">Company (optional)</label>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme MSP"
                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-[#003B5C] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#003B5C] focus:border-transparent transition-colors font-medium text-base" />
            </div>
          </div>

          <div>
            <label className="block text-base font-bold text-[#003B5C] mb-1.5">Business Email *</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@yourmsp.com"
              className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-[#003B5C] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#003B5C] focus:border-transparent transition-colors font-medium text-base" />
            {error && <p className="text-red-500 text-base mt-1.5">{error}</p>}
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-[#003B5C] hover:bg-[#002a42] disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-3.5 px-6 rounded-full transition-colors duration-200 text-base">
            {loading ? 'Sending...' : 'Unlock My Cross-Sell Blueprint'}
          </button>

          <p className="text-center text-base text-[#003B5C]">
            100% free. No spam. Bridgepointe advisors only — your data stays private.
          </p>
        </form>
      </div>
    </div>
  )
}
