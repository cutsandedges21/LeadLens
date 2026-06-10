'use client'

import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Video, MessageCircle, ExternalLink, ChevronRight } from 'lucide-react'

export default function HelpPage() {
  const faqs = [
    {
      question: 'How do I run my first audit?',
      answer:
        'Simply enter your URL on the homepage and click "Initiate Audit". Our AI agents will analyze your page and provide a comprehensive conversion optimization report.',
    },
    {
      question: 'What platforms does LeadLens support?',
      answer:
        'LeadLens supports websites, Instagram profiles, and YouTube channels. Our platform detection automatically identifies the type of URL you provide.',
    },
    {
      question: 'How are the scores calculated?',
      answer:
        'Our AI agents evaluate multiple factors including UX/UI design, messaging clarity, trust signals, and page speed. Each category is scored 0-100, and an overall score is calculated.',
    },
    {
      question: 'Can I export my audit results?',
      answer:
        'Yes! You can export your audit results as PDF or JSON files from the Audits view. This is useful for sharing with your team or keeping records.',
    },
    {
      question: 'How often should I run audits?',
      answer:
        'We recommend running audits after significant changes to your website or social media profiles. Regular audits help track your optimization progress over time.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Absolutely. We use industry-standard encryption and security practices. Your data is stored securely in Supabase and never shared with third parties.',
    },
  ]

  const guides = [
    {
      title: 'Getting Started with LeadLens',
      description: 'Learn the basics of running your first audit and understanding your results.',
      icon: BookOpen,
    },
    {
      title: 'Website Optimization Guide',
      description: 'Best practices for improving your website conversion rates.',
      icon: BookOpen,
    },
    {
      title: 'Instagram Profile Optimization',
      description: 'Tips for optimizing your Instagram profile for better engagement.',
      icon: BookOpen,
    },
    {
      title: 'YouTube Channel Optimization',
      description: 'Strategies for growing your YouTube audience and improving conversions.',
      icon: BookOpen,
    },
  ]

  const tutorials = [
    {
      title: 'Running Your First Audit',
      duration: '3 min',
    },
    {
      title: 'Understanding Your Scores',
      duration: '5 min',
    },
    {
      title: 'Implementing Recommendations',
      duration: '7 min',
    },
    {
      title: 'Using the Analytics Dashboard',
      duration: '4 min',
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Help Center</h1>
          <p className="text-muted-foreground">Find answers, guides, and support for using LeadLens</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-6 h-6 text-brand" />
                <h3 className="font-semibold">Documentation</h3>
              </div>
              <p className="text-sm text-muted-foreground">Browse our comprehensive guides</p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Video className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold">Video Tutorials</h3>
              </div>
              <p className="text-sm text-muted-foreground">Watch step-by-step tutorials</p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold">Contact Support</h3>
              </div>
              <p className="text-sm text-muted-foreground">Get help from our team</p>
            </CardContent>
          </Card>
        </div>

        {/* Getting Started Guide */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Enter Your URL</h4>
                  <p className="text-sm text-muted-foreground">
                    Start by entering the URL you want to audit on the homepage. We support websites, Instagram
                    profiles, and YouTube channels.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Run the Audit</h4>
                  <p className="text-sm text-muted-foreground">
                    Click "Initiate Audit" and our AI agents will analyze your page. This typically takes 30-60 seconds.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Review Your Results</h4>
                  <p className="text-sm text-muted-foreground">
                    Sign up or log in to view your comprehensive report with scores, critical issues, and actionable
                    recommendations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Track Your Progress</h4>
                  <p className="text-sm text-muted-foreground">
                    Use the dashboard to track your audit history, view analytics, and monitor your optimization progress
                    over time.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Guides */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Feature Guides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guides.map((guide, index) => {
                const Icon = guide.icon
                return (
                  <div
                    key={index}
                    className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-5 h-5 text-brand" />
                      <h4 className="font-semibold">{guide.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{guide.description}</p>
                    <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto mt-2" />
                  </div>
              )
            })}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <h4 className="font-semibold mb-2">{faq.question}</h4>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Video Tutorials */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Video Tutorials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tutorials.map((tutorial, index) => (
                <div
                  key={index}
                  className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Video className="w-5 h-5 text-purple-600" />
                    <h4 className="font-semibold">{tutorial.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{tutorial.duration}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex gap-4">
              <Button className="bg-brand hover:bg-brand">
                <MessageCircle className="w-4 h-4 mr-2" />
                Start a Chat
              </Button>
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Email Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
