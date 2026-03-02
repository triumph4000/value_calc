import { NextRequest, NextResponse } from 'next/server'
import type { LeadSubmission } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body: LeadSubmission = await request.json()

    if (!body.email || !body.email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // Log lead to console (replace with CRM / email webhook in production)
    console.log('=== NEW LEAD SUBMISSION ===')
    console.log(`Email: ${body.email}`)
    console.log(`Name: ${body.firstName ?? 'N/A'}`)
    console.log(`Company: ${body.company ?? 'N/A'}`)
    console.log(`Hidden MRR: $${body.results.totalHiddenMRR.toFixed(0)}/mo`)
    console.log(`3-Year Value: $${body.results.threeYearValue.toFixed(0)}`)
    console.log(`Submitted: ${body.submittedAt}`)
    console.log('Full inputs:', JSON.stringify(body.inputs, null, 2))
    console.log('===========================')

    // TODO: integrate with HubSpot, Salesforce, or email provider
    // await fetch('https://api.hubspot.com/crm/v3/objects/contacts', { ... })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Lead submission error:', err)
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
  }
}
