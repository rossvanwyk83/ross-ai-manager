import React from 'react'
import { X, ExternalLink, Edit3, Calendar, TrendingUp, MessageSquare, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ContentItem {
  id: string
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
  createdAt?: string
  updatedAt?: string
}

interface ContentViewerModalProps {
  content: ContentItem | null
  onClose: () => void
}

export function ContentViewerModal({ content, onClose }: ContentViewerModalProps) {
  if (!content) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-900 text-green-300'
      case 'scheduled': return 'bg-blue-900 text-blue-300'  
      case 'draft': return 'bg-gray-900 text-gray-300'
      default: return 'bg-gray-900 text-gray-300'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog': return '📝'
      case 'research': return '🔍'
      case 'email': return '✉️'
      case 'landing-page': return '🚀'
      case 'social': return '📱'
      default: return '📄'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getTypeIcon(content.type)}</span>
            <div>
              <h2 className="text-xl font-bold text-white">{content.title}</h2>
              <p className="text-gray-400 text-sm">{content.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={getStatusColor(content.status)}>
              {content.status}
            </Badge>
            <Button
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-4 h-full">
            {/* Sidebar - Metadata */}
            <div className="bg-gray-900 p-6 border-r border-gray-700 space-y-6">
              {/* Keywords */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Keywords</h3>
                <div className="flex flex-wrap gap-1">
                  {content.keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              {content.status === 'published' && (
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Performance</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">Views</span>
                      </div>
                      <span className="text-sm font-medium text-white">{content.views || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">Engagement</span>
                      </div>
                      <span className="text-sm font-medium text-white">{content.engagement || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">Conversions</span>
                      </div>
                      <span className="text-sm font-medium text-white">{content.conversions || 0}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Dates */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Dates</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  {content.createdAt && (
                    <div>
                      <span className="font-medium">Created:</span><br />
                      {new Date(content.createdAt).toLocaleDateString()}
                    </div>
                  )}
                  {content.updatedAt && (
                    <div>
                      <span className="font-medium">Updated:</span><br />
                      {new Date(content.updatedAt).toLocaleDateString()}
                    </div>
                  )}
                  {content.publishedDate && (
                    <div>
                      <span className="font-medium">Published:</span><br />
                      {new Date(content.publishedDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              {/* File Path */}
              {content.filePath && (
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-2">File Location</h3>
                  <p className="text-xs text-gray-500 break-all">{content.filePath}</p>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2">
                {content.publishedUrl && (
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Published
                  </Button>
                )}
                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-primary hover:text-white"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Content
                </Button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 overflow-y-auto max-h-[60vh]">
              <div className="p-6">
                <div className="prose prose-invert max-w-none">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono">
                      {content.content}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}