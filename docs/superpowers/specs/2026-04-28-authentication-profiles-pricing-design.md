# Authentication System with User Profiles and Pricing Plans

**Date:** 2026-04-28  
**Status:** Design Approved  
**Scope:** Add authentication, user profiles, and pricing plan management to LeadLens

## Overview

Implement a client-side authentication system that protects key call-to-action buttons, creates user profiles with pricing plans, and provides a personalized navigation experience. Users are redirected to create an account when clicking protected buttons, then see their profile name and current pricing plan in the navigation bar.

## Requirements

### Functional Requirements
- All main CTA buttons (except "Initiate Audit") require authentication
- User profiles created with default "free" pricing plan upon sign-up
- Navigation shows profile name when authenticated, "Sign Up" and "Contact Sales" when not
- Hover over profile name displays current pricing plan (Free/Starter/Pro/Enterprise)
- Click on profile name shows dropdown menu with actions
- Post-authentication redirects to dashboard/welcome page
- Pricing plan stored in Supabase user metadata

### Non-Functional Requirements
- Seamless user experience with minimal friction
- Graceful error handling and fallbacks
- Consistent with existing UI/UX patterns
- Leverage existing Supabase authentication setup

## Architecture

### System Components

**AuthContext** (`src/contexts/AuthContext.tsx`)
- Global authentication state management
- Provides `useAuth()` hook for component access
- Manages user session, profile data, and pricing plan
- Listens to Supabase auth state changes
- Exposes authentication methods: `signIn()`, `signUp()`, `signOut()`

**ProtectedButton** (`src/components/ProtectedButton.tsx`)
- Wrapper component for existing buttons
- Checks authentication status before allowing actions
- Redirects to `/auth?returnUrl=/dashboard` if not authenticated
- Passes through all standard button props

**ProfileDisplay** (`src/components/ProfileDisplay.tsx`)
- Navigation component for user profile display
- Shows user's full name when authenticated
- Hover tooltip displays current pricing plan
- Click reveals dropdown menu with actions
- Fallback to "Sign Up" and "Contact Sales" when not authenticated

**WelcomeDashboard** (`src/app/dashboard/page.tsx`)
- New page for post-authentication landing
- Displays user's current plan and available features
- Provides upgrade options and quick links
- Serves as default redirect after authentication

### Data Flow

**Authentication Flow:**
1. User clicks protected button → `ProtectedButton` checks `useAuth().user`
2. If no user → Redirect to `/auth?returnUrl=/dashboard`
3. User submits sign-up form → `AuthContext.signUp()` called
4. Supabase creates user with metadata: `{ full_name, company, role, pricing_plan: 'free' }`
5. AuthContext updates state with new user data
6. Redirect to `/dashboard`

**Profile Display Flow:**
1. Navigation renders `ProfileDisplay` component
2. Component accesses `useAuth()` hook
3. If authenticated: Shows `user.user_metadata.full_name` with hover showing `user.user_metadata.pricing_plan`
4. If not authenticated: Shows "Sign Up" and "Contact Sales" buttons

**Plan Upgrade Flow:**
1. User clicks "Upgrade Plan" in dropdown
2. Navigate to `/pricing` page
3. User selects plan → Update `user_metadata.pricing_plan` via Supabase
4. AuthContext automatically updates via auth listener
5. Profile display reflects new plan on next hover

## Component Specifications

### AuthContext

**State:**
- `user: User | null` - Current authenticated user
- `profile: Profile | null` - User profile data
- `loading: boolean` - Auth state loading status
- `error: string | null` - Current error message

**Methods:**
- `signIn(email: string, password: string): Promise<void>` - Authenticate user
- `signUp(email: string, password: string, metadata: object): Promise<void>` - Create new user
- `signOut(): Promise<void>` - Sign out current user

**Integration:**
- Wraps Supabase auth client
- Listens to `authStateChange` events
- Stores pricing plan in `user.user_metadata.pricing_plan`

### ProtectedButton

**Props:**
- `children: ReactNode` - Button content
- `redirectTo?: string` - Optional redirect path (defaults to `/dashboard`)
- `className?: string` - Additional CSS classes
- All standard HTML button attributes

**Behavior:**
- On click: Check if user is authenticated
- If authenticated: Execute original button action
- If not authenticated: Redirect to `/auth?returnUrl={redirectTo}`

**Usage Example:**
```tsx
<ProtectedButton redirectTo="/pricing">
  <Button>Start Free Trial</Button>
</ProtectedButton>
```

