import { test, expect } from '@playwright/test';

for (const width of [360, 390, 600, 601]) {
  test(`search layout and close button at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('http://localhost:3000/#search=open');
    const popup = page.locator('#popup-container');
    await expect(popup).toBeVisible();
    const close = page.getByRole('button', { name: '검색 닫기' });
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
