# Supabase Integration Design

> **Date:** 2026-04-28
> **Status:** Approved
> **Approach:** Supabase Auth + Custom Profile Table

## Overview

Integrate Supabase authentication and database into the LeadLens project to enable user sign up, sign in, and profile management. This integration will provide a foundation for storing analysis results in future phases.

## Architecture

**Approach:** Supabase Auth + Custom Profile Table

Use Supabase's built-in authentication for secure auth handling with a separate `profiles` table for extended profile data. This provides clean separation of concerns, follows Supabase best practices, and is easily extensible for future features like analysis results storage.

**Components:**
- Database schema with `profiles` table
- Supabase client configuration
- Auth API routes (sign up, sign in, password reset)
- Updated auth page with extended form fields
- Protected route middleware
- User profile management

**Data Flow:**
1. User submits sign-up form with email, password, full_name, company, role
2. Client calls API route → creates Supabase auth user
3. Database trigger creates profile record with extended data
4. User receives auth session and can access protected routes
5. Profile data accessible throughout the app

## Database Schema

### Profiles Table

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  company TEXT,
  role TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_company ON profiles(company);

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, company, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'company',
    NEW.raw_user_meta_data->>'role'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

**Schema Notes:**
- `id` references Supabase auth user ID
- `email` indexed for fast lookups
- `company` indexed for future analytics
- Trigger automatically creates profile on signup
- `updated_at` can be updated via trigger on profile updates

## API Routes

### `/api/auth/signup` - POST

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "full_name": "John Doe",
  "company": "Acme Corp",
  "role": "Developer"
}
```

**Response (Success):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "session": {
    "access_token": "jwt-token",
    "expires_at": 1234567890
  }
}
```

**Response (Error):**
```json
{
  "error": "Email already registered",
  "code": "USER_EXISTS"
}
```

**Error Handling:**
- Duplicate email → "Email already registered"
- Weak password → "Password must be at least 8 characters"
- Missing fields → "All fields are required"
- Network error → "Connection failed, please try again"

### `/api/auth/signin` - POST

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (Success):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "session": {
    "access_token": "jwt-token",
    "expires_at": 1234567890
  }
}
```

**Response (Error):**
```json
{
  "error": "Invalid credentials",
  "code": "INVALID_CREDENTIALS"
}
```

**Error Handling:**
- Invalid credentials → "Invalid email or password"
- User not found → "Invalid email or password" (same message for security)
- Network error → "Connection failed, please try again"

### `/api/auth/signout` - POST

**Request:**
```json
{}
```

**Response (Success):**
```json
{
  "message": "Signed out successfully"
}
```

**Response (Error):**
```json
{
  "error": "No active session",
  "code": "NO_SESSION"
}
```

**Error Handling:**
- No active session → "No active session"
- Network error → "Connection failed, please try again"

### `/api/auth/reset-password` - POST

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (Success):**
```json
{
  "message": "Password reset email sent"
}
```

**Response (Error):**
```json
{
  "error": "Too many requests",
  "code": "RATE_LIMITED"
}
```

**Error Handling:**
- Rate limited → "Too many requests, please try again later"
- Service error → "Failed to send reset email"
- Always returns success message even if email doesn't exist (security)

### `/api/auth/update-password` - POST

**Request:**
```json
{
  "new_password": "newSecurePassword123",
  "token": "reset-token-from-email"
}
```

**Response (Success):**
```json
{
  "message": "Password updated successfully"
}
```

**Response (Error):**
```json
{
  "error": "Invalid or expired token",
  "code": "INVALID_TOKEN"
}
```

**Error Handling:**
- Invalid token → "Invalid or expired reset link"
- Expired token → "Invalid or expired reset link"
- Weak password → "Password must be at least 8 characters"

### `/api/auth/profile` - GET/PUT

**GET Request:**
```json
{}
```

**GET Response (Success):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "full_name": "John Doe",
  "company": "Acme Corp",
  "role": "Developer",
  "created_at": "2026-04-28T10:00:00Z",
  "updated_at": "2026-04-28T10:00:00Z"
}
```

**PUT Request:**
```json
{
  "full_name": "John Updated",
  "company": "New Company",
  "role": "Senior Developer"
}
```

**PUT Response (Success):**
```json
{
  "message": "Profile updated successfully",
  "profile": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Updated",
    "company": "New Company",
    "role": "Senior Developer",
    "updated_at": "2026-04-28T11:00:00Z"
  }
}
```

**Response (Error):**
```json
{
  "error": "Not authenticated",
  "code": "UNAUTHORIZED"
}
```

**Error Handling:**
- Not authenticated → "Please sign in to access your profile"
- Validation error → "Invalid profile data"
- Network error → "Connection failed, please try again"

## Client-Side Components

### Updated Auth Page (`/auth`)

**Features:**
- Tabbed interface: Sign Up / Sign In
- Sign Up form: email, password, confirm_password, full_name, company, role
- Sign In form: email, password
- Password reset link and modal
- Form validation on client side
- Loading states and error display
- Redirect to dashboard on success

**Validation Rules:**
- Email: valid email format
- Password: minimum 8 characters
- Confirm password: must match password
- Full name: required, minimum 2 characters
- Company: optional
- Role: optional

**UI States:**
- Idle: Form ready for input
- Loading: Spinner during API call
- Success: Success message + redirect
- Error: Error message displayed

