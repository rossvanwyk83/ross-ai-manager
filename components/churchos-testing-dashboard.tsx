import React, { useState } from 'react'
import { Bug, CheckCircle, AlertTriangle, XCircle, Monitor, Smartphone, Globe, Zap, Calendar, TrendingUp, Eye, Settings, FileText } from 'lucide-react'

interface TestResult {
  id: string
  module: string
  testType: 'functional' | 'ui' | 'performance' | 'accessibility'
  status: 'passed' | 'failed' | 'warning'
  issues: number
  timestamp: string
  duration: number
  details: string
}

interface TestIssue {
  id: string
  severity: 'critical' | 'major' | 'minor' | 'suggestion'
  module: string
  title: string
  description: string
  reproduction: string[]
  recommendation: string
  screenshot?: string
  timestamp: string
}

export function ChurchOSTestingDashboard() {
  const [selectedView, setSelectedView] = useState<'overview' | 'issues' | 'performance' | 'suggestions'>('overview')
  const [selectedModule, setSelectedModule] = useState<string>('all')

  // Mock testing data
  const recentTests: TestResult[] = [
    {
      id: 'test_003',
      module: 'Authentication',
      testType: 'ui',
      status: 'passed',
      issues: 1,
      timestamp: '2026-02-25T12:15:00Z',
      duration: 300,
      details: 'UI regression testing after authentication module updates'
    },
    {
      id: 'test_002', 
      module: 'Member Management',
      testType: 'functional',
      status: 'warning',
      issues: 5,
      timestamp: '2026-02-25T10:37:00Z',
      duration: 420,
      details: 'Comprehensive member management module testing'
    },
    {
      id: 'test_001',
      module: 'All Modules',
      testType: 'functional',
      status: 'passed',
      issues: 8,
      timestamp: '2026-02-25T08:47:00Z',
      duration: 127,
      details: 'Initial comprehensive application testing'
    }
  ]

  const activeIssues: TestIssue[] = [
    {
      id: 'issue_001',
      severity: 'major',
      module: 'Member Management',
      title: 'Profile photo upload fails for files >2MB',
      description: 'Users cannot upload profile photos larger than 2MB due to request timeout',
      reproduction: [
        'Navigate to member profile editing',
        'Attempt to upload image file >2MB',
        'Observe timeout error after 30 seconds'
      ],
      recommendation: 'Implement client-side image compression before upload',
      timestamp: '2026-02-25T10:37:00Z'
    },
    {
      id: 'issue_002',
      severity: 'major',
      module: 'Member Management', 
      title: 'Directory pagination broken on mobile',
      description: 'Next/Previous buttons are non-responsive on mobile devices',
      reproduction: [
        'Open member directory on mobile device',
        'Navigate to page 2 or beyond',
        'Attempt to click Next/Previous buttons',
        'Observe no response'
      ],
      recommendation: 'Fix mobile touch event handlers for pagination controls',
      timestamp: '2026-02-25T10:37:00Z'
    },
    {
      id: 'issue_003',
      severity: 'minor',
      module: 'Authentication',
      title: 'Mobile login button misaligned on iOS Safari',
      description: 'Login button appears slightly misaligned on iOS Safari browser',
      reproduction: [
        'Open login page on iOS Safari',
        'Observe button alignment'
      ],
      recommendation: 'Adjust CSS padding by 2px for Safari-specific styles',
      timestamp: '2026-02-25T12:15:00Z'
    }
  ]

  const modules = ['All', 'Authentication', 'Member Management', 'Events', 'Communications', 'Financial', 'Dashboard']

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default: return <Monitor className="w-4 h-4 text-gray-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-900/20 border-red-500/50'
      case 'major': return 'text-orange-500 bg-orange-900/20 border-orange-500/50'
      case 'minor': return 'text-yellow-500 bg-yellow-900/20 border-yellow-500/50'
      case 'suggestion': return 'text-blue-500 bg-blue-900/20 border-blue-500/50'
      default: return 'text-gray-500 bg-gray-900/20 border-gray-500/50'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${seconds}s`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
            <Bug className="w-6 h-6" />
            Atlas Testing Dashboard
          </h2>
          <p className="text-gray-400">Comprehensive automated testing and quality assurance for ChurchOS</p>
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
            onClick={() => setSelectedView('issues')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedView === 'issues'
                ? 'bg-primary text-white'
                : 'bg-gray-800 text-gray-300 hover:text-white'
            }`}
          >
            Issues
          </button>
          <button
            onClick={() => setSelectedView('performance')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedView === 'performance'
                ? 'bg-primary text-white'
                : 'bg-gray-800 text-gray-300 hover:text-white'
            }`}
          >
            Performance
          </button>
          <button
            onClick={() => setSelectedView('suggestions')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedView === 'suggestions'
                ? 'bg-primary text-white'
                : 'bg-gray-800 text-gray-300 hover:text-white'
            }`}
          >
            Suggestions
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      {selectedView === 'overview' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-gray-400 text-sm">Tests Passed</span>
              </div>
              <div className="text-2xl font-bold text-white">23</div>
              <div className="text-xs text-green-400 mt-1">+3 today</div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-gray-400 text-sm">Issues Found</span>
              </div>
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-xs text-red-400 mt-1">2 major, 1 minor</div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="text-gray-400 text-sm">Test Coverage</span>
              </div>
              <div className="text-2xl font-bold text-white">87%</div>
              <div className="text-xs text-blue-400 mt-1">6 modules tested</div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-purple-500" />
                <span className="text-gray-400 text-sm">Avg Response</span>
              </div>
              <div className="text-2xl font-bold text-white">1.4s</div>
              <div className="text-xs text-purple-400 mt-1">Within targets</div>
            </div>
          </div>

          {/* Recent Test Results */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Recent Test Results
            </h3>
            <div className="space-y-3">
              {recentTests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(test.status)}
                    <div>
                      <div className="font-medium text-white">{test.module}</div>
                      <div className="text-sm text-gray-400">{test.details}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-300">{formatTimestamp(test.timestamp)}</div>
                    <div className="text-xs text-gray-500">
                      {formatDuration(test.duration)} • {test.issues} issues
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Issues View */}
      {selectedView === 'issues' && (
        <div className="space-y-4">
          {/* Module Filter */}
          <div className="flex gap-2 flex-wrap">
            {modules.map((module) => (
              <button
                key={module}
                onClick={() => setSelectedModule(module.toLowerCase())}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedModule === module.toLowerCase()
                    ? 'bg-primary text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {module}
              </button>
            ))}
          </div>

          {/* Issues List */}
          <div className="space-y-4">
            {activeIssues.map((issue) => (
              <div key={issue.id} className={`bg-gray-800 rounded-lg p-6 border ${getSeverityColor(issue.severity)}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                      <span className="text-gray-400 text-sm">{issue.module}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{issue.title}</h4>
                    <p className="text-gray-400">{issue.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{formatTimestamp(issue.timestamp)}</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-white mb-2">Reproduction Steps:</h5>
                    <ol className="text-sm text-gray-400 space-y-1">
                      {issue.reproduction.map((step, index) => (
                        <li key={index} className="flex">
                          <span className="text-primary mr-2">{index + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-2">Recommendation:</h5>
                    <p className="text-sm text-green-400">{issue.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance View */}
      {selectedView === 'performance' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-primary mb-4">Response Times</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Login Process</span>
                <span className="text-green-400 font-medium">1.2s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Member Directory</span>
                <span className="text-yellow-400 font-medium">2.8s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Event Calendar</span>
                <span className="text-green-400 font-medium">1.7s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Dashboard Load</span>
                <span className="text-red-400 font-medium">4.2s</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-primary mb-4">Browser Compatibility</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-400">Chrome 121+</span>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-400">Firefox 122+</span>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-400">Safari 17+</span>
                </div>
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-green-600" />
                  <span className="text-gray-400">Mobile</span>
                </div>
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Suggestions View */}
      {selectedView === 'suggestions' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              UX Improvement Suggestions
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 bg-blue-900/10 p-4 rounded-r-lg">
                <h4 className="font-medium text-white mb-2">Registration Modal Enhancement</h4>
                <p className="text-gray-400 text-sm mb-2">The member registration modal could benefit from a progress indicator to show users their completion status.</p>
                <div className="text-xs text-blue-400">Impact: Improved user experience, reduced abandonment</div>
              </div>
              
              <div className="border-l-4 border-green-500 bg-green-900/10 p-4 rounded-r-lg">
                <h4 className="font-medium text-white mb-2">Loading States</h4>
                <p className="text-gray-400 text-sm mb-2">Add loading spinners throughout the application to provide feedback during longer operations.</p>
                <div className="text-xs text-green-400">Impact: Better perceived performance, clearer user feedback</div>
              </div>
              
              <div className="border-l-4 border-purple-500 bg-purple-900/10 p-4 rounded-r-lg">
                <h4 className="font-medium text-white mb-2">Dashboard Optimization</h4>
                <p className="text-gray-400 text-sm mb-2">Consider implementing pagination or lazy loading for the dashboard when displaying over 500 members.</p>
                <div className="text-xs text-purple-400">Impact: Improved performance, faster load times</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Modal Content Recommendations
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Profile Edit Modal</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Consider tabbed interface for large forms</li>
                  <li>• Add auto-save functionality</li>
                  <li>• Include field validation feedback</li>
                  <li>• Add cancel confirmation dialog</li>
                </ul>
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Family Link Modal</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Add relationship type explanations</li>
                  <li>• Include relationship visualization</li>
                  <li>• Provide quick-add family templates</li>
                  <li>• Add bulk family member import</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}