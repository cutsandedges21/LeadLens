'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, TrendingUp, FileText, Activity } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

interface Audit {
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
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const [recentAudit, setRecentAudit] = useState<Audit | null>(null)
  const [stats, setStats] = useState({
    totalAudits: 0,
    averageScore: 0,
    improvementRate: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const currentUser = user

    async function fetchDashboardData() {
      try {
        const { data: audits, error } = await supabase
          .from('analyses')
          .select('*')
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false })
          .limit(10)

        if (error) throw error

        if (audits && audits.length > 0) {
          setRecentAudit(audits[0])

          const totalAudits = audits.length
          const averageScore = Math.round(
            audits.reduce((sum, audit) => sum + audit.report.scores.overall, 0) / totalAudits
          )

          const improvementRate =
            audits.length > 1
              ? Math.round(
                ((audits[0].report.scores.overall - audits[audits.length - 1].report.scores.overall) /
                  audits[audits.length - 1].report.scores.overall) *
                100
              )
              : 0

          setStats({
            totalAudits,
            averageScore,
            improvementRate,
          })
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [user])

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-border border-t-brand rounded-full animate-spin"></div>
      </div>
    )
  }

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
        return 'text-brand'
      case 'instagram':
        return 'text-destructive'
      case 'youtube':
        return 'text-red-600'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your audit overview.</p>
      </div>

      {recentAudit ? (
        <Card className="border-2 border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="text-2xl">{getPlatformIcon(recentAudit.platform_type)}</span>
              Recent Audit Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={'text-lg font-semibold ' + getPlatformColor(recentAudit.platform_type)}>
                  {recentAudit.platform_type.charAt(0).toUpperCase() + recentAudit.platform_type.slice(1)}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground text-sm">{recentAudit.url}</span>
              </div>
              <p className="text-foreground text-lg leading-relaxed">
                {recentAudit.report.overallInterpretation}
              </p>
            </div>

            <div className="flex gap-4">
              <Link href="/dashboard">
                <Button className="bg-brand hover:bg-brand">
                  View All Audits
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Button variant="outline">
                Run New Audit
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-2 border-dashed border-border">
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Audits Yet</h3>
            <p className="text-muted-foreground mb-6">Start by running your first audit to see insights here.</p>
            <Button className="bg-brand hover:bg-brand">
              Run Your First Audit
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Overall Score</span>
              <Activity className="w-5 h-5 text-brand" />
            </div>
            <div className="text-3xl font-bold text-foreground">
              {recentAudit ? recentAudit.report.scores.overall + '%' : 'N/A'}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Total Audits</span>
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-foreground">{stats.totalAudits}</div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Average Score</span>
              <TrendingUp className="w-5 h-5 text-brand" />
            </div>
            <div className="text-3xl font-bold text-foreground">{stats.averageScore}%</div>
          </CardContent>
        </Card>
      </div>

      {stats.totalAudits > 1 && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📊</span>
                  <div>
                    <p className="font-medium text-foreground">Improvement Rate</p>
                    <p className="text-sm text-muted-foreground">Score change over time</p>
                  </div>
                </div>
                <div className={'text-2xl font-bold ' + (stats.improvementRate >= 0 ? 'text-green-600' : 'text-red-600')}>
                  {(stats.improvementRate >= 0 ? '+' : '') + stats.improvementRate}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}