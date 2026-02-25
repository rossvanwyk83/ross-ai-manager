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
  },
  {
    agentId: 'atlas',
    agentName: 'Atlas',
    projectId: 'churchos',
    totalDeployments: 4,
    totalCompleted: 4,
    totalRuntime: 1447,
    lastActive: '2026-02-25T12:15:00Z',
    averageDuration: 362,
    deployments: [
      {
        id: 'test_004',
        agentId: 'atlas',
        agentName: 'Atlas',
        projectId: 'churchos',
        task: 'Comprehensive Ministry Sections Testing: Services, Worship, Small Groups',
        status: 'completed',
        deployedAt: '2026-02-25T12:05:00Z',
        completedAt: '2026-02-25T12:15:00Z',
        duration: 600,
        result: '# ChurchOS Ministry Sections - Comprehensive Testing Report\n\n## Executive Summary: 🚫 NOT PRODUCTION READY\n\n### Critical Issues Found: 1\n### Major Issues Found: 3  \n### Minor Issues Found: 3\n\n---\n\n## 🚫 SMALL GROUPS SECTION - CRITICAL ISSUES:\n\n**🚨 CRITICAL: Data Loss Risk**\n- Member deletion permanently removes attendance history\n- No soft deletion or data retention\n- **IMMEDIATE FIX REQUIRED**\n\n**Major Issues:**\n- Schedule conflict detection missing\n- No validation on group capacity\n- Leader permission system needs testing\n\n---\n\n## ⚠️ SERVICES SECTION - MAJOR ISSUES:\n\n**Major Issues:**\n- Recurring service creation likely broken\n- Schedule conflict detection missing\n- Staff assignment validation needed\n\n**Minor Issues:**\n- Time validation missing (end before start)\n- No bulk creation capabilities\n\n---\n\n## ✅ WORSHIP SECTION - MOSTLY FUNCTIONAL:\n\n**Minor Issues:**\n- Song search case-sensitivity\n- Missing key transposition feature\n- Export functionality needed\n\n**Suggestions:**\n- Add chord chart uploads\n- Implement CCLI reporting automation\n- Create setlist templates\n\n---\n\n## 📊 Monday.com Integration: ✅ DEPLOYED\n- Testing group created: group_mm0x21gb\n- 4 testing items added to board\n- Real-time progress tracking active\n- Board URL: https://trendfarm-squad.monday.com/boards/5091670404\n\n## 🎯 RECOMMENDED ACTION PLAN:\n1. **URGENT:** Fix Small Groups data loss issue\n2. **HIGH:** Repair Services recurring events\n3. **MEDIUM:** Add comprehensive error handling\n4. **LOW:** Implement UX improvements\n\n**Production Readiness: ❌ CRITICAL FIXES REQUIRED**',
        tokens: {
          input: 200,
          output: 1200,
          total: 1400
        }
      },
      {
        id: 'test_003',
        agentId: 'atlas',
        agentName: 'Atlas',
        projectId: 'churchos',
        task: 'Complete UI regression testing after authentication module updates',
        status: 'completed',
        deployedAt: '2026-02-25T12:10:00Z',
        completedAt: '2026-02-25T12:15:00Z',
        duration: 300,
        result: '# ChurchOS UI Regression Test Report\n\n## Authentication Module Testing: ✅ PASSED\n\n### Tests Executed:\n- Login flow: All browsers ✅\n- Registration process: Desktop & mobile ✅\n- Password reset: Email delivery confirmed ✅\n- Session management: Timeout handling correct ✅\n\n### Issues Found: 0 Critical, 1 Minor\n\n**Minor Issue:**\n- Mobile login button slightly misaligned on iOS Safari\n- Recommendation: Adjust CSS padding by 2px\n\n### Performance:\n- Login response time: 1.2s (Target: <2s) ✅\n- Registration completion: 2.1s (Target: <3s) ✅\n\n### UX Recommendations:\n1. Add loading spinner during login process\n2. Improve password strength indicator visibility\n3. Consider "Remember Me" checkbox positioning\n\n**Overall Status: READY FOR PRODUCTION**',
        tokens: {
          input: 150,
          output: 800,
          total: 950
        }
      },
      {
        id: 'test_002',
        agentId: 'atlas',
        agentName: 'Atlas',
        projectId: 'churchos',
        task: 'Comprehensive member management module testing',
        status: 'completed',
        deployedAt: '2026-02-25T10:30:00Z',
        completedAt: '2026-02-25T10:37:00Z',
        duration: 420,
        result: '# Member Management Testing Report\n\n## Functionality Test Results: ✅ PASSED\n\n### Core Features Tested:\n- Member registration: All fields validate correctly ✅\n- Profile editing: Data persistence confirmed ✅\n- Directory search: Fast and accurate results ✅\n- Family linking: Relationships save properly ✅\n- Bulk import: CSV processing works ✅\n\n### Issues Identified: 2 Major, 3 Minor\n\n**Major Issues:**\n1. Profile photo upload fails for files >2MB\n   - Error: "Request timeout after 30s"\n   - Recommendation: Implement client-side image compression\n\n2. Directory pagination broken on mobile\n   - Next/Previous buttons non-responsive\n   - Affects user experience significantly\n\n**Minor Issues:**\n1. Member search case-sensitivity issue\n2. Date picker styling inconsistent\n3. Export button tooltip unclear\n\n### Modal Analysis:\n- Registration modal: Needs progress indicator\n- Profile edit modal: Consider tabbed interface for large forms\n- Family link modal: Add relationship type explanations\n\n**Status: REQUIRES FIXES BEFORE RELEASE**',
        tokens: {
          input: 200,
          output: 1200,
          total: 1400
        }
      },
      {
        id: 'test_001',
        agentId: 'atlas',
        agentName: 'Atlas',
        projectId: 'churchos',
        task: 'Initial comprehensive application testing - all modules',
        status: 'completed',
        deployedAt: '2026-02-25T08:45:00Z',
        completedAt: '2026-02-25T08:47:00Z',
        duration: 127,
        result: '# ChurchOS Initial Testing Report\n\n## Application Overview Test: ✅ BASELINE ESTABLISHED\n\n### Modules Tested:\n- Authentication: ✅ Functional\n- Member Management: ⚠️ Minor issues\n- Event System: ✅ Functional  \n- Communications: 🔧 Needs attention\n- Financial: ✅ Functional\n- Admin Dashboard: ✅ Functional\n\n### Critical Findings:\n**No Critical Issues** - Application stable for development testing\n\n### Major Areas for Improvement:\n1. **Communication Module:**\n   - Email delivery confirmation missing\n   - SMS integration needs testing\n   - Notification preferences unclear\n\n2. **Performance Optimization:**\n   - Dashboard loads slowly with >500 members\n   - Consider pagination or lazy loading\n\n3. **Mobile Responsiveness:**\n   - Several modals need mobile optimization\n   - Navigation menu behavior inconsistent\n\n### Recommendations:\n1. Implement comprehensive error handling\n2. Add loading states throughout application\n3. Create consistent modal design patterns\n4. Optimize database queries for performance\n\n**Next Testing Priority: Deep dive into communication module**',
        tokens: {
          input: 180,
          output: 950,
          total: 1130
        }
      }
    ]
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