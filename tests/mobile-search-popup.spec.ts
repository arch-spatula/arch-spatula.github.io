import { test, expect } from '@playwright/test';

test.describe('mobile viewport overflow', () => {
  test.use({ viewport: { width: 360, height: 543 }, isMobile: true, hasTouch: true });

  test('background overflow does not enlarge the open search viewport', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.locator('#app').evaluate((el) => {
      const wideContent = document.createElement('div');
      wideContent.style.width = '400px';
      el.append(wideContent);
    });
    await page.evaluate(() => window.scrollTo(0, 300));
    const scrollY = await page.evaluate(() => window.scrollY);
    await page.evaluate(() => {
      window.location.hash = 'search=open';
    });
    await expect(page.locator('#popup-container')).toBeVisible();
    expect(await page.evaluate(() => ({ width: innerWidth, height: innerHeight }))).toEqual({
      width: 360,
      height: 543,
    });
    expect(await page.locator('#popup-container').boundingBox()).toEqual({ x: 0, y: 0, width: 360, height: 543 });
    await page.getByRole('button', { name: '검색에서 돌아가기' }).tap();
    await expect(page.locator('#popup-container')).toBeHidden();
    expect(await page.evaluate(() => window.scrollY)).toBe(scrollY);
    await page.evaluate(() => window.scrollBy(0, 100));
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(scrollY);
  });
});

for (const width of [360, 390, 600, 601]) {
  test(`search layout and close button at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('http://localhost:3000/#search=open');
    const popup = page.locator('#popup-container');
    await expect(popup).toBeVisible();
    const close = page.getByRole('button', { name: '검색에서 돌아가기' });
    if (width > 600) {
      await expect(close).toBeHidden();
      expect((await popup.boundingBox())!.width).toBeLessThan(width);
      return;
    }

    expect(await popup.boundingBox()).toEqual({ x: 0, y: 0, width, height: 800 });
    await expect(close).toBeVisible();
    const closeBox = (await close.boundingBox())!;
    expect(closeBox.x).toBe(12);
    expect(closeBox.y).toBe(12);
    const formBox = (await page.locator('#search-form').boundingBox())!;
    expect(formBox.x).toBe(closeBox.x + closeBox.width + 8);
    expect(Math.abs(formBox.y + formBox.height / 2 - closeBox.y - closeBox.height / 2)).toBeLessThanOrEqual(1);
    expect(formBox.x + formBox.width).toBe(width - 12);
    await expect(page.locator('#search-close img')).toHaveJSProperty('naturalWidth', 24);
    for (const selector of ['#search-tag-list', '#search-blog-list']) {
      expect(await page.locator(selector).evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
    }
    await close.focus();
    await page.keyboard.press('Enter');
    await expect(popup).toBeHidden();
    await expect(page.locator('#popup-btn')).toBeFocused();
    await page.locator('#popup-btn').click();
    await expect(popup).toBeVisible();
    await close.click();
    await expect(popup).toBeHidden();
  });
}
