import { NextResponse } from 'next/server';
import { scrapeWebsite } from '@/lib/scraper';
import { analyzeWebsite } from '@/lib/agent';
import { analysisStore } from '@/lib/store';
import { randomUUID } from 'crypto';
import { detectPlatform, PlatformType } from '@/lib/platform-detector';
import { scrapeInstagram } from '@/lib/instagram-scraper';
import { scrapeYouTube } from '@/lib/youtube-scraper';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Invalid URL provided' }, { status: 400 });
    }

    // 1. Detect platform type
    const platform = detectPlatform(url);

    if (platform.type === 'unknown') {
      return NextResponse.json({ error: 'Could not identify platform. Please provide a valid website, Instagram, or YouTube URL.' }, { status: 400 });
    }

    // 2. Scrape based on platform type
    let scrapedData: any;
    let report: any;

    switch (platform.type) {
      case 'website':
        scrapedData = await scrapeWebsite(platform.normalizedUrl);
        report = await analyzeWebsite(scrapedData);
        break;

      case 'instagram':
        scrapedData = await scrapeInstagram(platform.normalizedUrl);
        report = await analyzeInstagram(scrapedData);
        break;

      case 'youtube':
        scrapedData = await scrapeYouTube(platform.normalizedUrl);
        report = await analyzeYouTube(scrapedData);
        break;

      default:
        return NextResponse.json({ error: 'Unsupported platform type' }, { status: 400 });
    }

    // 3. Store the result
    const analysisId = randomUUID();
    
    if (supabase) {
      const { error } = await supabase.from('analyses').insert({
        id: analysisId,
        url: platform.normalizedUrl,
        platform: platform.type,
        report
      });
      
      if (error) {
        console.error('Supabase insert error:', error);
        // Fallback
        analysisStore.set(analysisId, {
          url: platform.normalizedUrl,
          platform: platform.type,
          report,
          timestamp: new Date()
        });
      }
    } else {
      analysisStore.set(analysisId, {
        url: platform.normalizedUrl,
        platform: platform.type,
        report,
        timestamp: new Date()
      });
    }

    return NextResponse.json({
      analysisId,
      status: 'success',
      platform: platform.type,
      confidence: platform.confidence
    });
  } catch (error) {
    console.error('Analyze API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * Analyzes Instagram profile for conversion optimization
 */
async function analyzeInstagram(data: any) {
  // For MVP, return a structured report based on Instagram data
  // In production, this would use AI analysis similar to website analysis

  const engagementScore = calculateEngagementScore(data.engagementRate, data.followerCount);
  const contentScore = calculateContentScore(data.recentPosts.length, data.bio);
  const growthScore = calculateGrowthScore(data.followerCount, data.postCount);

  const overall = Math.round((engagementScore * 0.4 + contentScore * 0.3 + growthScore * 0.3));

  return {
    scores: {
      engagement: engagementScore,
      content: contentScore,
      growth: growthScore,
      overall
    },
    overallInterpretation: generateInstagramInterpretation(data, overall),
    criticalIssues: generateInstagramCriticalIssues(data),
    lostOpportunities: generateInstagramLostOpportunities(data),
    actionableImprovements: generateInstagramImprovements(data)
  };
}

/**
 * Analyzes YouTube channel for conversion optimization
 */
async function analyzeYouTube(data: any) {
  const engagementScore = calculateYouTubeEngagementScore(data.engagementRate, data.subscriberCount);
  const contentScore = calculateYouTubeContentScore(data.recentVideos.length, data.description);
  const growthScore = calculateYouTubeGrowthScore(data.subscriberCount, data.viewCount);

  const overall = Math.round((engagementScore * 0.4 + contentScore * 0.3 + growthScore * 0.3));

  return {
    scores: {
      engagement: engagementScore,
      content: contentScore,
      growth: growthScore,
      overall
    },
    overallInterpretation: generateYouTubeInterpretation(data, overall),
    criticalIssues: generateYouTubeCriticalIssues(data),
    lostOpportunities: generateYouTubeLostOpportunities(data),
    actionableImprovements: generateYouTubeImprovements(data)
  };
}

// Helper functions for Instagram analysis
function calculateEngagementScore(engagementRate: number, followerCount: number): number {
  if (followerCount < 1000) return Math.min(100, engagementRate * 10);
  if (followerCount < 10000) return Math.min(100, engagementRate * 5);
  return Math.min(100, engagementRate * 2);
}

function calculateContentScore(postCount: number, bio: string): number {
  let score = Math.min(100, postCount * 5); // Up to 100 points for post count
  if (bio.length > 50) score += 10; // Bonus for detailed bio
  if (bio.includes('http')) score += 10; // Bonus for having link
  return Math.min(100, score);
}

function calculateGrowthScore(followerCount: number, postCount: number): number {
  if (followerCount < 100) return 20;
  if (followerCount < 1000) return 40;
  if (followerCount < 10000) return 60;
  if (followerCount < 100000) return 80;
  return 95;
}

function generateInstagramInterpretation(data: any, overall: number): string {
  if (overall >= 70) {
    return `Your Instagram profile shows strong engagement and content quality. With ${formatNumber(data.followerCount)} followers and ${data.engagementRate}% engagement rate, you're building a solid community. Focus on converting followers into customers through strategic CTAs.`;
  } else if (overall >= 50) {
    return `Your Instagram profile has room for growth. While you have ${formatNumber(data.followerCount)} followers, your engagement rate of ${data.engagementRate}% suggests content optimization could significantly improve results.`;
  } else {
    return `Your Instagram profile needs significant improvement. With ${formatNumber(data.followerCount)} followers and ${data.engagementRate}% engagement, you're missing opportunities to build community and drive conversions. Focus on content quality and engagement strategies.`;
  }
}

function generateInstagramCriticalIssues(data: any): any[] {
  const issues = [];

  if (data.engagementRate < 1) {
    issues.push({
      problem: "Low Engagement Rate",
      impact: `Your ${data.engagementRate}% engagement rate is below the 2-3% industry average, meaning your content isn't resonating with followers.`,
      fix: "Post more interactive content (polls, questions, behind-the-scenes), respond to all comments within 24 hours, and use 15-30 relevant hashtags per post."
    });
  }

  if (data.bio.length < 50) {
    issues.push({
      problem: "Weak Bio Description",
      impact: "Your bio doesn't clearly communicate what you offer or why people should follow you, reducing profile visits and conversions.",
      fix: "Rewrite your bio to include: who you help, what problem you solve, and a clear CTA. Example: 'Helping small businesses scale their Instagram presence. DM 'GROW' for a free audit.'"
    });
  }

  if (data.recentPosts.length < 12) {
    issues.push({
      problem: "Insufficient Content Volume",
      impact: "With fewer than 12 posts, your profile appears inactive, reducing follower growth and engagement.",
      fix: "Commit to posting 3-4 times per week for the next month. Create a content calendar with mix of educational, entertaining, and promotional content."
    });
  }

  return issues;
}

function generateInstagramLostOpportunities(data: any): any[] {
  const opportunities = [];

  if (!data.bio.includes('http')) {
    opportunities.push({
      missingElement: "No Link in Bio",
      revenueImpact: "Missing a link in your bio means you're not driving traffic to your website or offers, potentially losing $500-2000/month in missed conversions."
    });
  }

  if (data.recentPosts.length > 0 && !data.recentPosts.some((p: any) => p.caption.includes('link') || p.caption.includes('DM'))) {
    opportunities.push({
      missingElement: "No CTAs in Posts",
      revenueImpact: "Posts without clear CTAs fail to convert engagement into action, reducing lead generation by 60-70%."
    });
  }

  opportunities.push({
    missingElement: "No Instagram Stories Strategy",
    revenueImpact: "Not using Stories means missing daily touchpoints with followers, reducing engagement and conversion opportunities by 40%."
  });

  return opportunities;
}

function generateInstagramImprovements(data: any): string[] {
  return [
    "Add a trackable link in bio using Linktree or similar service",
    "Create a consistent posting schedule (3-4x per week minimum)",
    "Use Instagram Stories daily to increase engagement and visibility",
    "Respond to all comments within 24 hours to boost algorithm performance",
    "Use 15-30 relevant hashtags per post to increase discoverability",
    "Create highlight reels that showcase your best content and offers",
    "Collaborate with complementary accounts for cross-promotion",
    "Use Instagram Reels to reach new audiences and boost engagement",
    "Run Instagram contests or giveaways to increase follower count",
    "Use Instagram Insights to identify best-performing content types"
  ];
}

// Helper functions for YouTube analysis
function calculateYouTubeEngagementScore(engagementRate: number, subscriberCount: number): number {
  if (subscriberCount < 1000) return Math.min(100, engagementRate * 20);
  if (subscriberCount < 10000) return Math.min(100, engagementRate * 10);
  return Math.min(100, engagementRate * 5);
}

function calculateYouTubeContentScore(videoCount: number, description: string): number {
  let score = Math.min(100, videoCount * 2); // Up to 100 points for video count
  if (description.length > 100) score += 10;
  return Math.min(100, score);
}

function calculateYouTubeGrowthScore(subscriberCount: number, viewCount: number): number {
  if (subscriberCount < 100) return 20;
  if (subscriberCount < 1000) return 40;
  if (subscriberCount < 10000) return 60;
  if (subscriberCount < 100000) return 80;
  return 95;
}

function generateYouTubeInterpretation(data: any, overall: number): string {
  if (overall >= 70) {
    return `Your YouTube channel shows strong performance with ${formatNumber(data.subscriberCount)} subscribers and ${formatNumber(data.viewCount)} total views. Your content is resonating well with viewers.`;
  } else if (overall >= 50) {
    return `Your YouTube channel has potential for growth. With ${formatNumber(data.subscriberCount)} subscribers, focus on content optimization and audience engagement to improve results.`;
  } else {
    return `Your YouTube channel needs significant improvement. With ${formatNumber(data.subscriberCount)} subscribers, you're missing opportunities to build audience and drive conversions.`;
  }
}

function generateYouTubeCriticalIssues(data: any): any[] {
  const issues = [];

  if (data.engagementRate < 5) {
    issues.push({
      problem: "Low Engagement Rate",
      impact: `Your ${data.engagementRate}% engagement rate is below the 10% industry average, indicating content isn't resonating with viewers.`,
      fix: "Improve video retention by adding hooks in first 30 seconds, asking questions throughout, and creating more interactive content."
    });
  }

  if (data.recentVideos.length < 10) {
    issues.push({
      problem: "Limited Content Library",
      impact: "With fewer than 10 videos, your channel appears inactive, reducing subscriber growth and discoverability.",
      fix: "Commit to publishing 2-3 videos per week. Create a content calendar covering different topics within your niche."
    });
  }

  if (data.averageViews < 100) {
    issues.push({
      problem: "Low View Counts",
      impact: `Your average of ${data.averageViews} views per video suggests poor discoverability or content quality issues.`,
      fix: "Optimize video titles, thumbnails, and descriptions for SEO. Use trending topics and keywords in your niche."
    });
  }

  return issues;
}

function generateYouTubeLostOpportunities(data: any): any[] {
  const opportunities = [];

  opportunities.push({
    missingElement: "No Community Tab Engagement",
    revenueImpact: "Not using Community Posts means missing daily engagement opportunities with subscribers."
  });

  opportunities.push({
    missingElement: "No End Screens or Cards",
    revenueImpact: "Missing internal linking reduces watch time and subscriber conversion by 30-40%."
  });

  opportunities.push({
    missingElement: "No Playlist Organization",
    revenueImpact: "Unorganized content reduces viewer retention and discoverability by 25%."
  });

  return opportunities;
}

function generateYouTubeImprovements(data: any): string[] {
  return [
    "Create compelling, click-worthy thumbnails with consistent branding",
    "Optimize video titles with keywords and emotional triggers",
    "Add custom end screens and cards to drive engagement",
    "Organize content into playlists for better viewer experience",
    "Use Community tab to post polls, updates, and behind-the-scenes content",
    "Collaborate with other YouTubers in your niche for cross-promotion",
    "Create a consistent upload schedule (2-3x per week recommended)",
    "Use YouTube Shorts to reach new audiences and boost channel growth",
    "Add timestamps to video descriptions for better user experience",
    "Respond to comments to build community and boost algorithm performance"
  ];
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}
