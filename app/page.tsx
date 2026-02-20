'use client'

import { useState, useEffect } from 'react'
import { Bot, Briefcase, Building2, Shield, Zap, ChevronRight, FileText, TrendingUp, Calendar } from 'lucide-react'
import { ContentHub } from '@/components/content-hub'

interface Project {
  id: string
  name: string
  description: string
  type: string
  agents: Agent[]
  stats: {
    agents: number
    active: number
    completed: number
  }
}

interface Agent {
  id: string
  name: string
  role: string
  status: 'ready' | 'running' | 'completed'
}

const projectIcons = {
  'trendfarm': <Briefcase className="w-6 h-6" />,
  'churchos': <Building2 className="w-6 h-6" />,
  'shieldmyshop': <Shield className="w-6 h-6" />,
  'systemsfarm': <Zap className="w-6 h-6" />
}

export default function AIManagerDashboard() {
  const [selectedProject, setSelectedProject] = useState('trendfarm')
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [currentView, setCurrentView] = useState<'dashboard' | 'content'>('dashboard')
  const [deploymentForm, setDeploymentForm] = useState({
    agent: '',
    task: '',
    context: ''
  })

  useEffect(() => {
    // Load projects from API
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      // This will call our API route
      const response = await fetch('/api/projects')
      const data = await response.json()
      setProjects(data.projects || mockProjects)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      setProjects(mockProjects)
      setLoading(false)
    }
  }

  const mockProjects: Project[] = [
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
      description: 'Etsy trademark compliance scanner - prevent shop suspensions before they happen',
      type: 'product',
      agents: [
        { id: 'marketing-factory', name: 'Marketing Asset Factory', role: 'Generate complete marketing campaigns for Etsy trademark compliance tools', status: 'ready' },
        { id: 'compliance-specialist', name: 'Compliance Content Specialist', role: 'Create educational content about Etsy trademark compliance that ranks and converts', status: 'ready' },
        { id: 'conversion-optimizer', name: 'Conversion Optimization Expert', role: 'Optimize landing pages, pricing copy, and conversion funnels for maximum SaaS signups', status: 'ready' },
        { id: 'email-architect', name: 'Email Sequence Architect', role: 'Design high-converting email sequences that nurture free users into paid customers', status: 'ready' }
      ],
      stats: { agents: 4, active: 0, completed: 2 }
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

  const currentProject = projects.find(p => p.id === selectedProject) || projects[0]

  const deployAgent = async () => {
    if (!deploymentForm.agent || !deploymentForm.task) {
      alert('Please select an agent and describe the task')
      return
    }

    try {
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: selectedProject,
          agentId: deploymentForm.agent,
          task: deploymentForm.task,
          context: deploymentForm.context
        })
      })

      const result = await response.json()
      
      if (result.success) {
        alert(`Agent deployed successfully! Session: ${result.sessionKey}`)
        setDeploymentForm({ agent: '', task: '', context: '' })
      } else {
        alert(`Deployment failed: ${result.error}`)
      }
    } catch (error) {
      console.error('Deployment error:', error)
      alert('Deployment failed - check connection to OpenClaw')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Bot className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-gray-400">Loading AI Manager...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10 border-b border-gray-800 pb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            🚀 AI Project Manager
          </h1>
          <p className="text-gray-400 text-lg">Deploy specialized AI agent teams for each business project</p>
        </header>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Project Tabs */}
          <div className="flex flex-wrap gap-4">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-lg transition-all duration-200 ${
                  selectedProject === project.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-gray-900 border border-gray-700 hover:border-primary text-gray-300 hover:text-white'
                }`}
              >
                {projectIcons[project.id as keyof typeof projectIcons]}
                <span className="font-medium">{project.name}</span>
                <span className="bg-black/20 px-2 py-1 rounded text-sm">
                  {project.stats.agents}
                </span>
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                currentView === 'dashboard'
                  ? 'bg-primary text-white'
                  : 'bg-gray-900 border border-gray-700 hover:border-primary text-gray-300 hover:text-white'
              }`}
            >
              <Bot className="w-4 h-4" />
              Agents
            </button>
            <button
              onClick={() => setCurrentView('content')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                currentView === 'content'
                  ? 'bg-primary text-white'
                  : 'bg-gray-900 border border-gray-700 hover:border-primary text-gray-300 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              Content
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        {currentView === 'dashboard' ? (
          /* Dashboard Grid */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Project Overview */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                📋 Project Overview
              </h2>
              <div className="bg-gray-800 rounded-lg p-5 mb-6">
                <h3 className="text-lg font-bold text-primary mb-2">{currentProject?.name}</h3>
                <p className="text-gray-400 mb-4">{currentProject?.description}</p>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center bg-gray-900 rounded-lg p-3">
                    <div className="text-2xl font-bold text-primary">{currentProject?.stats.agents}</div>
                    <div className="text-gray-400 text-sm">Agents</div>
                  </div>
                  <div className="text-center bg-gray-900 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-500">{currentProject?.stats.active}</div>
                    <div className="text-gray-400 text-sm">Active</div>
                  </div>
                  <div className="text-center bg-gray-900 rounded-lg p-3">
                    <div className="text-2xl font-bold text-yellow-500">{currentProject?.stats.completed}</div>
                    <div className="text-gray-400 text-sm">Completed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Agents */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                🤖 Project Agents
              </h2>
              <div className="space-y-4">
                {currentProject?.agents.map((agent) => (
                  <div
                    key={agent.id}
                    className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-primary transition-colors cursor-pointer"
                    onClick={() => setDeploymentForm({ ...deploymentForm, agent: agent.id })}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-primary">{agent.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        agent.status === 'ready' ? 'bg-gray-700 text-gray-300' :
                        agent.status === 'running' ? 'bg-green-900 text-green-300' :
                        'bg-yellow-900 text-yellow-300'
                      }`}>
                        {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{agent.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deploy Agent */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                🚀 Deploy Agent
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Selected Agent</label>
                  <select
                    value={deploymentForm.agent}
                    onChange={(e) => setDeploymentForm({ ...deploymentForm, agent: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                  >
                    <option value="">Choose an agent...</option>
                    {currentProject?.agents.map((agent) => (
                      <option key={agent.id} value={agent.id}>{agent.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">Task Brief</label>
                  <textarea
                    value={deploymentForm.task}
                    onChange={(e) => setDeploymentForm({ ...deploymentForm, task: e.target.value })}
                    placeholder="Describe the task for this agent to complete..."
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">Context/Notes</label>
                  <input
                    type="text"
                    value={deploymentForm.context}
                    onChange={(e) => setDeploymentForm({ ...deploymentForm, context: e.target.value })}
                    placeholder="Additional context or requirements..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={deployAgent}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    🚀 Deploy Agent
                  </button>
                  <button
                    onClick={() => alert(`Preview: ${deploymentForm.agent} will work on "${deploymentForm.task}"`)}
                    className="px-4 py-3 bg-gray-800 border border-gray-700 hover:border-primary rounded-lg text-gray-300 transition-colors"
                  >
                    👁️
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Content Hub */
          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <ContentHub 
              businessId={selectedProject}
              businessName={currentProject?.name || ''}
            />
          </div>
        )}
      </div>
    </div>
  )
}