### ProfileDisplay

**States:**
- **Authenticated:** Shows user's full name with hover tooltip
- **Not Authenticated:** Shows "Sign Up" and "Contact Sales" buttons

**Dropdown Menu Items:**
- View Profile
- Settings  
- Upgrade Plan
- Sign Out

**Hover Behavior:**
- Displays tooltip: "Current Plan: {plan_name}"
- Plan names: Free, Starter, Pro, Enterprise

### WelcomeDashboard

**Content:**
- Welcome message with user's name
- Current pricing plan display
- Available features based on plan
- Upgrade options
- Quick links to main features

## Database Schema

### Supabase User Metadata

User profiles will be stored in Supabase's `auth.users` table metadata:

```typescript
interface UserMetadata {
  full_name: string;
  company: string;
  role: string;
  pricing_plan: 'free' | 'starter' | 'pro' | 'enterprise';
}
```

**Default Values:**
- `pricing_plan`: `'free'`
- Other fields from sign-up form

## Error Handling

### Authentication Errors
- **Invalid credentials:** Show error message in auth form
- **Email already exists:** Suggest sign in instead
- **Weak password:** Show inline validation (min 6 characters)
- **Network errors:** Display user-friendly message with retry option

### Protected Button Errors
- **Auth check fails:** Silently redirect to auth page
- **Redirect URL construction fails:** Default to `/dashboard`
- **Session expires:** Redirect to auth page with "session expired" message

### Profile Display Errors
- **Missing user metadata:** Fallback to email address
- **Plan not found:** Default to "free" plan display
- **Dropdown errors:** Close dropdown and show error toast

### Database Errors
- **Plan update fails:** Show error message, keep current plan
- **User creation fails:** Rollback auth, show specific error
- **Metadata sync issues:** Retry automatically, fallback to local state

All errors logged to console for debugging while showing user-friendly messages.

## Implementation Notes

### Files to Create
- `src/contexts/AuthContext.tsx` - Authentication context and hook
- `src/components/ProtectedButton.tsx` - Protected button wrapper
- `src/components/ProfileDisplay.tsx` - Profile display component
- `src/app/dashboard/page.tsx` - Welcome dashboard page

### Files to Modify
- `src/components/Navigation.tsx` - Replace auth buttons with ProfileDisplay
- `src/components/CTASection.tsx` - Wrap buttons with ProtectedButton
- `src/app/auth/page.tsx` - Update to handle pricing plan metadata
- `src/app/pricing/page.tsx` - Add plan upgrade functionality

### Protected Buttons List
The following buttons should be wrapped with `ProtectedButton`:
- CTASection: "Start Your Free Audit", "Schedule a Demo"
- Pricing page: All tier CTA buttons
- Other main CTAs across the site

**Exception:** HeroSection "Initiate Audit" button remains unprotected

## Testing Considerations

### Unit Tests
- AuthContext state management
- ProtectedButton auth checking logic
- ProfileDisplay rendering states
- Error handling scenarios

### Integration Tests
- Complete authentication flow
- Protected button redirect behavior
- Profile display updates after auth changes
- Plan upgrade flow

### Manual Testing
- Sign up flow creates profile with default plan
- Protected buttons redirect unauthenticated users
- Profile display shows correct information
- Hover and click behaviors work as expected
- Dashboard displays after successful authentication

## Future Enhancements

### Potential Improvements
- Server-side auth validation for critical actions
- Plan-based feature access control
- Usage tracking and plan limits
- Admin panel for user management
- Email verification flow
- Password reset functionality

### Scalability Considerations
- Cache auth state to reduce Supabase calls
- Implement rate limiting for auth attempts
- Add analytics for conversion tracking
- Support for social authentication providers

## Success Criteria

- [ ] Users can create accounts with profile information
- [ ] Protected buttons redirect unauthenticated users
- [ ] Profile name displays in navigation when authenticated
- [ ] Hover shows current pricing plan
- [ ] Dropdown menu provides expected actions
- [ ] Default "free" plan assigned on sign-up
- [ ] Dashboard displays after authentication
- [ ] Error handling works gracefully
- [ ] Existing "Initiate Audit" button remains unprotected
- [ ] UI/UX consistent with existing design

## Dependencies

### Existing
- `@supabase/supabase-js` - Supabase client
- `next/navigation` - Next.js routing
- `react` - React framework
- `framer-motion` - Animation library
- `lucide-react` - Icon library

### No New Dependencies Required
This implementation leverages existing dependencies and requires no additional packages.