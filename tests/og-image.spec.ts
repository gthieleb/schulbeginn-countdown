import { test, expect } from '@playwright/test';

const OG_IMAGE_BASE = 'https://9zexw0j4ok.execute-api.eu-central-1.amazonaws.com';

test('OG Image - Full detail returns SVG', async ({ page }) => {
  const response = await page.goto(`${OG_IMAGE_BASE}/og`);
  expect(response?.status()).toBe(200);
  expect(response?.headers()['content-type']).toContain('image/svg+xml');
  
  const content = await response?.text();
  expect(content).toContain('<svg');
  expect(content).toContain('Tage');
  expect(content).toContain('Stunden');
  expect(content).toContain('Minuten');
  expect(content).toContain('Sekunden');
});

test('OG Image - Days only detail returns SVG with days', async ({ page }) => {
  const response = await page.goto(`${OG_IMAGE_BASE}/og?detail=days`);
  expect(response?.status()).toBe(200);
  expect(response?.headers()['content-type']).toContain('image/svg+xml');
  
  const content = await response?.text();
  expect(content).toContain('<svg');
  expect(content).toContain('Tage');
});

test('OG Image - Hours detail returns SVG with days and hours', async ({ page }) => {
  const response = await page.goto(`${OG_IMAGE_BASE}/og?detail=hours`);
  expect(response?.status()).toBe(200);
  expect(response?.headers()['content-type']).toContain('image/svg+xml');
  
  const content = await response?.text();
  expect(content).toContain('<svg');
  expect(content).toContain('Tage');
  expect(content).toContain('Stunden');
});

test('OG Image - Cache header is set', async ({ page }) => {
  const response = await page.goto(`${OG_IMAGE_BASE}/og`);
  const cacheControl = response?.headers()['cache-control'];
  expect(cacheControl).toContain('public');
  expect(cacheControl).toContain('max-age');
});

test('OG Image - CORS header allows all origins', async ({ page }) => {
  const response = await page.goto(`${OG_IMAGE_BASE}/og`);
  const cors = response?.headers()['access-control-allow-origin'];
  expect(cors).toBe('*');
});
