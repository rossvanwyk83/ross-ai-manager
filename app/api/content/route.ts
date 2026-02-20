import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const WORKSPACE_DIR = '/data/.openclaw/workspace'
const CONTENT_DB_FILE = path.join(WORKSPACE_DIR, 'content-database.json')

interface ContentItem {
  id: string
  businessId: string
  title: string
  type: 'blog' | 'research' | 'email' | 'landing-page' | 'social'
  status: 'draft' | 'published' | 'scheduled'
  publishedDate?: string
  publishedUrl?: string
  views?: number
  engagement?: number
  conversions?: number
  keywords: string[]
  description: string
  content: string
  filePath?: string
  createdAt: string
  updatedAt: string
}

interface ContentDatabase {
  content: ContentItem[]
  lastUpdated: string
}

// Load existing content database
async function loadContentDatabase(): Promise<ContentDatabase> {
  try {
    const data = await fs.readFile(CONTENT_DB_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    // Return empty database if file doesn't exist
    return {
      content: [],
      lastUpdated: new Date().toISOString()
    }
  }
}

// Save content database
async function saveContentDatabase(database: ContentDatabase): Promise<void> {
  database.lastUpdated = new Date().toISOString()
  await fs.writeFile(CONTENT_DB_FILE, JSON.stringify(database, null, 2))
}

// Import existing ShieldMyShop content
async function importShieldMyShopContent(): Promise<ContentItem[]> {
  const content: ContentItem[] = []
  const shieldMyShopDir = path.join(WORKSPACE_DIR, 'shieldmyshop-marketing')
  
  try {
    // Check if directory exists
    await fs.access(shieldMyShopDir)
    
    // Import research files
    const researchFiles = [
      { file: 'competitor-analysis.md', title: 'Competitor Analysis', description: 'Market research and competitive landscape analysis' },
      { file: 'keyword-research.md', title: 'Keyword Research', description: 'SEO keywords and search volume analysis' },
      { file: 'content-calendar.md', title: 'Content Calendar', description: 'Strategic content publishing schedule' },
      { file: 'launch-plan.md', title: 'Launch Strategy', description: 'Go-to-market plan and launch timeline' }
    ]
    
    for (const { file, title, description } of researchFiles) {
      const filePath = path.join(shieldMyShopDir, file)
      try {
        const fileContent = await fs.readFile(filePath, 'utf8')
        content.push({
          id: `shieldmyshop-${file.replace('.md', '')}`,
          businessId: 'shieldmyshop',
          title,
          type: 'research',
          status: 'draft',
          keywords: ['shieldmyshop', 'cybersecurity', 'etsy', 'trademark'],
          description,
          content: fileContent,
          filePath,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      } catch (error) {
        console.log(`Could not read ${file}:`, error)
      }
    }
    
    // Import marketing content
    const marketingFiles = [
      { file: 'email-sequence.md', title: 'Email Marketing Sequence', description: 'Automated email campaigns for user onboarding', type: 'email' as const },
      { file: 'landing-page-copy.md', title: 'Landing Page Copy', description: 'Website copy and conversion optimization', type: 'landing-page' as const },
      { file: 'landing-page-brief.md', title: 'Landing Page Brief', description: 'Detailed brief for landing page development', type: 'landing-page' as const }
    ]
    
    for (const { file, title, description, type } of marketingFiles) {
      const filePath = path.join(shieldMyShopDir, file)
      try {
        const fileContent = await fs.readFile(filePath, 'utf8')
        content.push({
          id: `shieldmyshop-${file.replace('.md', '')}`,
          businessId: 'shieldmyshop',
          title,
          type,
          status: 'draft',
          keywords: ['shieldmyshop', 'marketing', 'conversion', 'landing-page'],
          description,
          content: fileContent,
          filePath,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      } catch (error) {
        console.log(`Could not read ${file}:`, error)
      }
    }
    
    // Import blog drafts
    const blogDraftsDir = path.join(shieldMyShopDir, 'blog-drafts')
    try {
      const blogFiles = await fs.readdir(blogDraftsDir)
      for (const file of blogFiles.filter(f => f.endsWith('.md'))) {
        const filePath = path.join(blogDraftsDir, file)
        const fileContent = await fs.readFile(filePath, 'utf8')
        
        // Extract title from filename
        const title = file.replace('.md', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        
        content.push({
          id: `shieldmyshop-blog-${file.replace('.md', '')}`,
          businessId: 'shieldmyshop',
          title,
          type: 'blog',
          status: 'draft',
          keywords: ['etsy', 'trademark', 'shop suspension', 'shieldmyshop', 'seo'],
          description: `SEO-optimized blog post: ${title}`,
          content: fileContent,
          filePath,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      }
    } catch (error) {
      console.log('Could not read blog-drafts directory:', error)
    }
    
  } catch (error) {
    console.log('ShieldMyShop content directory not found:', error)
  }
  
  return content
}

// GET: Retrieve content for a business
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get('business')
    
    if (!businessId) {
      return NextResponse.json({ error: 'Business ID is required' }, { status: 400 })
    }
    
    let database = await loadContentDatabase()
    
    // If database is empty and we're looking for ShieldMyShop, import existing content
    if (database.content.length === 0 && businessId === 'shieldmyshop') {
      const importedContent = await importShieldMyShopContent()
      database.content = importedContent
      await saveContentDatabase(database)
    }
    
    // Filter content by business
    const businessContent = database.content.filter(item => item.businessId === businessId)
    
    return NextResponse.json({
      content: businessContent,
      lastUpdated: database.lastUpdated
    })
    
  } catch (error) {
    console.error('Error loading content:', error)
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 })
  }
}

// POST: Add new content item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { businessId, title, type, description, content: itemContent, keywords } = body
    
    if (!businessId || !title || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    const database = await loadContentDatabase()
    
    const newItem: ContentItem = {
      id: `${businessId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      businessId,
      title,
      type,
      status: 'draft',
      keywords: keywords || [],
      description: description || '',
      content: itemContent || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    database.content.push(newItem)
    await saveContentDatabase(database)
    
    return NextResponse.json({
      success: true,
      content: newItem
    })
    
  } catch (error) {
    console.error('Error adding content:', error)
    return NextResponse.json({ error: 'Failed to add content' }, { status: 500 })
  }
}

// PUT: Update content item
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    
    if (!id) {
      return NextResponse.json({ error: 'Content ID is required' }, { status: 400 })
    }
    
    const database = await loadContentDatabase()
    const itemIndex = database.content.findIndex(item => item.id === id)
    
    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 })
    }
    
    // Update the item
    database.content[itemIndex] = {
      ...database.content[itemIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    await saveContentDatabase(database)
    
    return NextResponse.json({
      success: true,
      content: database.content[itemIndex]
    })
    
  } catch (error) {
    console.error('Error updating content:', error)
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}

// DELETE: Remove content item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Content ID is required' }, { status: 400 })
    }
    
    const database = await loadContentDatabase()
    const initialLength = database.content.length
    
    database.content = database.content.filter(item => item.id !== id)
    
    if (database.content.length === initialLength) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 })
    }
    
    await saveContentDatabase(database)
    
    return NextResponse.json({
      success: true,
      message: 'Content deleted successfully'
    })
    
  } catch (error) {
    console.error('Error deleting content:', error)
    return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 })
  }
}