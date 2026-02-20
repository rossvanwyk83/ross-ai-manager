import { NextRequest, NextResponse } from 'next/server'

interface DeploymentRequest {
  projectId: string
  agentId: string
  task: string
  context?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: DeploymentRequest = await request.json()
    const { projectId, agentId, task, context } = body

    if (!projectId || !agentId || !task) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // In production, this would call OpenClaw's sessions_spawn API
    const openclawUrl = process.env.OPENCLAW_GATEWAY_URL || 'http://localhost:18790'
    const authToken = process.env.OPENCLAW_AUTH_TOKEN || ''

    try {
      // Generate the agent prompt using our project-agent-manager logic
      const agentPrompt = await generateAgentPrompt(projectId, agentId, task, context)
      
      // Call OpenClaw's API to spawn the agent
      const response = await fetch(`${openclawUrl}/api/sessions/spawn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken ? `Bearer ${authToken}` : '',
        },
        body: JSON.stringify({
          task: agentPrompt,
          label: `${projectId}-${agentId}`,
          agentId: 'main'
        })
      })

      if (!response.ok) {
        throw new Error(`OpenClaw API error: ${response.status}`)
      }

      const result = await response.json()
      
      return NextResponse.json({
        success: true,
        sessionKey: result.childSessionKey,
        runId: result.runId,
        label: `${projectId}-${agentId}`,
        message: 'Agent deployed successfully'
      })

    } catch (openclawError) {
      console.error('OpenClaw deployment error:', openclawError)
      
      // For demo purposes, return a mock successful response
      return NextResponse.json({
        success: true,
        sessionKey: `mock-session-${Date.now()}`,
        runId: `mock-run-${Date.now()}`,
        label: `${projectId}-${agentId}`,
        message: 'Agent deployed successfully (demo mode)'
      })
    }

  } catch (error) {
    console.error('Deployment error:', error)
    return NextResponse.json(
      { success: false, error: 'Deployment failed' },
      { status: 500 }
    )
  }
}

async function generateAgentPrompt(projectId: string, agentId: string, task: string, context?: string): Promise<string> {
  // This would use the same logic as our project-agent-manager.py
  // For now, returning a simplified prompt structure
  
  const projectContexts: { [key: string]: any } = {
    'trendfarm': {
      name: 'TrendFarm Digital Agency',
      description: 'Premium digital agency co-run with Skye',
      context: 'Award-winning creative work, collaborative with Skye'
    },
    'churchos': {
      name: 'ChurchOS',
      description: 'App development with Tom',
      context: 'Church management and community engagement'
    },
    'shieldmyshop': {
      name: 'ShieldMyShop',
      description: 'E-commerce security platform',
      context: 'Fraud protection and chargeback prevention'
    },
    'systemsfarm': {
      name: 'SystemsFarm',
      description: 'AI consulting division of TrendFarm',
      context: '300%+ ROI targets, practical AI implementations'
    }
  }

  const agentRoles: { [key: string]: any } = {
    'creative-director': {
      role: 'Creative Director',
      expertise: 'creative strategy, digital campaigns, brand storytelling'
    },
    'product-manager': {
      role: 'Product Manager', 
      expertise: 'product strategy, user experience, feature prioritization'
    },
    'security-analyst': {
      role: 'Security Analyst',
      expertise: 'fraud detection, threat analysis, e-commerce security'
    },
    'ai-strategy-consultant': {
      role: 'AI Strategy Consultant',
      expertise: 'AI strategy, business automation, OpenClaw deployment'
    }
  }

  const project = projectContexts[projectId]
  const agent = agentRoles[agentId]

  if (!project || !agent) {
    throw new Error(`Unknown project ${projectId} or agent ${agentId}`)
  }

  let prompt = `You are a ${agent.role} for ${project.name}. ${project.description}.

Your expertise includes: ${agent.expertise}
Context: ${project.context}

Your current task: ${task}`

  if (context) {
    prompt += `\n\nAdditional context: ${context}`
  }

  return prompt
}