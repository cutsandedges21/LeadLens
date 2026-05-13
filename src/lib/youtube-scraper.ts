import { chromium } from 'playwright';
import * as cheerio from 'cheerio';

export interface YouTubeData {
  url: string;
  channelId: string;
  channelName: string;
  description: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  isVerified: boolean;
  joinedDate: Date;
  keywords: string[];
  recentVideos: YouTubeVideo[];
  averageViews: number;
  engagementRate: number;
  uploadFrequency: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  publishedAt: Date;
  duration: string;
}

/**
 * Scrapes YouTube channel data
 * Note: YouTube has anti-scraping measures. This is a basic implementation
 * that may require additional handling for production use.
 */
export async function scrapeYouTube(url: string): Promise<YouTubeData> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  try {
    // Navigate to YouTube channel
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });

    // Wait for content to load
    await page.waitForTimeout(3000);

    const html = await page.content();
    const $ = cheerio.load(html);

    // Extract data from meta tags
    const channelName = $('meta[property="og:title"]').attr('content') || '';
    const description = $('meta[property="og:description"]').attr('content') || '';
    const channelThumbnail = $('meta[property="og:image"]').attr('content') || '';

    // Parse subscriber and view counts from meta description
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    const subscriberCount = parseYouTubeCount(metaDescription, /(\d+(?:\.\d+)?[KMB]?)\s*subscribers/i);
    const videoCount = parseYouTubeCount(metaDescription, /(\d+(?:\.\d+)?[KMB]?)\s*videos/i);

    // Extract channel ID from URL or page
    const channelId = extractChannelId(url, $);

    // Extract recent videos
    const recentVideos = extractRecentVideos($);

    // Calculate metrics
    const averageViews = calculateAverageViews(recentVideos);
    const engagementRate = calculateEngagementRate(recentVideos);
    const uploadFrequency = calculateUploadFrequency(recentVideos);

    return {
      url,
      channelId,
      channelName,
      description,
      subscriberCount,
      videoCount,
      viewCount: recentVideos.reduce((sum, v) => sum + v.viewCount, 0),
      isVerified: false, // Would need additional parsing
      joinedDate: new Date(),
      keywords: extractKeywords(description),
      recentVideos,
      averageViews,
      engagementRate,
      uploadFrequency
    };
  } catch (error) {
    console.error('Error scraping YouTube:', error);
    throw new Error('Failed to scrape YouTube channel. YouTube may have blocked the request.');
  } finally {
    await browser.close();
  }
}

/**
 * Extracts channel ID from URL or page content
 */
function extractChannelId(url: string, $: cheerio.CheerioAPI): string {
  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split('/').filter(Boolean);

    // Try to extract from URL first
    if (pathParts[0] === 'channel' && pathParts[1]) {
      return pathParts[1];
    }

    // Fallback to meta tags
    const channelIdFromMeta = $('meta[itemprop="channelId"]').attr('content');
    if (channelIdFromMeta) return channelIdFromMeta;

    // Generate a hash-based ID as fallback
    return generateHashId(url);
  } catch {
    return generateHashId(url);
  }
}

/**
 * Generates a hash-based ID for channels
 */
function generateHashId(url: string): string {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

/**
 * Parses YouTube count from text
 */
function parseYouTubeCount(text: string, pattern: RegExp): number {
  const match = text.match(pattern);
  if (!match) return 0;

  const countStr = match[1].toUpperCase();
  const multiplier = countStr.includes('K') ? 1000 :
                     countStr.includes('M') ? 1000000 :
                     countStr.includes('B') ? 1000000000 : 1;

  const numValue = parseFloat(countStr.replace(/[KMB]/g, ''));
  return Math.round(numValue * multiplier);
}

/**
 * Extracts recent videos from the page
 */
function extractRecentVideos($: cheerio.CheerioAPI): YouTubeVideo[] {
  const videos: YouTubeVideo[] = [];

  // YouTube video cards have specific structure
  $('ytd-grid-video-renderer, ytd-compact-video-renderer').each((_, element) => {
    const $el = $(element);

    const title = $el.find('#video-title').text().trim();
    const thumbnail = $el.find('img').attr('src') || '';
    const viewText = $el.find('#metadata-line span').first().text().trim();

    if (title && thumbnail) {
      videos.push({
        id: '',
        title,
        description: '',
        thumbnail,
        viewCount: parseViewCount(viewText),
        likeCount: 0,
        commentCount: 0,
        publishedAt: new Date(),
        duration: ''
      });
    }
  });

  return videos.slice(0, 12); // Return up to 12 recent videos
}

/**
 * Parses view count from text like "1.2M views"
 */
function parseViewCount(text: string): number {
  const match = text.match(/(\d+(?:\.\d+)?[KMB]?)\s*views?/i);
  if (!match) return 0;

  const countStr = match[1].toUpperCase();
  const multiplier = countStr.includes('K') ? 1000 :
                     countStr.includes('M') ? 1000000 :
                     countStr.includes('B') ? 1000000000 : 1;

  const numValue = parseFloat(countStr.replace(/[KMB]/g, ''));
  return Math.round(numValue * multiplier);
}

/**
 * Calculates average views from videos
 */
function calculateAverageViews(videos: YouTubeVideo[]): number {
  if (videos.length === 0) return 0;

  const totalViews = videos.reduce((sum, video) => sum + video.viewCount, 0);
  return Math.round(totalViews / videos.length);
}

/**
 * Calculates engagement rate from videos
 */
function calculateEngagementRate(videos: YouTubeVideo[]): number {
  if (videos.length === 0) return 0;

  // Simple engagement rate calculation
  const totalEngagement = videos.reduce((sum, video) => {
    return sum + video.likeCount + video.commentCount;
  }, 0);

  const totalViews = videos.reduce((sum, video) => sum + video.viewCount, 0);

  if (totalViews === 0) return 0;

  return Math.round((totalEngagement / totalViews) * 100 * 100) / 100;
}

/**
 * Calculates upload frequency based on recent videos
 */
function calculateUploadFrequency(videos: YouTubeVideo[]): string {
  if (videos.length < 2) return 'Unknown';

  const now = new Date();
  const oldestVideo = videos[videos.length - 1];
  const daysDiff = Math.floor((now.getTime() - oldestVideo.publishedAt.getTime()) / (1000 * 60 * 60 * 24));

  if (daysDiff <= 7) return 'Weekly';
  if (daysDiff <= 30) return 'Monthly';
  if (daysDiff <= 90) return 'Quarterly';
  return 'Irregular';
}

/**
 * Extracts keywords from description
 */
function extractKeywords(description: string): string[] {
  if (!description) return [];

  // Simple keyword extraction - in production, use NLP
  const words = description.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3);

  // Remove common stop words
  const stopWords = ['this', 'that', 'with', 'from', 'have', 'will', 'your', 'about', 'their', 'what', 'which', 'when', 'just', 'like', 'more', 'subscribe', 'channel'];

  const keywords = words.filter(word => !stopWords.includes(word));

  // Return top 5 most frequent keywords
  const frequency: Record<string, number> = {};
  keywords.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);
}