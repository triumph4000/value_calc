'use client'

import { useState, useRef } from 'react'
import type { CalculatorInputs } from '@/lib/types'
import {
  DEFAULT_SECTION_A,
  DEFAULT_SECTION_B,
  DEFAULT_SECTION_C,
  DEFAULT_SECTION_D,
} from '@/lib/constants'
import { calculateResults } from '@/lib/calculations'
import StepA from './StepA'
import StepB from './StepB'
import StepC from './StepC'
import StepD from './StepD'
import Results from './Results'

const STEPS = [
  { number: 1, label: 'Revenue', title: 'Core Revenue Profile' },
  { number: 2, label: 'Penetration', title: 'Product Penetration' },
  { number: 3, label: 'Economics', title: 'Customer Economics' },
  { number: 4, label: 'Maturity', title: 'Renewal & Expansion' },
]

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((step, i) => {
        const isCompleted = current > step.number
        const isCurrent = current === step.number
        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#32373c] border-[#32373c] text-white'
                    : isCurrent
                    ? 'border-[#32373c] text-[#32373c] bg-white'
                    : 'border-gray-200 text-gray-300 bg-white'
                }`}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`text-[10px] font-bold mt-1 hidden sm:block tracking-wide ${
                  isCurrent ? 'text-[#32373c]' : isCompleted ? 'text-gray-400' : 'text-gray-300'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-0.5 w-10 sm:w-16 mx-1 transition-colors duration-300 ${
                  current > step.number ? 'bg-[#32373c]' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function Calculator() {
  const [step, setStep] = useState(1)
  const [showResults, setShowResults] = useState(false)
  const [inputs, setInputs] = useState<CalculatorInputs>({
    sectionA: { ...DEFAULT_SECTION_A },
    sectionB: { ...DEFAULT_SECTION_B },
    sectionC: { ...DEFAULT_SECTION_C },
    sectionD: { ...DEFAULT_SECTION_D },
  })

  const cardRef = useRef<HTMLDivElement>(null)

  const scrollToCard = () => {
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const next = () => {
    if (step < 4) {
      setStep((s) => s + 1)
      setTimeout(scrollToCard, 100)
    } else {
      setShowResults(true)
      setTimeout(scrollToCard, 100)
    }
  }

  const back = () => {
    if (step > 1) {
      setStep((s) => s - 1)
      setTimeout(scrollToCard, 100)
    }
  }

  const reset = () => {
    setStep(1)
    setShowResults(false)
    setInputs({
      sectionA: { ...DEFAULT_SECTION_A },
      sectionB: { ...DEFAULT_SECTION_B },
      sectionC: { ...DEFAULT_SECTION_C },
      sectionD: { ...DEFAULT_SECTION_D },
    })
    setTimeout(scrollToCard, 100)
  }

  const results = showResults ? calculateResults(inputs) : null
  const canProceed =
    step === 1 ? inputs.sectionA.totalCustomers > 0 && inputs.sectionA.totalMRR > 0 : true

  return (
    <div ref={cardRef} className="w-full max-w-3xl mx-auto px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Card header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-5">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-bold text-[#17C662] uppercase tracking-widest">
              MSP Revenue Analyzer
            </p>
            {showResults && (
              <button
                onClick={reset}
                className="text-xs text-gray-400 hover:text-[#32373c] transition-colors font-medium"
              >
                Start over
              </button>
            )}
          </div>
          {!showResults && (
            <p className="text-sm text-gray-500 font-medium">
              Step {step} of 4 &mdash; {STEPS[step - 1].title}
            </p>
          )}
        </div>

        <div className="px-6 py-7 sm:px-8 sm:py-8">
          {!showResults && <StepIndicator current={step} />}

          {!showResults && (
            <div>
              {step === 1 && (
                <StepA
                  data={inputs.sectionA}
                  onChange={(d) => setInputs((prev) => ({ ...prev, sectionA: d }))}
                />
              )}
              {step === 2 && (
                <StepB
                  data={inputs.sectionB}
                  onChange={(d) => setInputs((prev) => ({ ...prev, sectionB: d }))}
                />
              )}
              {step === 3 && (
                <StepC
                  data={inputs.sectionC}
                  onChange={(d) => setInputs((prev) => ({ ...prev, sectionC: d }))}
                />
              )}
              {step === 4 && (
                <StepD
                  data={inputs.sectionD}
                  onChange={(d) => setInputs((prev) => ({ ...prev, sectionD: d }))}
                />
              )}

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={back}
                  disabled={step === 1}
                  className="px-5 py-2.5 text-sm font-bold text-gray-400 hover:text-[#32373c] disabled:opacity-0 disabled:pointer-events-none transition-colors"
                >
                  Back
                </button>
                <div className="flex items-center gap-3">
                  {step === 1 && !canProceed && (
                    <p className="text-xs text-gray-400">Enter customers and MRR to continue</p>
                  )}
                  <button
                    onClick={next}
                    disabled={!canProceed}
                    className="px-7 py-2.5 bg-[#32373c] hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed text-white font-black rounded-full text-sm transition-colors duration-200 tracking-wide"
                  >
                    {step === 4 ? 'Calculate My Hidden Revenue' : 'Next'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {showResults && results && <Results inputs={inputs} results={results} />}
        </div>
      </div>
    </div>
  )
}
