import { chromium } from 'playwright';
import * as cheerio from 'cheerio';

export interface ScrapedData {
  url: string;
  title: string;
  description: string;
  headings: { h1: string[]; h2: string[]; h3: string[] };
  text: string;
  ctas: string[];
}

export async function scrapeWebsite(url: string): Promise<ScrapedData> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    
    // Wait a brief moment for any JS to render initial content
    await page.waitForTimeout(2000);
    
    const html = await page.content();
    const $ = cheerio.load(html);
    
    const title = $('title').text() || '';
    const description = $('meta[name="description"]').attr('content') || '';
    
    const h1 = $('h1').map((_, el) => $(el).text().trim()).get().filter(Boolean);
    const h2 = $('h2').map((_, el) => $(el).text().trim()).get().filter(Boolean);
    const h3 = $('h3').map((_, el) => $(el).text().trim()).get().filter(Boolean);
    
    // Extract CTAs (buttons, links that look like buttons)
    const ctas = $('button, a').map((_, el) => {
      const text = $(el).text().trim();
      const className = $(el).attr('class') || '';
      // Simple heuristic for CTA: contains words like 'buy', 'book', 'sign up', 'contact' or has button-like classes
      if (text.length > 0 && text.length < 30) {
        if (/btn|button/i.test(className) || /buy|book|sign up|contact|start/i.test(text)) {
          return text;
        }
      }
      return null;
    }).get().filter(Boolean) as string[];

    // Extract body text, removing scripts and styles
    $('script, style, noscript, iframe, img, svg').remove();
    const text = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 5000); // Limit to 5000 chars

    return {
      url,
      title,
      description,
      headings: { h1, h2, h3 },
      text,
      ctas: Array.from(new Set(ctas)) // unique
    };
  } catch (error) {
    console.error('Error scraping website:', error);
    throw error;
  } finally {
    await browser.close();
  }
}
