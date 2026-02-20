import { NextRequest, NextResponse } from 'next/server'

const OPENCLAW_GATEWAY_URL = process.env.OPENCLAW_GATEWAY_URL || 'http://10.21.0.22:18790'
const CONTENT_SERVER_URL = 'http://10.21.0.22:18791'

// Call the content server running on OpenClaw server
async function getContentFromServer(businessId: string) {
  try {
    const response = await fetch(`${CONTENT_SERVER_URL}/api/v1/content?business=${businessId}`, {
      headers: {
        'Accept': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Content server responded with ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching content from server:', error)
    throw error
  }
}

// GET: Retrieve content for a business
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get('business')
    
    if (!businessId) {
      return NextResponse.json({ error: 'Business ID is required' }, { status: 400 })
    }
    
    const data = await getContentFromServer(businessId)
    
    return NextResponse.json({
      content: data.content || [],
      lastUpdated: data.lastUpdated,
      count: data.count || 0
    })
    
  } catch (error) {
    console.error('Error loading content:', error)
    return NextResponse.json({ 
      error: 'Failed to load content',
      content: [],
      lastUpdated: new Date().toISOString(),
      count: 0
    }, { status: 500 })
  }
}

// POST: Add new content item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const response = await fetch(`${CONTENT_SERVER_URL}/api/v1/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    })
    
    if (!response.ok) {
      throw new Error(`Content server responded with ${response.status}`)
    }
    
    const data = await response.json()
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('Error adding content:', error)
    return NextResponse.json({ error: 'Failed to add content' }, { status: 500 })
  }
}

// PUT: Update content item (not implemented in content server yet)
export async function PUT(request: NextRequest) {
  try {
    return NextResponse.json({ error: 'Update not implemented yet' }, { status: 501 })
  } catch (error) {
    console.error('Error updating content:', error)
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}

// DELETE: Remove content item (not implemented in content server yet)
export async function DELETE(request: NextRequest) {
  try {
    return NextResponse.json({ error: 'Delete not implemented yet' }, { status: 501 })
  } catch (error) {
    console.error('Error deleting content:', error)
    return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 })
  }
}