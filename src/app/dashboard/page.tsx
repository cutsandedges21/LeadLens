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

    async function fetchDashboardData() {
      try {
        const { data: audits, error } = await supabase
          .from('analyses')
          .select('*')
          .eq('user_id', user.id)
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
        <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
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
        return 'text-blue-600'
      case 'instagram':
        return 'text-pink-600'
      case 'youtube':
        return 'text-red-600'
      default:
        return 'text-slate-600'
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">Welcome back! Here's your audit overview.</p>
      </div>

      {recentAudit ? (
        <Card className="border-2 border-slate-200 shadow-lg">
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
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 text-sm">{recentAudit.url}</span>
              </div>
              <p className="text-slate-700 text-lg leading-relaxed">
                {recentAudit.report.overallInterpretation}
              </p>
            </div>

            <div className="flex gap-4">
              <Link href="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700">
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
        <Card className="border-2 border-dashed border-slate-300">
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Audits Yet</h3>
            <p className="text-slate-500 mb-6">Start by running your first audit to see insights here.</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Run Your First Audit
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-600">Overall Score</span>
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {recentAudit ? recentAudit.report.scores.overall + '%' : 'N/A'}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-600">Total Audits</span>
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">{stats.totalAudits}</div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-600">Average Score</span>
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">{stats.averageScore}%</div>
          </CardContent>
        </Card>
      </div>

      {stats.totalAudits > 1 && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📊</span>
                  <div>
                    <p className="font-medium text-slate-900">Improvement Rate</p>
                    <p className="text-sm text-slate-600">Score change over time</p>
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