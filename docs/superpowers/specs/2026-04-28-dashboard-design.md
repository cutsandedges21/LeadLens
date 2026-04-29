# LeadLens Dashboard Design Specification

**Date:** 2026-04-28
**Status:** Approved
**Version:** 1.0

## Overview

Transform LeadLens from a landing page to a full-featured user dashboard with authenticated access, audit management, and analytics visualization. The dashboard will replace the landing page for logged-in users and provide a Supabase-style interface for managing conversion optimization audits.

## Architecture

### Authentication Flow
1. User authenticates via Supabase Auth (email/password)
2. Session stored in Supabase and browser
3. Middleware checks auth state on protected routes
4. Unauthenticated users redirected to landing page
5. Authenticated users see dashboard instead of landing page

### Data Layer
- **Primary Storage:** Supabase PostgreSQL
- **Key Tables:**
  - `analyses` - Audit results with URLs, platforms, and agent reports
  - `profiles` - User settings and preferences
  - `auth.users` - Supabase auth user data
- **Real-time:** Supabase subscriptions for live updates
- **Fallback:** In-memory store for development/testing

### State Management
- **Auth State:** React Context with Supabase session management
- **UI State:** Local component state for interactions
- **Data State:** React Query or SWR for server state caching

## Component Structure

### Layout Components
```
DashboardLayout/
├── Sidebar.tsx          # Navigation tabs and user profile
├── Header.tsx           # Top bar with user menu
└── ContentArea.tsx      # Main content wrapper
```

### View Components
```
DashboardView.tsx        # Recent audit summary and quick stats
AuditsView.tsx           # Split view: graph + cards + details
AnalyticsView.tsx        # Trend, comparative, performance charts
SettingsView.tsx         # User preferences and account settings
HelpView.tsx             # Documentation and support
```

### Shared Components
```
AuditCard.tsx            # Individual audit display with platform info
ScoreGauge.tsx           # Visual score indicator
GrowthChart.tsx          # Line chart for score trends
PlatformBadge.tsx        # Platform icon and label
LoadingSkeleton.tsx      # Loading state placeholders
ErrorMessage.tsx        # Error display with retry
EmptyState.tsx           # No data states with CTAs
```

## Dashboard Views

### Dashboard View (Default)
**Purpose:** Quick overview of recent audit activity and key metrics

**Components:**
- Hero section with most recent audit summary
- Platform badge and URL prominently displayed
- Key metrics cards:
  - Overall Score (latest audit)
  - Total Audits (count)
  - Average Score (all audits)
  - Improvement Rate (trend)
- Quick action buttons:
  - "Run New Audit" → Navigate to audit flow
  - "View All Audits" → Navigate to Audits view
- Recent activity timeline (last 3-5 audits)

**Data Requirements:**
- Latest audit record with full report
- Aggregate stats (count, averages)
- Recent audit list (5 most recent)

### Audits View
**Purpose:** Comprehensive audit history with detailed analysis

**Layout:** Split view with scrollable details

**Left 2/3 - Growth Potential Graph:**
- Line chart showing score trajectory over time
- X-axis: Audit dates
- Y-axis: Overall scores (0-100)
- Platform-specific lines (different colors)
- Hover tooltips showing audit details
- Zoom and pan capabilities

**Right 1/3 - Audit Cards Grid:**
- Card for each audit with:
  - Platform icon + label (🌐 Website, 📸 Instagram, ▶️ YouTube)
  - Full URL prominently displayed
  - Date and time
  - Overall score with color coding
  - Status indicator (completed, in-progress, failed)
  - Click to view details
