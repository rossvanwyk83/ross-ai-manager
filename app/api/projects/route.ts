import { NextRequest, NextResponse } from 'next/server'

// This would connect to OpenClaw's API to get real project data
// For now, returning mock data that matches your real projects

const projects = [
  {
    id: 'trendfarm',
    name: 'TrendFarm Digital Agency',
    description: 'Premium digital agency co-run with Skye - creative campaigns and digital marketing',
    type: 'business',
    agents: [
      { id: 'sage', name: 'Sage', role: 'Creative Director - Visionary strategist for premium TrendFarm client campaigns', status: 'ready' }
    ],
    stats: { agents: 1, active: 0, completed: 8 }
  },
  {
    id: 'churchos',
    name: 'ChurchOS',
    description: 'App development with Tom - modern church management and community engagement',
    type: 'product',
    agents: [
      { id: 'grace', name: 'Grace', role: 'Product Manager - Community-focused strategist for ChurchOS solutions', status: 'ready' }
    ],
    stats: { agents: 1, active: 0, completed: 3 }
  },
  {
    id: 'shieldmyshop',
    name: 'ShieldMyShop',
    description: 'Etsy trademark compliance scanner - prevent shop suspensions before they happen',
    type: 'product',
    agents: [
      { id: 'mason', name: 'Mason', role: 'Marketing Asset Factory - Creative powerhouse specializing in complete campaigns and ad creative', status: 'ready' },
      { id: 'clara', name: 'Clara', role: 'Compliance Content Specialist - Educational authority creating content that ranks and converts', status: 'ready' },
      { id: 'kai', name: 'Kai', role: 'Conversion Optimizer - Data-driven expert obsessed with landing page performance', status: 'ready' },
      { id: 'elena', name: 'Elena', role: 'Email Architect - Relationship builder designing high-converting email sequences', status: 'ready' }
    ],
    stats: { agents: 4, active: 0, completed: 2 }
  },
  {
    id: 'systemsfarm',
    name: 'SystemsFarm',
    description: 'AI consulting division - transforming client businesses with AI automation and tools',
    type: 'consulting',
    agents: [
      { id: 'quinn', name: 'Quinn', role: 'AI Strategy Consultant - Strategic thinker for SystemsFarm client transformations', status: 'ready' }
    ],
    stats: { agents: 1, active: 0, completed: 1 }
  }
]

export async function GET(request: NextRequest) {
  try {
    // In production, this would fetch from OpenClaw's API
    // const openclawUrl = process.env.OPENCLAW_GATEWAY_URL
    // const response = await fetch(`${openclawUrl}/api/projects`)
    // const data = await response.json()
    
    return NextResponse.json({ 
      success: true, 
      projects: projects 
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}