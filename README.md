# LeadLens - AI-Powered Digital Presence Auditor

A production-ready MVP for analyzing digital presence (websites, Instagram, YouTube) and generating high-value, conversion-focused audit reports designed to capture leads and drive business growth.

## 🎯 Core Philosophy

- **Every insight ties to BUSINESS IMPACT** - money, growth, conversions
- **Every problem includes a specific fix** - actionable, implementable solutions
- **Expert consulting feel** - not generic AI fluff
- **High-conversion focus** - designed to capture leads before revealing full results

## 🚀 Features

### Multi-Platform Analysis
- **Website Analysis** (Primary Focus)
  - UX/Design evaluation
  - Messaging & positioning assessment
  - Trust signals detection
  - Performance analysis

- **Instagram Profile Analysis**
  - Engagement rate calculation
  - Content quality assessment
  - Growth potential evaluation
  - Bio and post optimization

- **YouTube Channel Analysis**
  - Subscriber and view metrics
  - Content performance analysis
  - Engagement optimization
  - Growth strategy recommendations

### Lead Generation System
- **Gated Results** - Full report revealed only after email capture
- **High-Value Insights** - Persuasive, actionable recommendations
- **Conversion-Focused** - Designed to turn visitors into leads

### AI-Powered Analysis
- **Claude 3.5 Sonnet** integration for intelligent analysis
- **Business-focused heuristics** - Revenue and conversion impact
- **Specific, actionable fixes** - No generic advice
- **Quantified impact** - Estimated revenue loss and gain

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icon set
- **shadcn/ui** - High-quality UI components

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Playwright** - Web scraping and automation
- **Cheerio** - HTML parsing and manipulation
- **Anthropic SDK** - AI analysis integration

### Data & Storage
- **In-memory storage** (MVP) - Map/Set based storage
- **Supabase ready** - Easy upgrade to production database

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd leadlens
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Configure your API keys**
   Edit `.env` and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Anthropic API Key (Required for AI analysis)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Supabase Configuration (Optional - for production database)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Getting an Anthropic API Key

1. Visit [console.anthropic.com](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste it into your `.env` file

## 🎨 Usage

### Analyzing a Website

1. Enter a website URL (e.g., `https://example.com`)
2. Click "Audit Now"
3. Wait for the analysis to complete
4. Enter your email to unlock the full report
5. Review the detailed insights and recommendations

### Analyzing Instagram

1. Enter an Instagram profile URL (e.g., `https://instagram.com/username`)
2. The system automatically detects it's Instagram
3. Review engagement metrics and content analysis
4. Get specific recommendations for Instagram growth

### Analyzing YouTube

1. Enter a YouTube channel URL (e.g., `https://youtube.com/@channelname`)
2. The system automatically detects it's YouTube
3. Review subscriber, view, and engagement metrics
4. Get actionable recommendations for channel growth

## 📊 Report Structure

Each analysis report includes:

### Scores (0-100)
- **Overall Conversion Score** - Composite score
- **Category Scores** - UX, Messaging, Trust, Speed (or platform-specific)

### Critical Issues
- **Problem** - What's wrong
- **Business Impact** - How it's costing you money
- **How to Fix It** - Specific, actionable solution

### Lost Opportunities
- **Missing Element** - What you're not doing
- **Revenue Impact** - How much you're losing

### Actionable Improvements
- 10+ specific, implementable recommendations
- Prioritized by impact and effort
- Clear, step-by-step guidance

## 🧪 Testing

### Manual Testing

1. **Test Website Analysis**
   ```bash
   # Start the dev server
   npm run dev

   # Test with a real website
   # Enter: https://example.com
   ```

2. **Test Instagram Analysis**
   ```bash
   # Test with Instagram profile
   # Enter: https://instagram.com/nationalgeographic
   ```

3. **Test YouTube Analysis**
   ```bash
   # Test with YouTube channel
   # Enter: https://youtube.com/@TED
   ```

### Without API Key

The system includes dummy data for testing without an API key:
- Website analysis returns sample report
- Instagram/YouTube analysis returns platform-specific insights

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Add environment variables**
   - Go to Vercel dashboard
   - Add `ANTHROPIC_API_KEY` to environment variables

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Digital Ocean App Platform

## 🔐 Security Considerations

### Current Implementation (MVP)
- In-memory storage (data lost on restart)
- No authentication
- Basic rate limiting needed

### Production Recommendations
- Implement proper authentication (Supabase Auth)
- Add rate limiting (Vercel Edge Config)
- Use persistent database (Supabase PostgreSQL)
- Add input validation and sanitization
- Implement CORS policies
- Add logging and monitoring

## 📈 Scaling & Production

### Database Migration

Replace in-memory storage with Supabase:

```typescript
// Current (MVP)
import { analysisStore } from '@/lib/store';

// Production
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
```

### Rate Limiting

Add rate limiting to prevent abuse:

```typescript
// middleware.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'),
});
```

### Monitoring

Add error tracking and analytics:

```typescript
// Add Sentry for error tracking
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Anthropic** - Claude AI for analysis
- **Vercel** - Next.js framework
- **Playwright** - Web scraping capabilities
- **shadcn/ui** - Beautiful UI components

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: [your-email@example.com]

---

**Built with ❤️ for businesses that want to stop losing customers and start converting.**