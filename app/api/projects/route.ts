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
      { id: 'creative-director', name: 'Creative Director', role: 'Lead creative vision and strategy for premium digital clients', status: 'ready' }
    ],
    stats: { agents: 1, active: 0, completed: 8 }
  },
  {
    id: 'churchos',
    name: 'ChurchOS',
    description: 'App development with Tom - modern church management and community engagement',
    type: 'product',
    agents: [
      { id: 'product-manager', name: 'Product Manager', role: 'Guide product development strategy and feature prioritization', status: 'ready' }
    ],
    stats: { agents: 1, active: 0, completed: 3 }
  },
  {
    id: 'shieldmyshop',
    name: 'ShieldMyShop',
    description: 'E-commerce security platform - fraud protection and chargeback prevention',
    type: 'product',
    agents: [
      { id: 'security-analyst', name: 'Security Analyst', role: 'Analyze e-commerce threats and develop protection strategies', status: 'ready' }
    ],
    stats: { agents: 1, active: 0, completed: 2 }
  },
  {
    id: 'systemsfarm',
    name: 'SystemsFarm',
    description: 'AI consulting division - transforming client businesses with AI automation and tools',
    type: 'consulting',
    agents: [
      { id: 'ai-strategy-consultant', name: 'AI Strategy Consultant', role: 'Help clients transform through strategic AI implementation', status: 'ready' }
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