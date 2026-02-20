import React, { useState } from 'react'
import { Clock, CheckCircle, AlertCircle, Activity, Calendar, TrendingUp } from 'lucide-react'
import { AgentActivity, AgentDeployment, getAgentActivity, getRecentDeployments, formatDuration, formatTimestamp, truncateResult } from '@/lib/agent-activity'

interface AgentActivityDashboardProps {
  projectId: string
}

export function AgentActivityDashboard({ projectId }: AgentActivityDashboardProps) {
  const [selectedView, setSelectedView] = useState<'overview' | 'recent' | 'agents'>('overview')
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  
  const agentActivity = getAgentActivity(projectId)
  const recentDeployments = getRecentDeployments(projectId)
  
  const totalDeployments = agentActivity.reduce((sum, agent) => sum + agent.totalDeployments, 0)
  const totalCompleted = agentActivity.reduce((sum, agent) => sum + agent.totalCompleted, 0)
  const totalRuntime = agentActivity.reduce((sum, agent) => sum + agent.totalRuntime, 0)
  
  const successRate = totalDeployments > 0 ? Math.round((totalCompleted / totalDeployments) * 100) : 0
  const avgDuration = totalCompleted > 0 ? Math.round(totalRuntime / totalCompleted) : 0

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">Agent Activity Dashboard</h2>
          <p className="text-gray-400">Track your AI agents' performance and results over time</p>
        </div>
        
        {/* View Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedView('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedView === 'overview'
                ? 'bg-primary text-white'
                : 'bg-gray-800 text-gray-300 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedView('recent')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedView === 'recent'
                ? 'bg-primary text-white'
                : 'bg-gray-800 text-gray-300 hover:text-white'
            }`}
          >
            Recent Activity
          </button>
          <button
            onClick={() => setSelectedView('agents')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedView === 'agents'
                ? 'bg-primary text-white'
                : 'bg-gray-800 text-gray-300 hover:text-white'
            }`}
          >
            Agent Details
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      {selectedView === 'overview' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-blue-500" />
                <span className="text-gray-400 text-sm">Total Deployments</span>
              </div>
              <div className="text-2xl font-bold text-white">{totalDeployments}</div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-gray-400 text-sm">Completed</span>
              </div>
              <div className="text-2xl font-bold text-white">{totalCompleted}</div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <span className="text-gray-400 text-sm">Success Rate</span>
              </div>
              <div className="text-2xl font-bold text-white">{successRate}%</div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-gray-400 text-sm">Avg Duration</span>
              </div>
              <div className="text-2xl font-bold text-white">{formatDuration(avgDuration)}</div>
            </div>
          </div>

          {/* Recent Deployments Preview */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentDeployments.slice(0, 3).map((deployment) => (
                <div key={deployment.id} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-primary">{deployment.agentName}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        deployment.status === 'completed'
                          ? 'bg-green-900 text-green-300'
                          : deployment.status === 'running'
                          ? 'bg-blue-900 text-blue-300'
                          : 'bg-red-900 text-red-300'
                      }`}>
                        {deployment.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{truncateResult(deployment.task, 80)}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-300">{formatTimestamp(deployment.deployedAt)}</div>
                    {deployment.duration && (
                      <div className="text-xs text-gray-500">{formatDuration(deployment.duration)}</div>
                    )}
                  </div>
                </div>
              ))}
              {recentDeployments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No deployments yet. Deploy an agent to see activity here.
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Recent Activity View */}
      {selectedView === 'recent' && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-primary mb-4">All Recent Deployments</h3>
          <div className="space-y-4">
            {recentDeployments.map((deployment) => (
              <div key={deployment.id} className="border border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-primary">{deployment.agentName}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      deployment.status === 'completed'
                        ? 'bg-green-900 text-green-300'
                        : deployment.status === 'running'
                        ? 'bg-blue-900 text-blue-300'
                        : 'bg-red-900 text-red-300'
                    }`}>
                      {deployment.status}
                    </span>
                  </div>
                  <div className="text-right text-sm">
                    <div className="text-gray-300">{formatTimestamp(deployment.deployedAt)}</div>
                    {deployment.duration && (
                      <div className="text-gray-500">{formatDuration(deployment.duration)}</div>
                    )}
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-400 font-medium mb-2">Task:</p>
                  <p className="text-gray-300 text-sm">{deployment.task}</p>
                </div>
                
                {deployment.result && (
                  <div>
                    <p className="text-gray-400 font-medium mb-2">Result Preview:</p>
                    <div className="bg-gray-900 rounded p-3 text-sm text-gray-300 max-h-32 overflow-y-auto">
                      <pre className="whitespace-pre-wrap">{truncateResult(deployment.result, 500)}</pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {recentDeployments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No deployments yet. Deploy an agent to see detailed results here.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Agent Details View */}
      {selectedView === 'agents' && (
        <div className="space-y-4">
          {agentActivity.map((agent) => (
            <div key={agent.agentId} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-primary">{agent.agentName}</h3>
                  <p className="text-gray-400 text-sm">
                    {agent.totalDeployments} deployments • {agent.totalCompleted} completed
                    {agent.lastActive && ` • Last active ${formatTimestamp(agent.lastActive)}`}
                  </p>
                </div>
                
                <div className="flex gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-500">{agent.totalDeployments}</div>
                    <div className="text-gray-500">Deployed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-500">{agent.totalCompleted}</div>
                    <div className="text-gray-500">Completed</div>
                  </div>
                  {agent.averageDuration && (
                    <div className="text-center">
                      <div className="text-xl font-bold text-orange-500">{formatDuration(agent.averageDuration)}</div>
                      <div className="text-gray-500">Avg Time</div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Agent's Recent Deployments */}
              {agent.deployments.length > 0 && (
                <div>
                  <h4 className="text-md font-medium text-gray-300 mb-2">Recent Work:</h4>
                  <div className="space-y-2">
                    {agent.deployments.slice(0, 2).map((deployment) => (
                      <div key={deployment.id} className="bg-gray-900 rounded p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-300">{formatTimestamp(deployment.deployedAt)}</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            deployment.status === 'completed'
                              ? 'bg-green-900 text-green-300'
                              : deployment.status === 'running'
                              ? 'bg-blue-900 text-blue-300'
                              : 'bg-red-900 text-red-300'
                          }`}>
                            {deployment.status}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{truncateResult(deployment.task, 100)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {agent.deployments.length === 0 && (
                <div className="text-gray-500 text-sm italic">No deployments yet</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}