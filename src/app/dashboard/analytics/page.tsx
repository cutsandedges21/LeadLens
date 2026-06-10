'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

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
  }
  created_at: string
}

export default function AnalyticsPage() {
  const { user } = useAuth()
  const [audits, setAudits] = useState<Audit[]>([])
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const currentUser = user

    async function fetchAudits() {
      try {
        const { data, error } = await supabase
          .from('analyses')
          .select('*')
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false })

        if (error) throw error

        setAudits(data || [])
      } catch (error) {
        console.error('Error fetching audits:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAudits()
  }, [user])

  // Filter audits by date range
  const filteredAudits = audits.filter((audit) => {
    const auditDate = new Date(audit.created_at)
    const now = new Date()
    const daysAgo = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
    }[dateRange]

    const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
    return auditDate >= cutoffDate
  })

  // Prepare trend data
  const trendData = filteredAudits
    .map((audit) => ({
      date: new Date(audit.created_at).toLocaleDateString(),
      overall: audit.report.scores.overall,
      ux: audit.report.scores.ux,
      messaging: audit.report.scores.messaging,
      trust: audit.report.scores.trust,
      speed: audit.report.scores.speed,
    }))
    .reverse()

  // Calculate averages
  const calculateAverage = (key: keyof Audit['report']['scores']) => {
    if (filteredAudits.length === 0) return 0
    return Math.round(
      filteredAudits.reduce((sum, audit) => sum + audit.report.scores[key], 0) / filteredAudits.length
    )
  }

  const userAverages = {
    overall: calculateAverage('overall'),
    ux: calculateAverage('ux'),
    messaging: calculateAverage('messaging'),
    trust: calculateAverage('trust'),
    speed: calculateAverage('speed'),
  }

  // Industry benchmarks (mock data)
  const industryBenchmarks = {
    overall: 65,
    ux: 60,
    messaging: 70,
    trust: 65,
    speed: 75,
  }

  // Prepare comparative data
  const comparativeData = [
    { category: 'UX', user: userAverages.ux, industry: industryBenchmarks.ux },
    { category: 'Messaging', user: userAverages.messaging, industry: industryBenchmarks.messaging },
    { category: 'Trust', user: userAverages.trust, industry: industryBenchmarks.trust },
    { category: 'Speed', user: userAverages.speed, industry: industryBenchmarks.speed },
  ]

  // Prepare performance breakdown data
  const performanceData = [
    { name: 'UX', value: userAverages.ux, color: '#3b82f6' },
    { name: 'Messaging', value: userAverages.messaging, color: '#10b981' },
    { name: 'Trust', value: userAverages.trust, color: '#8b5cf6' },
    { name: 'Speed', value: userAverages.speed, color: '#ef4444' },
  ]

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-border border-t-brand rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
            <p className="text-muted-foreground">Track your optimization progress and performance</p>
          </div>
          <div className="flex gap-2">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <Button
                key={range}
                variant={dateRange === range ? 'default' : 'outline'}
                onClick={() => setDateRange(range)}
                className={dateRange === range ? 'bg-brand hover:bg-brand' : ''}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
              </Button>
            ))}
          </div>
        </div>

        {filteredAudits.length === 0 ? (
          <Card className="border-2 border-dashed border-border">
            <CardContent className="p-12 text-center">
              <p className="text-xl font-semibold text-foreground mb-2">No Data Available</p>
              <p className="text-muted-foreground mb-6">Run some audits to see your analytics here.</p>
              <Button className="bg-brand hover:bg-brand">Run Your First Audit</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Trend Analysis */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="overall"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Overall"
                    />
                    <Line
                      type="monotone"
                      dataKey="ux"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="UX"
                    />
                    <Line
                      type="monotone"
                      dataKey="messaging"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      name="Messaging"
                    />
                    <Line
                      type="monotone"
                      dataKey="trust"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      name="Trust"
                    />
                    <Line
                      type="monotone"
                      dataKey="speed"
                      stroke="#ef4444"
                      strokeWidth={2}
                      name="Speed"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Comparative Analysis */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Comparative Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={comparativeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="user" fill="#3b82f6" name="Your Score" />
                      <Bar dataKey="industry" fill="#94a3b8" name="Industry Average" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Performance Breakdown */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Performance Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={performanceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {performanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Summary Stats */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Summary Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-background rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Overall</p>
                    <p className="text-2xl font-bold text-foreground">{userAverages.overall}%</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">UX</p>
                    <p className="text-2xl font-bold text-foreground">{userAverages.ux}%</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Messaging</p>
                    <p className="text-2xl font-bold text-foreground">{userAverages.messaging}%</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Trust</p>
                    <p className="text-2xl font-bold text-foreground">{userAverages.trust}%</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Speed</p>
                    <p className="text-2xl font-bold text-foreground">{userAverages.speed}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
