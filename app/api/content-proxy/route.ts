import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Read content directly from the OpenClaw workspace
function loadContentFromFile(businessId: string) {
  try {
    // Path to the content database file
    const contentDbPath = '/data/.openclaw/workspace/content-database.json'
    
    if (!fs.existsSync(contentDbPath)) {
      return { content: [], lastUpdated: new Date().toISOString(), count: 0 }
    }

    const data = fs.readFileSync(contentDbPath, 'utf8')
    const database = JSON.parse(data)
    
    // Filter content by business ID
    const businessContent = database.content.filter((item: any) => item.businessId === businessId)
    
    return {
      content: businessContent,
      lastUpdated: database.lastUpdated,
      count: businessContent.length
    }
  } catch (error) {
    console.error('Error reading content database:', error)
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
    
    const data = loadContentFromFile(businessId)
    
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