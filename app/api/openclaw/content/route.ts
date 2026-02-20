import { NextRequest, NextResponse } from 'next/server'

const OPENCLAW_GATEWAY_URL = process.env.OPENCLAW_GATEWAY_URL || 'http://10.21.0.22:18790'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get('business')
    
    if (!businessId) {
      return NextResponse.json({ error: 'Business ID is required' }, { status: 400 })
    }

    // Call OpenClaw to get the content
    const response = await fetch(`${OPENCLAW_GATEWAY_URL}/api/v1/content?business=${businessId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`OpenClaw API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Error fetching content from OpenClaw:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch content from OpenClaw',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Forward to OpenClaw
    const response = await fetch(`${OPENCLAW_GATEWAY_URL}/api/v1/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      throw new Error(`OpenClaw API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Error creating content via OpenClaw:', error)
    return NextResponse.json({ 
      error: 'Failed to create content via OpenClaw',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}