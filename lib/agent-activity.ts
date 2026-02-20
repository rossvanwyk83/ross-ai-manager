// Agent Activity Tracking System
// Track all agent deployments, completions, and results

export interface AgentDeployment {
  id: string
  agentId: string
  agentName: string
  projectId: string
  task: string
  status: 'running' | 'completed' | 'failed'
  deployedAt: string
  completedAt?: string
  duration?: number
  result?: string
  tokens?: {
    input: number
    output: number
    total: number
  }
  sessionKey?: string
}

export interface AgentActivity {
  agentId: string
  agentName: string
  projectId: string
  deployments: AgentDeployment[]
  totalDeployments: number
  totalCompleted: number
  totalRuntime: number
  lastActive?: string
  averageDuration?: number
}

// Mock data for demonstration - in production this would come from OpenClaw API
export const mockAgentActivity: AgentActivity[] = [
  {
    agentId: 'mason',
    agentName: 'Mason',
    projectId: 'shieldmyshop',
    totalDeployments: 1,
    totalCompleted: 1,
    totalRuntime: 39,
    lastActive: '2026-02-20T13:23:00Z',
    averageDuration: 39,
    deployments: [
      {
        id: 'dep_001',
        agentId: 'mason',
        agentName: 'Mason',
        projectId: 'shieldmyshop',
        task: 'Create Google Ads campaign for ShieldMyShop targeting Etsy sellers worried about trademark violations',
        status: 'completed',
        deployedAt: '2026-02-20T13:22:21Z',
        completedAt: '2026-02-20T13:23:00Z',
        duration: 39,
        result: '# ShieldMyShop Google Ads Campaign: "Prevention Beats Recovery"\n\n## 1. Google Ads Headlines\n1. "Stop Etsy Shop Suspensions" (26 chars)\n2. "87% Never Reopen After Ban" (25 chars)\n3. "Disney Takedown? Scan First" (26 chars)\n4. "3 Strikes = Game Over" (20 chars)\n5. "Check Before Etsy Does" (22 chars)\n\n## 2. Descriptions\n1. "Real Etsy integration scans your listings for trademark violations before suspension."\n2. "Don\'t join the 87% who never recover. Find violations now. Free 3 scans to start."\n3. "One Disney violation can end your shop forever. Scan all listings in minutes."\n4. "Three strikes, you\'re out. We find trademark issues before Etsy\'s bots do."\n5. "\'Inspired by\' makes it worse. Only tool with real Etsy OAuth. Start protecting now."\n\n## 3. Display Ad Concepts\n- The Suspension Letter: Visual showing shocked seller at suspended dashboard\n- The Disney Trap: Split-screen Disney takedown vs protection\n- Three Strike Baseball: Sports metaphor with violation strikes\n\nCampaign uses fear drivers (permanence, specificity, accumulation) with trust builders (technical authority, risk mitigation, insider knowledge).',
        tokens: {
          input: 100,
          output: 1900,
          total: 2000
        },
        sessionKey: 'agent:main:subagent:123793c3-0040-4460-843b-33f14d38f4b9'
      }
    ]
  },
  {
    agentId: 'clara',
    agentName: 'Clara',
    projectId: 'shieldmyshop',
    totalDeployments: 0,
    totalCompleted: 0,
    totalRuntime: 0,
    deployments: []
  },
  {
    agentId: 'kai',
    agentName: 'Kai',
    projectId: 'shieldmyshop',
    totalDeployments: 0,
    totalCompleted: 0,
    totalRuntime: 0,
    deployments: []
  },
  {
    agentId: 'elena',
    agentName: 'Elena',
    projectId: 'shieldmyshop',
    totalDeployments: 0,
    totalCompleted: 0,
    totalRuntime: 0,
    deployments: []
  }
]

export function getAgentActivity(projectId: string): AgentActivity[] {
  return mockAgentActivity.filter(activity => activity.projectId === projectId)
}

export function getAgentById(agentId: string): AgentActivity | undefined {
  return mockAgentActivity.find(activity => activity.agentId === agentId)
}

export function getRecentDeployments(projectId?: string): AgentDeployment[] {
  let allDeployments: AgentDeployment[] = []
  
  mockAgentActivity.forEach(activity => {
    if (!projectId || activity.projectId === projectId) {
      allDeployments = [...allDeployments, ...activity.deployments]
    }
  })
  
  // Sort by deployment time, most recent first
  return allDeployments.sort((a, b) => 
    new Date(b.deployedAt).getTime() - new Date(a.deployedAt).getTime()
  )
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  } else {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }
}

export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  
  if (diffMinutes < 1) {
    return 'Just now'
  } else if (diffMinutes < 60) {
    return `${diffMinutes}m ago`
  } else if (diffMinutes < 1440) {
    const hours = Math.floor(diffMinutes / 60)
    return `${hours}h ago`
  } else {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }
}

export function truncateResult(result?: string, maxLength: number = 200): string {
  if (!result) return 'No result available'
  if (result.length <= maxLength) return result
  return result.substring(0, maxLength) + '...'
}