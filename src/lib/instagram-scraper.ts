import { chromium } from 'playwright';
import * as cheerio from 'cheerio';

export interface InstagramData {
  url: string;
  username: string;
  displayName: string;
  bio: string;
  followerCount: number;
  followingCount: number;
  postCount: number;
  isVerified: boolean;
  isBusinessAccount: boolean;
  category: string;
  profilePicture: string;
  recentPosts: InstagramPost[];
  engagementRate: number;
}

export interface InstagramPost {
  id: string;
  caption: string;
  likes: number;
  comments: number;
  imageUrl: string;
  timestamp: Date;
  type: 'image' | 'video' | 'carousel';
}

/**
 * Scrapes Instagram profile data
 * Note: Instagram has strict anti-scraping measures. This is a basic implementation
 * that may require additional authentication or proxy services for production use.
 */
export async function scrapeInstagram(url: string): Promise<InstagramData> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  try {
    // Navigate to Instagram profile
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });

    // Wait for content to load
    await page.waitForTimeout(3000);

    const html = await page.content();
    const $ = cheerio.load(html);

    // Extract data from meta tags and JSON-LD
    const jsonLd = $('script[type="application/ld+json"]').html();
    let profileData: any = {};

    if (jsonLd) {
      try {
        profileData = JSON.parse(jsonLd);
      } catch (e) {
        console.error('Failed to parse JSON-LD:', e);
      }
    }

    // Extract basic profile information
    const username = extractUsername(url);
    const displayName = $('meta[property="og:title"]').attr('content') || username || '';
    const bio = $('meta[property="og:description"]').attr('content') || '';
    const profilePicture = $('meta[property="og:image"]').attr('content') || '';

    // Parse follower counts from meta tags or page content
    const followerCount = parseCount($('meta[name="description"]').attr('content') || '');
    const followingCount = 0; // Not easily accessible without authentication
    const postCount = 0; // Not easily accessible without authentication

    // Extract recent posts from the page
    const recentPosts = extractRecentPosts($);

    // Calculate engagement rate
    const engagementRate = calculateEngagementRate(recentPosts, followerCount);

    return {
      url,
      username,
      displayName,
      bio,
      followerCount,
      followingCount,
      postCount,
      isVerified: false, // Would need additional parsing
      isBusinessAccount: false, // Would need additional parsing
      category: '',
      profilePicture,
      recentPosts,
      engagementRate
    };
  } catch (error) {
    console.error('Error scraping Instagram:', error);
    throw new Error('Failed to scrape Instagram profile. Instagram may have blocked the request.');
  } finally {
    await browser.close();
  }
}

/**
 * Extracts username from Instagram URL
 */
function extractUsername(url: string): string {
  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split('/').filter(Boolean);
    return pathParts[0] || '';
  } catch {
    return '';
  }
}

/**
 * Parses follower count from text
 */
function parseCount(text: string): number {
  const match = text.match(/(\d+(?:\.\d+)?[KMB]?)\s*followers/i);
  if (!match) return 0;

  const countStr = match[1].toUpperCase();
  const multiplier = countStr.includes('K') ? 1000 :
                     countStr.includes('M') ? 1000000 :
                     countStr.includes('B') ? 1000000000 : 1;

  const numValue = parseFloat(countStr.replace(/[KMB]/g, ''));
  return Math.round(numValue * multiplier);
}

/**
 * Extracts recent posts from the page
 */
function extractRecentPosts($: cheerio.CheerioAPI): InstagramPost[] {
  const posts: InstagramPost[] = [];

  // This is a simplified extraction. In production, you'd need to handle
  // Instagram's dynamic loading and potentially use their API
  $('article').each((_, element) => {
    const $el = $(element);
    const caption = $el.find('img').attr('alt') || '';
    const imageUrl = $el.find('img').attr('src') || '';

    if (imageUrl) {
      posts.push({
        id: '',
        caption,
        likes: 0,
        comments: 0,
        imageUrl,
        timestamp: new Date(),
        type: 'image'
      });
    }
  });

  return posts.slice(0, 12); // Return up to 12 recent posts
}

/**
 * Calculates engagement rate from posts and follower count
 */
function calculateEngagementRate(posts: InstagramPost[], followerCount: number): number {
  if (posts.length === 0 || followerCount === 0) return 0;

  const totalEngagement = posts.reduce((sum, post) => sum + post.likes + post.comments, 0);
  const avgEngagement = totalEngagement / posts.length;

  return Math.round((avgEngagement / followerCount) * 100 * 100) / 100; // Return as percentage
}