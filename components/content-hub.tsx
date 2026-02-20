'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ContentViewerModal } from '@/components/content-viewer-modal'
import { 
  FileText, 
  TrendingUp, 
  Calendar, 
  ExternalLink, 
  Eye, 
  MessageSquare,
  Share2,
  Edit3,
  Plus,
  Search,
  Filter
} from 'lucide-react'

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
}

interface ContentHubProps {
  businessId: string
  businessName: string
}

export function ContentHub({ businessId, businessName }: ContentHubProps) {
  const [content, setContent] = useState<ContentItem[]>([])
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [isAddingContent, setIsAddingContent] = useState(false)

  // Load content on mount
  useEffect(() => {
    loadContent()
  }, [businessId])

  const loadContent = async () => {
    try {
      const response = await fetch(`/api/content-proxy?business=${businessId}`)
      if (response.ok) {
        const data = await response.json()
        setContent(data.content || [])
        console.log('Loaded content:', data.count, 'items for', businessId)
      } else {
        console.error('Failed to load content:', response.status, await response.text())
      }
    } catch (error) {
      console.error('Failed to load content:', error)
    }
  }

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || item.type === filterType
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog': return <FileText className="w-4 h-4" />
      case 'research': return <Search className="w-4 h-4" />
      case 'email': return <MessageSquare className="w-4 h-4" />
      case 'landing-page': return <ExternalLink className="w-4 h-4" />
      case 'social': return <Share2 className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Content Hub</h2>
          <p className="text-gray-400">Manage and track all {businessName} content</p>
        </div>
        <Button onClick={() => setIsAddingContent(true)} className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80">
          <Plus className="w-4 h-4" />
          Add Content
        </Button>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-gray-700">
          <TabsTrigger value="content" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-primary">Content Library</TabsTrigger>
          <TabsTrigger value="metrics" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-primary">Performance</TabsTrigger>
          <TabsTrigger value="calendar" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-primary">Publishing Calendar</TabsTrigger>
          <TabsTrigger value="research" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-primary">Research Hub</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-primary"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:border-primary focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="blog">Blog Posts</option>
              <option value="research">Research</option>
              <option value="email">Email Sequences</option>
              <option value="landing-page">Landing Pages</option>
              <option value="social">Social Media</option>
            </select>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContent.map((item) => (
              <Card key={item.id} className="cursor-pointer hover:shadow-lg transition-shadow bg-gray-800 border-gray-700 hover:border-primary">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="text-primary">{getTypeIcon(item.type)}</div>
                      <CardTitle className="text-lg text-white">{item.title}</CardTitle>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-400">{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Keywords */}
                  <div className="flex flex-wrap gap-1">
                    {item.keywords.slice(0, 3).map((keyword, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                    {item.keywords.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{item.keywords.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Metrics */}
                  {item.status === 'published' && (
                    <div className="grid grid-cols-3 gap-2 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {item.views || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {item.engagement || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {item.conversions || 0}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedContent(item)}
                      className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-primary hover:text-white"
                    >
                      <Edit3 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    {item.publishedUrl && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-primary hover:text-white"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {content.reduce((sum, item) => sum + (item.views || 0), 0).toLocaleString()}
                </div>
                <p className="text-xs text-gray-400">
                  Across all published content
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Engagement</CardTitle>
                <MessageSquare className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">
                  {content.reduce((sum, item) => sum + (item.engagement || 0), 0)}
                </div>
                <p className="text-xs text-gray-400">
                  Total interactions
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Conversions</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-500">
                  {content.reduce((sum, item) => sum + (item.conversions || 0), 0)}
                </div>
                <p className="text-xs text-gray-400">
                  Total conversions
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Published</CardTitle>
                <FileText className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">
                  {content.filter(item => item.status === 'published').length}
                </div>
                <p className="text-xs text-gray-400">
                  Of {content.length} total pieces
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-primary">Publishing Calendar</CardTitle>
              <CardDescription className="text-gray-400">Schedule and track content publication</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {content
                  .filter(item => item.status === 'scheduled')
                  .map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 border border-gray-700 bg-gray-900 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">{item.title}</h4>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-300">{item.publishedDate}</p>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                {content.filter(item => item.status === 'scheduled').length === 0 && (
                  <p className="text-gray-400 text-center py-8">No scheduled content</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="research" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content
              .filter(item => item.type === 'research')
              .map(item => (
                <Card key={item.id} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Search className="w-4 h-4 text-primary" />
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {item.keywords.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedContent(item)}
                        className="w-full bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-primary hover:text-white"
                      >
                        View Research
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Content Viewer Modal */}
      <ContentViewerModal 
        content={selectedContent} 
        onClose={() => setSelectedContent(null)} 
      />
    </div>
  )
}