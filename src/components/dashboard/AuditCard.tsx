'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Calendar, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'

interface AuditCardProps {
  audit: {
    id: string
    url: string
    platform_type: 'website' | 'instagram' | 'youtube'
    report: {
      scores: {
        overall: number
        ux: number
        messaging: number
        trust: number
        speed: number
      }
      overallInterpretation: string
    }
    created_at: string
    status: 'completed' | 'in_progress' | 'failed'
  }
  onClick?: () => void
}

export function AuditCard({ audit, onClick }: AuditCardProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'website':
        return '🌐'
      case 'instagram':
        return '📸'
      case 'youtube':
        return '▶️'
      default:
        return '📊'
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'website':
        return 'border-blue-500 bg-blue-50'
      case 'instagram':
        return 'border-pink-500 bg-pink-50'
      case 'youtube':
        return 'border-red-500 bg-red-50'
      default:
        return 'border-slate-500 bg-slate-50'
    }
  }

  const getPlatformTextColor = (platform: string) => {
    switch (platform) {
      case 'website':
        return 'text-blue-600'
      case 'instagram':
        return 'text-pink-600'
      case 'youtube':
        return 'text-red-600'
      default:
        return 'text-slate-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'in_progress':
        return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg ${getPlatformColor(audit.platform_type)} border-2`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getPlatformIcon(audit.platform_type)}</span>
            <div>
              <h3 className="font-semibold text-slate-900 capitalize">
                {audit.platform_type}
              </h3>
              <p className="text-xs text-slate-500">{formatDate(audit.created_at)}</p>
            </div>
          </div>
          {getStatusIcon(audit.status)}
        </div>
        <p className="text-sm text-slate-600 truncate" title={audit.url}>
          {audit.url}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-600">Overall Score</span>
          </div>
          <span className={`text-2xl font-bold ${getScoreColor(audit.report.scores.overall)}`}>
            {audit.report.scores.overall}%
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">UX:</span>
            <span className={getScoreColor(audit.report.scores.ux)}>{audit.report.scores.ux}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Messaging:</span>
            <span className={getScoreColor(audit.report.scores.messaging)}>{audit.report.scores.messaging}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Trust:</span>
            <span className={getScoreColor(audit.report.scores.trust)}>{audit.report.scores.trust}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Speed:</span>
            <span className={getScoreColor(audit.report.scores.speed)}>{audit.report.scores.speed}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
