'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { User, Mail, Building, Bell, Palette, Key, Link2, Trash2, CheckCircle2, AlertCircle, Save } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function SettingsPage() {
  const { user, signOut } = useAuth()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [profile, setProfile] = useState({
    full_name: '',
    company: '',
    role: '',
  })
  const [preferences, setPreferences] = useState({
    notifications: true,
    email_marketing: false,
  })

  useEffect(() => {
    if (user) {
      setProfile({
        full_name: user.user_metadata?.full_name || '',
        company: user.user_metadata?.company || '',
        role: user.user_metadata?.role || '',
      })
      setPreferences({
        notifications: user.user_metadata?.notifications ?? true,
        email_marketing: user.user_metadata?.email_marketing ?? false,
      })
    }
  }, [user])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: profile.full_name,
          company: profile.company,
          role: profile.role,
          notifications: preferences.notifications,
          email_marketing: preferences.email_marketing,
        },
      })

      if (error) throw error

      setStatus({ type: 'success', message: 'Your settings have been updated successfully.' })
      
      // Clear message after 3 seconds
      setTimeout(() => setStatus(null), 3000)
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'An error occurred while updating your settings.' })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.')) {
      return
    }

    setLoading(true)
    try {
      // Delete user's analyses
      const { error: analysesError } = await supabase
        .from('analyses')
        .delete()
        .eq('user_id', user?.id)

      if (analysesError) throw analysesError

      // Delete user's profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', user?.id)

      if (profileError) throw profileError

      // Sign out
      await signOut()

      // Redirect to home
      window.location.href = '/'
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'Failed to delete account' })
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="flex flex-col gap-2">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl font-black tracking-tight text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"
          >
            Account Settings
          </motion.h1>
          <motion.p variants={itemVariants} className="text-slate-500 text-lg">
            Manage your personal information, preferences, and account security.
          </motion.p>
        </div>

        <AnimatePresence>
          {status && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className={`p-4 rounded-xl flex items-center gap-3 border ${
                status.type === 'success' 
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                  : 'bg-rose-50 border-rose-100 text-rose-800'
              }`}
            >
              {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span className="font-medium">{status.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 gap-8">
          {/* Profile Section */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm group hover:shadow-md transition-all duration-300">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="w-5 h-5 text-blue-600" />
                  Personal Information
                </CardTitle>
                <CardDescription>Update your profile details and how others see you.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-semibold text-slate-700">Full Name</Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={profile.full_name}
                        onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                        placeholder="John Doe"
                        className="bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address</Label>
                      <div className="relative">
                        <Input id="email" type="email" value={user?.email || ''} disabled className="bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed pl-10" />
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                      <p className="text-[10px] text-slate-400">Email cannot be changed directly. Contact support for assistance.</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-semibold text-slate-700">Company / Organization</Label>
                      <div className="relative">
                        <Input
                          id="company"
                          type="text"
                          value={profile.company}
                          onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                          placeholder="Acme Inc."
                          className="bg-white/50 border-slate-200 pl-10"
                        />
                        <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-sm font-semibold text-slate-700">Professional Role</Label>
                      <Input
                        id="role"
                        type="text"
                        value={profile.role}
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                        placeholder="Marketing Manager"
                        className="bg-white/50 border-slate-200"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-4 border-t border-slate-100">
                    <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-8 shadow-lg shadow-blue-200/50 transition-all group">
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Saving...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span>Save Changes</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preferences Section */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm group hover:shadow-md transition-all duration-300">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Bell className="w-5 h-5 text-orange-500" />
                  Preferences
                </CardTitle>
                <CardDescription>Control your notification and marketing settings.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white hover:border-blue-100 hover:bg-blue-50/20 transition-all">
                    <div>
                      <p className="font-bold text-slate-900">Email Notifications</p>
                      <p className="text-sm text-slate-500">Get alerts about audit completions and reports.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={preferences.notifications}
                        onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white hover:border-blue-100 hover:bg-blue-50/20 transition-all">
                    <div>
                      <p className="font-bold text-slate-900">Marketing & Updates</p>
                      <p className="text-sm text-slate-500">Receive tips, product updates, and special offers.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={preferences.email_marketing}
                        onChange={(e) => setPreferences({ ...preferences, email_marketing: e.target.checked })}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <Button onClick={handleUpdateProfile} disabled={loading} className="bg-slate-900 hover:bg-slate-800 text-white">
                    Update Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Appearance & Security */}
            <motion.div variants={itemVariants} className="space-y-8">
              <Card className="border-slate-200/60 shadow-sm bg-white/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Palette className="w-4 h-4 text-purple-500" />
                    Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
                    {['Light', 'Dark', 'System'].map((t) => (
                      <Button key={t} variant="ghost" className="flex-1 text-xs font-bold py-1 h-8 hover:bg-white hover:shadow-sm transition-all">
                        {t}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200/60 shadow-sm bg-white/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Key className="w-4 h-4 text-amber-500" />
                    API Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full text-xs font-bold border-dashed border-2 hover:bg-slate-50 transition-all">
                    Generate New API Key
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Integrations & Danger */}
            <motion.div variants={itemVariants} className="space-y-8">
              <Card className="border-slate-200/60 shadow-sm bg-white/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Link2 className="w-4 h-4 text-emerald-500" />
                    Integrations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {['Google Analytics', 'Slack'].map((service) => (
                    <div key={service} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg group">
                      <span className="text-sm font-medium">{service}</span>
                      <Button variant="ghost" size="sm" className="h-7 text-[10px] font-black uppercase tracking-wider text-blue-600 hover:bg-blue-50">
                        Connect
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-rose-100 bg-rose-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-rose-700">
                    <Trash2 className="w-4 h-4" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-rose-600/80 mb-4 leading-relaxed">
                    Once deleted, your account cannot be recovered. All audit data and history will be lost.
                  </p>
                  <Button 
                    variant="destructive" 
                    onClick={handleDeleteAccount}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-xs font-bold shadow-lg shadow-rose-200/50"
                  >
                    Permanently Delete Account
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