### Protected Route Middleware

**Functionality:**
- Check for valid Supabase session
- Redirect unauthenticated users to `/auth`
- Allow access to public routes
- Handle session refresh
- Protect API routes that require authentication

**Protected Routes:**
- `/dashboard` (future)
- `/profile` (future)
- Any route requiring user data

**Public Routes:**
- `/` (home)
- `/auth` (sign in/up)
- `/pricing` (pricing page)
- `/platform` (platform page)
- `/contact` (contact page)

### Auth Context/Hook

**Provided Values:**
```typescript
{
  user: User | null,
  session: Session | null,
  loading: boolean,
  signIn: (email, password) => Promise<void>,
  signUp: (email, password, metadata) => Promise<void>,
  signOut: () => Promise<void>,
  resetPassword: (email) => Promise<void>,
  updatePassword: (newPassword, token) => Promise<void>
}
```

**Features:**
- Provide auth state throughout app
- Handle session persistence in localStorage
- Auto-refresh sessions before expiration
- Listen for auth state changes
- Handle session errors gracefully

### Profile Management Component

**Features:**
- Display current profile data
- Edit form for full_name, company, role
- Save changes to database
- Success/error feedback
- Loading states during save

**UI Structure:**
- Profile header with email
- Form fields for editable data
- Save/Cancel buttons
- Success/error messages

## Error Handling Strategy

### Validation Layers

1. **Client-side validation** - Immediate feedback on form fields
2. **Server-side validation** - Security check before database operations
3. **Supabase validation** - Built-in auth constraints
4. **Database constraints** - Final data integrity check

### Error Types

**Auth Errors:**
- Invalid credentials
- Weak password
- Duplicate email
- Invalid/expired token
- No active session

**Validation Errors:**
- Missing required fields
- Invalid email format
- Password mismatch
- Invalid data types

**Network Errors:**
- Timeout
- Connection failed
- Service unavailable

**Database Errors:**
- Constraint violations
- Service unavailable
- Query errors

### User-Friendly Messages

**Mapping Strategy:**
- Map technical errors to clear, actionable messages
- Don't reveal sensitive information (e.g., "email already exists" vs "user not found")
- Provide next steps for recovery
- Consistent error UI across all auth flows

**Example Mappings:**
- `auth/user-not-found` → "Invalid email or password"
- `auth/invalid-credentials` → "Invalid email or password"
- `auth/email-already-in-use` → "Email already registered"
- `auth/weak-password` → "Password must be at least 8 characters"
- `auth/invalid-token` → "Invalid or expired reset link"

### Logging

**Server-side Logging:**
- Log errors with context (without sensitive data)
- Include user ID when available
- Track error patterns for monitoring
- Log API response times

**Client-side Logging:**
- Log auth state changes
- Track user actions for analytics
- Log errors for debugging

## Security Considerations

**Password Security:**
- Minimum 8 characters
- Stored securely by Supabase (hashed)
- Never logged or exposed in error messages

**Session Security:**
- JWT tokens with expiration
- Secure token storage (httpOnly cookies recommended)
- Auto-refresh before expiration
- Invalidate on sign out

**API Security:**
- Validate all inputs
- Rate limit password reset requests
- Protect sensitive routes with authentication
- Never expose sensitive data in error messages

**Database Security:**
- Row-level security (RLS) policies
- Proper foreign key constraints
- Cascade deletes for data integrity
- Regular backups

## Future Extensions

**Phase 2 - Analysis Results:**
- Add `analyses` table linked to profiles
- Store audit reports, scores, recommendations
- Query user's analysis history
- Export analysis data

**Phase 3 - Usage Analytics:**
- Add `usage_logs` table
- Track audit frequency
- Monitor feature usage
- Generate usage reports

**Phase 4 - Billing Integration:**
- Add `subscriptions` table
- Track plan tiers and usage limits
- Integrate with payment provider
- Manage subscription lifecycle

## Testing Strategy

**Unit Tests:**
- API route handlers
- Validation functions
- Error mapping logic
- Auth context hooks

**Integration Tests:**
- Complete auth flows (sign up, sign in, sign out)
- Password reset flow
- Profile update flow
- Protected route access

**E2E Tests:**
- User journey from sign up to dashboard
- Password reset end-to-end
- Profile management
- Session persistence

## Success Criteria

- Users can sign up with email, password, and profile data
- Users can sign in with valid credentials
- Users can reset their password via email
- Users can update their profile information
- Protected routes require authentication
- Sessions persist across page refreshes
- Error messages are clear and actionable
- All validation layers work correctly
- Database schema is properly set up
- API routes handle all error cases

## Dependencies

**Required:**
- `@supabase/supabase-js` - Supabase client
- `@supabase/auth-helpers-nextjs` - Next.js auth helpers

**Environment Variables:**
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

## Implementation Notes

**Supabase Setup:**
- Create Supabase project
- Enable email authentication
- Configure email templates (sign up, password reset)
- Set up database schema
- Configure RLS policies

**Next.js Configuration:**
- Update environment variables
- Configure middleware for protected routes
- Set up API routes
- Update auth page component
- Create auth context

**Testing:**
- Test all auth flows locally
- Test with Supabase development environment
- Verify error handling
- Test session persistence
- Test protected routes
