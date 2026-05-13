export type PlatformType = 'website' | 'instagram' | 'youtube' | 'unknown';

export interface DetectedPlatform {
  type: PlatformType;
  confidence: number;
  normalizedUrl: string;
}

/**
 * Detects the platform type from a URL and normalizes it
 */
export function detectPlatform(url: string): DetectedPlatform {
  const normalizedUrl = normalizeUrl(url);

  // Instagram detection
  if (isInstagramUrl(normalizedUrl)) {
    return {
      type: 'instagram',
      confidence: 0.95,
      normalizedUrl
    };
  }

  // YouTube detection
  if (isYouTubeUrl(normalizedUrl)) {
    return {
      type: 'youtube',
      confidence: 0.95,
      normalizedUrl
    };
  }

  // Website detection (default)
  if (isValidUrl(normalizedUrl)) {
    return {
      type: 'website',
      confidence: 0.85,
      normalizedUrl
    };
  }

  return {
    type: 'unknown',
    confidence: 0,
    normalizedUrl
  };
}

/**
 * Normalizes a URL for consistent processing
 */
function normalizeUrl(url: string): string {
  let normalized = url.trim().toLowerCase();

  // Add protocol if missing
  if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
    normalized = 'https://' + normalized;
  }

  // Remove trailing slash
  normalized = normalized.replace(/\/$/, '');

  // Remove common tracking parameters
  normalized = normalized.replace(/[?&](utm_[^=&]*=[^&]*)/g, '');
  normalized = normalized.replace(/[?&]ref=[^&]*/g, '');
  normalized = normalized.replace(/[?&]source=[^&]*/g, '');

  return normalized;
}

/**
 * Checks if URL is a valid website URL
 */
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Checks if URL is an Instagram profile or post
 */
function isInstagramUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname === 'instagram.com' ||
      parsed.hostname === 'www.instagram.com' ||
      parsed.hostname.endsWith('.instagram.com')
    );
  } catch {
    return false;
  }
}

/**
 * Checks if URL is a YouTube channel or video
 */
function isYouTubeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname === 'youtube.com' ||
      parsed.hostname === 'www.youtube.com' ||
      parsed.hostname === 'youtu.be' ||
      parsed.hostname.endsWith('.youtube.com')
    );
  } catch {
    return false;
  }
}

/**
 * Extracts Instagram username from URL
 */
export function extractInstagramUsername(url: string): string | null {
  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split('/').filter(Boolean);

    // Handle profile URLs: instagram.com/username
    if (pathParts.length === 1 && !pathParts[0].includes('/')) {
      return pathParts[0];
    }

    // Handle post URLs: instagram.com/p/POST_ID/ or instagram.com/reel/REEL_ID/
    if (pathParts.length >= 2 && (pathParts[0] === 'p' || pathParts[0] === 'reel')) {
      // For posts, we'd need to scrape to get the username
      return null;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Extracts YouTube channel ID or video ID from URL
 */
export function extractYouTubeId(url: string): { type: 'channel' | 'video' | 'playlist'; id: string } | null {
  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split('/').filter(Boolean);

    // Handle video URLs: youtube.com/watch?v=VIDEO_ID or youtu.be/VIDEO_ID
    if (parsed.hostname === 'youtu.be') {
      return { type: 'video', id: pathParts[0] };
    }

    if (parsed.hostname.includes('youtube.com')) {
      // Video: youtube.com/watch?v=VIDEO_ID
      if (pathParts[0] === 'watch' && parsed.searchParams.has('v')) {
        return { type: 'video', id: parsed.searchParams.get('v')! };
      }

      // Channel: youtube.com/channel/CHANNEL_ID
      if (pathParts[0] === 'channel' && pathParts[1]) {
        return { type: 'channel', id: pathParts[1] };
      }

      // Channel: youtube.com/c/CHANNEL_NAME or /@CHANNEL_NAME
      if ((pathParts[0] === 'c' || pathParts[0].startsWith('@')) && pathParts[1]) {
        return { type: 'channel', id: pathParts[1] };
      }

      // Short: youtube.com/shorts/VIDEO_ID
      if (pathParts[0] === 'shorts' && pathParts[1]) {
        return { type: 'video', id: pathParts[1] };
      }
    }

    return null;
  } catch {
    return null;
  }
}