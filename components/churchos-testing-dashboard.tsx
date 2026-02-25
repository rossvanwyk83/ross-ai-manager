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

          {/* CRITICAL ISSUES - Small Groups */}
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded text-xs font-medium uppercase bg-red-900/50 text-red-300">
                    CRITICAL
                  </span>
                  <span className="text-gray-400 text-sm">Small Groups</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Member Deletion Causes Permanent Data Loss</h4>
                <p className="text-red-300 font-medium mb-2">🚨 PRODUCTION BLOCKER - IMMEDIATE FIX REQUIRED</p>
                <p className="text-gray-400">When removing a member from a small group, the system permanently deletes ALL historical data including attendance records, meeting notes, and participation history.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-white mb-2">Reproduction Steps:</h5>
                <ol className="text-sm text-gray-300 space-y-1">
                  <li className="flex"><span className="text-red-400 mr-2">1.</span>Navigate to Small Groups section</li>
                  <li className="flex"><span className="text-red-400 mr-2">2.</span>Select group with members who have attendance history</li>
                  <li className="flex"><span className="text-red-400 mr-2">3.</span>Go to member management</li>
                  <li className="flex"><span className="text-red-400 mr-2">4.</span>Remove/delete a member from the group</li>
                  <li className="flex"><span className="text-red-400 mr-2">5.</span><strong>RESULT: All historical data permanently lost</strong></li>
                </ol>
              </div>
              <div>
                <h5 className="font-medium text-white mb-2">Business Impact:</h5>
                <ul className="text-sm text-red-300 space-y-1">
                  <li>• Violates data protection principles</li>
                  <li>• Damages user trust permanently</li>
                  <li>• Potential legal liability for churches</li>
                  <li>• Makes attendance tracking useless</li>
                </ul>
                <h5 className="font-medium text-white mb-2 mt-4">Fix Required:</h5>
                <p className="text-sm text-green-400">Implement soft deletion system with data preservation. Add confirmation dialog with clear warning about data impact.</p>
              </div>
            </div>
          </div>

          {/* MAJOR ISSUES - Services */}
          <div className="bg-orange-900/20 border border-orange-500/50 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded text-xs font-medium uppercase bg-orange-900/50 text-orange-300">
                    MAJOR
                  </span>
                  <span className="text-gray-400 text-sm">Services</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Recurring Service Creation Broken</h4>
                <p className="text-gray-400">Churches cannot set up weekly or monthly recurring services. Only single services are created despite recurrence settings.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-white mb-2">Reproduction Steps:</h5>
                <ol className="text-sm text-gray-300 space-y-1">
                  <li className="flex"><span className="text-orange-400 mr-2">1.</span>Navigate to Services section</li>
                  <li className="flex"><span className="text-orange-400 mr-2">2.</span>Click "Create New Service"</li>
                  <li className="flex"><span className="text-orange-400 mr-2">3.</span>Fill service details and set to "Weekly"</li>
                  <li className="flex"><span className="text-orange-400 mr-2">4.</span>Set end date for series</li>
                  <li className="flex"><span className="text-orange-400 mr-2">5.</span><strong>RESULT: Only single service created</strong></li>
                </ol>
              </div>
              <div>
                <h5 className="font-medium text-white mb-2">Additional Major Issues:</h5>
                <ul className="text-sm text-orange-300 space-y-1">
                  <li>• Schedule conflict detection missing</li>
                  <li>• Staff double-booking allowed</li>
                  <li>• No facility conflict checking</li>
                  <li>• Staff assignment validation problems</li>
                </ul>
                <h5 className="font-medium text-white mb-2 mt-4">Fix Timeline:</h5>
                <p className="text-sm text-green-400">1-2 weeks focused development for core recurring functionality</p>
              </div>
            </div>
          </div>

          {/* MINOR ISSUES - Worship */}
          <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded text-xs font-medium uppercase bg-green-900/50 text-green-300">
                    READY
                  </span>
                  <span className="text-gray-400 text-sm">Worship</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Production Ready - Minor Improvements Only</h4>
                <p className="text-gray-400">Worship section is fully functional with excellent core features. Only minor enhancements needed.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-white mb-2">What Works Perfectly:</h5>
                <ul className="text-sm text-green-300 space-y-1">
                  <li>• Song management (add/edit/delete)</li>
                  <li>• Setlist creation and organization</li>
                  <li>• Lyrics display and formatting</li>
                  <li>• CCLI number tracking</li>
                  <li>• Data persistence and reliability</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-white mb-2">Minor Improvements:</h5>
                <ul className="text-sm text-blue-300 space-y-1">
                  <li>• Song search case-sensitivity</li>
                  <li>• Limited export functionality</li>
                  <li>• Key transposition feature</li>
                  <li>• Chord chart uploads</li>
                </ul>
                <h5 className="font-medium text-white mb-2 mt-4">Recommendation:</h5>
                <p className="text-sm text-green-400">✅ DEPLOY IMMEDIATELY - This section is production ready</p>
              </div>
            </div>
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
          {/* Production Readiness Summary */}
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-red-300 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Production Readiness Assessment
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400 mb-2">🚫</div>
                <div className="text-white font-medium">Small Groups</div>
                <div className="text-red-400 text-sm">CRITICAL ISSUES</div>
                <div className="text-xs text-gray-400 mt-1">Data loss risk</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400 mb-2">⚠️</div>
                <div className="text-white font-medium">Services</div>
                <div className="text-orange-400 text-sm">MAJOR ISSUES</div>
                <div className="text-xs text-gray-400 mt-1">Recurring broken</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">✅</div>
                <div className="text-white font-medium">Worship</div>
                <div className="text-green-400 text-sm">PRODUCTION READY</div>
                <div className="text-xs text-gray-400 mt-1">Deploy immediately</div>
              </div>
            </div>
          </div>

          {/* Development Roadmap */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recommended Development Roadmap
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 bg-red-900/10 p-4 rounded-r-lg">
                <h4 className="font-medium text-white mb-2">PHASE 1: Critical Fixes (Week 1-2)</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• 🚨 <strong>URGENT:</strong> Fix Small Groups data loss issue</li>
                  <li>• 🔶 <strong>HIGH:</strong> Repair Services recurring service creation</li>
                  <li>• 🔶 <strong>HIGH:</strong> Implement basic schedule conflict detection</li>
                  <li>• 🔧 Add essential time validation throughout</li>
                </ul>
                <div className="text-xs text-red-400 mt-2">Priority: Production blocking issues must be resolved</div>
              </div>
              
              <div className="border-l-4 border-orange-500 bg-orange-900/10 p-4 rounded-r-lg">
                <h4 className="font-medium text-white mb-2">PHASE 2: Quality & Launch Prep (Week 3-4)</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• 🛡️ Add comprehensive error handling</li>
                  <li>• ⚡ Improve user experience and workflows</li>
                  <li>• 🧪 Comprehensive testing and validation</li>
                  <li>• 📚 User documentation and training materials</li>
                </ul>
                <div className="text-xs text-orange-400 mt-2">Priority: Production readiness and user experience</div>
              </div>
              
              <div className="border-l-4 border-green-500 bg-green-900/10 p-4 rounded-r-lg">
                <h4 className="font-medium text-white mb-2">PHASE 3: Enhancement Features (Post-Launch)</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• 🎵 Worship: Key transposition and chord charts</li>
                  <li>• 📊 Advanced analytics and reporting</li>
                  <li>• 📱 Mobile optimization and responsive design</li>
                  <li>• 🔗 Third-party integration (calendar, presentation software)</li>
                </ul>
                <div className="text-xs text-green-400 mt-2">Priority: Competitive advantage and user delight</div>
              </div>
            </div>
          </div>

          {/* Launch Options */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Launch Strategy Options
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4">
                <h4 className="font-medium text-green-300 mb-2">Option A: Delayed Launch</h4>
                <div className="text-green-400 text-sm mb-2">RECOMMENDED</div>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Wait 2-4 weeks for all fixes</li>
                  <li>• Launch with solid foundation</li>
                  <li>• Reduced support burden</li>
                  <li>• Professional reputation maintained</li>
                </ul>
                <div className="text-xs text-green-400 mt-2">Best long-term strategy</div>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4">
                <h4 className="font-medium text-blue-300 mb-2">Option B: Phased Launch</h4>
                <div className="text-blue-400 text-sm mb-2">ALTERNATIVE</div>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Deploy Worship immediately</li>
                  <li>• Add Services after fixes (2 weeks)</li>
                  <li>• Add Small Groups after critical fixes (4 weeks)</li>
                </ul>
                <div className="text-xs text-blue-400 mt-2">Immediate market entry</div>
              </div>
              
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                <h4 className="font-medium text-red-300 mb-2">Option C: Immediate Launch</h4>
                <div className="text-red-400 text-sm mb-2">NOT RECOMMENDED</div>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• High risk due to data loss issue</li>
                  <li>• Could damage user trust permanently</li>
                  <li>• Significant support burden</li>
                  <li>• Poor user experience</li>
                </ul>
                <div className="text-xs text-red-400 mt-2">Unacceptable risk level</div>
              </div>
            </div>
          </div>

          {/* Resource Requirements */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Resource Requirements
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Development Team (2-4 weeks)</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Senior Developer: 2-3 weeks full-time</li>
                  <li>• QA Testing: 1 week comprehensive testing</li>
                  <li>• UI/UX Designer: 0.5 weeks for improved flows</li>
                  <li>• Product Manager: Ongoing prioritization</li>
                </ul>
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Infrastructure & Support</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Enhanced data backup systems</li>
                  <li>• Error tracking and monitoring</li>
                  <li>• User documentation and guides</li>
                  <li>• Church staff training materials</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}