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
    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setLoading(true)

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName: firstName || undefined,
          company: company || undefined,
          submittedAt: new Date().toISOString(),
          inputs,
          results,
        }),
      })
      setSubmitted(true)
      onCaptured()
    } catch {
      // Still reveal results even if API call fails — don't block the user
      setSubmitted(true)
      onCaptured()
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">You&apos;re all set.</h3>
        <p className="text-slate-400 text-sm max-w-sm mx-auto">
          A Bridgepointe advisor will reach out within 24 hours to walk you through a custom
          Cross-Sell Blueprint for your book of business.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 sm:p-8">
      <div className="max-w-xl mx-auto">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-2">
            Unlock Your Full Report
          </p>
          <h3 className="text-2xl font-bold text-white mb-3">
            Want a custom Cross-Sell Blueprint built around your customer base?
          </h3>
          <p className="text-slate-300 text-sm">
            Enter your email to unlock the complete analysis — including a prioritized action plan,
            top whitespace categories, and a 90-day revenue acceleration roadmap.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                First Name <span className="text-slate-600">(optional)</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Alex"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Company <span className="text-slate-600">(optional)</span>
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme MSP"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Business Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourmsp.com"
              className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-xl transition-colors duration-200 text-base"
          >
            {loading ? 'Sending...' : 'Unlock My Cross-Sell Blueprint'}
          </button>

          <p className="text-center text-xs text-slate-500">
            100% free. No spam. Bridgepointe advisors only — your data stays private.
          </p>
        </form>
      </div>
    </div>
  )
}
