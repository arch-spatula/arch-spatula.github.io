import { test, expect } from '@playwright/test';

const viewports = [
  { width: 1470, height: 776 },
  { width: 1920, height: 1080 },
  { width: 1440, height: 900 },
  { width: 2560, height: 1080 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
  { width: 844, height: 390 },
];

for (const viewport of viewports) {
  test(`search popup is centered at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('http://localhost:3000/#search=open');
    const popup = page.locator('#popup-container');
    await expect(popup).toBeVisible();
    const box = (await popup.boundingBox())!;

    expect(Math.abs(box.x + box.width / 2 - viewport.width / 2)).toBeLessThanOrEqual(1);
    expect(Math.abs(box.y + box.height / 2 - viewport.height / 2)).toBeLessThanOrEqual(1);
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
  });
}
