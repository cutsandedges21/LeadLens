'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { AuditCard } from '@/components/dashboard/AuditCard'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

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
    criticalIssues: Array<{
      problem: string
      impact: string
      fix: string
    }>
    lostOpportunities: Array<{
      missingElement: string
      revenueImpact: string
    }>
    actionableImprovements: string[]
  }
  created_at: string
  updated_at: string
  status: 'completed' | 'in_progress' | 'failed'
}

export default function AuditsPage() {
  const { user } = useAuth()
  const [audits, setAudits] = useState<Audit[]>([])
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null)
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
        if (data && data.length > 0) {
          setSelectedAudit(data[0])
        }
      } catch (error) {
        console.error('Error fetching audits:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAudits()
  }, [user])

  // Prepare chart data
  const chartData = audits
    .map((audit) => ({
      date: new Date(audit.created_at).toLocaleDateString(),
      overall: audit.report.scores.overall,
      ux: audit.report.scores.ux,
      messaging: audit.report.scores.messaging,
      trust: audit.report.scores.trust,
      speed: audit.report.scores.speed,
      platform: audit.platform_type,
    }))
    .reverse()

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'website':
        return '#3b82f6'
      case 'instagram':
        return '#ec4899'
      case 'youtube':
        return '#ef4444'
      default:
        return '#64748b'
    }
  }

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
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Audits</h1>
          <p className="text-muted-foreground">View your audit history and detailed analysis</p>
        </div>

        {audits.length === 0 ? (
          <Card className="border-2 border-dashed border-border">
            <CardContent className="p-12 text-center">
              <p className="text-xl font-semibold text-foreground mb-2">No Audits Yet</p>
              <p className="text-muted-foreground mb-6">Start by running your first audit to see insights here.</p>
              <Button className="bg-brand hover:bg-brand">Run Your First Audit</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2/3 - Growth Potential Graph */}
            <div className="lg:col-span-2">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Growth Potential Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
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
                        name="Overall Score"
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

              {/* Detailed Analysis */}
              {selectedAudit && (
                <Card className="border-border mt-6">
                  <CardHeader>
                    <CardTitle>Detailed Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Critical Issues</h3>
                      <div className="space-y-3">
                        {selectedAudit.report.criticalIssues.map((issue, i) => (
                          <div key={i} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <h4 className="font-medium text-red-900 mb-2">{issue.problem}</h4>
                            <p className="text-sm text-red-700 mb-2">
                              <strong>Impact:</strong> {issue.impact}
                            </p>
                            <p className="text-sm text-red-700">
                              <strong>Fix:</strong> {issue.fix}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Lost Opportunities</h3>
                      <div className="space-y-3">
                        {selectedAudit.report.lostOpportunities.map((opp, i) => (
                          <div key={i} className="p-4 bg-secondary border border-border rounded-lg">
                            <h4 className="font-medium text-foreground mb-2">{opp.missingElement}</h4>
                            <p className="text-sm text-muted-foreground">{opp.revenueImpact}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Actionable Improvements</h3>
                      <ul className="space-y-2">
                        {selectedAudit.report.actionableImprovements.map((improvement, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span className="text-sm text-foreground">{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right 1/3 - Audit Cards Grid */}
            <div className="lg:col-span-1">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Audit History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {audits.map((audit) => (
                      <div
                        key={audit.id}
                        onClick={() => setSelectedAudit(audit)}
                        className={`cursor-pointer transition-all ${
                          selectedAudit?.id === audit.id
                            ? 'ring-2 ring-brand'
                            : 'hover:shadow-md'
                        }`}
                      >
                        <AuditCard audit={audit} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
