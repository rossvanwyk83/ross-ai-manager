import { NextRequest, NextResponse } from 'next/server'
import { staticContent } from '@/lib/static-content'

// Load content from static data (embedded at build time)
function loadContentFromStatic(businessId: string) {
  try {
    // Get content for the specific business
    const businessContent = staticContent[businessId as keyof typeof staticContent] || []
    
    return {
      content: businessContent,
      lastUpdated: new Date().toISOString(),
      count: businessContent.length
    }
  } catch (error) {
    console.error('Error loading static content:', error)
    return { content: [], lastUpdated: new Date().toISOString(), count: 0 }
  }
}

// GET: Retrieve content for a business (reading directly from file)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get('business')
    
    if (!businessId) {
      return NextResponse.json({ error: 'Business ID is required' }, { status: 400 })
    }
    
    const data = loadContentFromStatic(businessId)
    
    return NextResponse.json(data)
    
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