- Platform-specific color coding:
  - Website: Blue (#3b82f6)
  - Instagram: Pink (#ec4899)
  - YouTube: Red (#ef4444)
- Scrollable card list

**Below (Scrollable) - Detailed Analysis:**
- Full agent-generated report for each audit
- Platform-specific sections:
  - Critical Issues with impact and fixes
  - Lost Opportunities with revenue impact
  - Actionable Improvements list
  - Detailed recommendations from agents
- Expandable/collapsible sections
- Export functionality (PDF, JSON)

**Data Requirements:**
- All user audits with full reports
- Time-series data for growth chart
- Platform type for each audit
- Agent analysis results

### Analytics View
**Purpose:** Track optimization progress and compare performance

**Components:**

**Trend Analysis:**
- Line graphs showing score improvements over time
- Multiple lines: UX, Messaging, Trust, Speed, Overall
- Date range selector (7d, 30d, 90d, custom)
- Moving averages and trend lines
- Export data as CSV

**Comparative Analysis:**
- Bar charts comparing user scores vs industry benchmarks
- Categories: UX, Messaging, Trust, Speed
- Industry averages by platform type
- Percentile rankings
- Gap analysis with improvement suggestions

**Performance Breakdown:**
- Pie charts showing score distribution across categories
- Radar charts for multi-dimensional analysis
- Score correlation analysis
- Platform performance comparison

**Data Requirements:**
- Historical audit data with scores
- Industry benchmark data
- Time-series aggregations
- Platform-specific metrics

### Settings View
**Purpose:** User preferences and account management

**Components:**
- Profile settings (name, email, company)
- Notification preferences
- Theme selection (light/dark)
- Audit frequency settings
- API key management
- Connected accounts
- Delete account option

### Help View
**Purpose:** Documentation and support

**Components:**
- Getting started guide
- Feature documentation
- FAQ section
- Video tutorials
- Contact support
- Platform-specific guides

## Data Models

### Audit Record
```typescript
interface Audit {
  id: string;
  user_id: string;
  url: string;
  normalized_url: string;
  platform_type: 'website' | 'instagram' | 'youtube';
  report: {
    scores: {
      ux: number;
      messaging: number;
      trust: number;
      speed: number;
      overall: number;
    };
    overallInterpretation: string;
    criticalIssues: Array<{
      problem: string;
      impact: string;
      fix: string;
    }>;
    lostOpportunities: Array<{
      missingElement: string;
      revenueImpact: string;
    }>;
    actionableImprovements: string[];
  };
  created_at: timestamp;
  updated_at: timestamp;
  status: 'completed' | 'in_progress' | 'failed';
}
```

### User Profile
```typescript
interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  company: string;
  role: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    email_marketing: boolean;
  };
  created_at: timestamp;
  updated_at: timestamp;
}
```

## Platform Identification

### Visual Indicators
- **Website:** 🌐 icon + "Website" label + Blue color (#3b82f6)
- **Instagram:** 📸 icon + "Instagram" label + Pink color (#ec4899)
- **YouTube:** ▶️ icon + "YouTube" label + Red color (#ef4444)

### Display Locations
- Audit cards (top-left corner)
- Dashboard summary (next to audit title)
- Analytics charts (legend and tooltips)
- Detailed analysis headers
- Export documents

### URL Handling
- Full URL always displayed
- Truncation for very long URLs (>50 chars) with tooltip
- Clickable URLs that open in new tab
- Platform-specific URL validation

## Error Handling

### Authentication Scenarios
- **Session expired:** Redirect to login with return URL
- **Network errors:** Retry option with clear messaging
- **Invalid credentials:** Specific error messages (email vs password)
- **Email verification:** Prompt to verify email before accessing dashboard

### Data Loading States
- **Initial load:** Skeleton screens for all views
- **Slow queries:** Loading spinners with 30s timeout
- **Empty states:** "No audits yet" with CTA to run first audit
- **Failed loads:** Error cards with retry buttons and specific context

### Audit-Specific Edge Cases
- **Audit in progress:** Progress indicator with estimated completion
- **Failed audit:** Error status with retry option
- **Very long URLs:** Truncate with tooltip showing full URL
- **Mixed platform types:** Consistent card heights and layouts

### Analytics Edge Cases
- **Insufficient data:** "Need more audits for trend analysis" message
- **Missing benchmarks:** Use industry averages with clear labeling
- **Date range with no data:** Empty state with suggestion to expand range

### Network & API Issues
- **Supabase connection failed:** Graceful degradation with cached data
- **Agent API rate limits:** Queue requests with position indicator
- **Browser storage quota:** Clear old data and notify user

## Testing Strategy

### Unit Testing
- Component tests for all UI components
- Utility functions (data formatting, URL processing, platform detection)
- Auth context and state management logic
- Supabase query builders and data transformers

### Integration Testing
- Full auth flow (login → session → dashboard → logout)
- Audit creation and retrieval flow
- Analytics data aggregation and visualization
- Settings updates and persistence

### E2E Testing
- Critical user journeys:
  - Login → view dashboard → run audit → view results
  - Cross-platform audit flows (website, Instagram, YouTube)
  - Analytics exploration and filtering
  - Settings changes and profile updates

### Visual Testing
- Responsive layouts across breakpoints (mobile, tablet, desktop)
- Dark/light theme consistency
- Platform-specific icon and color rendering
- Loading states and error displays

### Performance Testing
- Dashboard load time with 10+ audits (<2s target)
- Analytics rendering with large datasets (<3s target)
- Scroll performance in detailed audit sections (60fps)
- Memory usage during extended sessions (<100MB)

## Mobile Readiness

### Responsive Design
- Collapsible sidebar for mobile
- Touch-optimized interactions
- Simplified layouts for smaller screens
- Platform-specific mobile considerations

### Future Mobile App
- Component structure designed for React Native reuse
- API endpoints optimized for mobile consumption
- Offline-first architecture considerations
- Push notification infrastructure

## Implementation Priority

### Phase 1: Core Dashboard
1. Authentication flow and route protection
2. Dashboard layout with sidebar
3. Dashboard view with recent audit summary
4. Basic audit cards with platform identification

### Phase 2: Audit Management
1. Audits view with split layout
2. Growth potential graph
3. Detailed analysis sections
4. Agent report integration

### Phase 3: Analytics
1. Trend analysis charts
2. Comparative analysis
3. Performance breakdown
4. Export functionality

### Phase 4: Polish
1. Settings and help views
2. Advanced error handling
3. Performance optimization
4. Mobile responsiveness

## Success Criteria

- Users can log in and see dashboard within 2 seconds
- Audit history displays correctly with platform identification
- Analytics provide actionable insights
- Error states are clear and recoverable
- Mobile layouts are functional
- Performance targets met across all views

## Dependencies

### External Services
- Supabase (auth, database, real-time)
- Anthropic API (agent analysis)
- Chart library (Recharts or similar)
- Next.js 16+ (framework)

### Internal Systems
- Existing audit API endpoints
- Agent analysis system
- Platform detection utilities
- Supabase client configuration