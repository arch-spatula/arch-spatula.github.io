import { test, expect, type Locator } from '@playwright/test';

async function expectReadable(locator: Locator, pseudo?: string) {
  const contrast = await locator.evaluate((element, pseudoElement) => {
    const foreground = getComputedStyle(element, pseudoElement).color;
    let backgroundElement: Element | null = element;
    let background = 'rgba(0, 0, 0, 0)';
    while (backgroundElement && background === 'rgba(0, 0, 0, 0)') {
      background = getComputedStyle(backgroundElement).backgroundColor;
      backgroundElement = backgroundElement.parentElement;
    }
    const luminance = (color: string) => {
      const channels = color
        .match(/[\d.]+/g)!
        .slice(0, 3)
        .map(Number)
        .map((channel) => {
          const value = channel / 255;
          return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
        });
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    };
    const light = luminance(foreground);
    const dark = luminance(background);
    return (Math.max(light, dark) + 0.05) / (Math.min(light, dark) + 0.05);
  }, pseudo);
  expect(contrast).toBeGreaterThanOrEqual(4.5);
}

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
]) {
  test.describe(`search popup theme at ${viewport.width}px`, () => {
    test.use({ viewport });

    test('dark surfaces and readable search states', async ({ page }) => {
      await page.goto('http://localhost:3000/#search=open');
      const popup = page.locator('#popup-container');
      const input = page.locator('#search-input');
      await expect(popup).toBeVisible();
      await expect(popup).toHaveCSS(
        'background-color',
        await page.locator('body').evaluate((element) => getComputedStyle(element).backgroundColor),
      );
      await expectReadable(input);
      await expectReadable(input, '::placeholder');
      await expectReadable(page.locator('.search-item-link').nth(1));
      const tag = page.locator('#search-tag-list .tag-link').first();
      await expectReadable(tag);

      await tag.hover();
      const hoverBackground = await tag.evaluate((element) => getComputedStyle(element).backgroundColor);
      await expectReadable(tag);
      await page.mouse.move(0, 0);
      await expect(tag).not.toHaveCSS('background-color', hoverBackground);
      await input.focus();
      await page.keyboard.press('Tab');
      await expect(tag).toBeFocused();
      await expect(tag).toHaveCSS('outline-style', 'solid');
      await expect(tag).toHaveCSS('outline-width', '2px');

      await input.fill('typescript');
      const results = page.locator('.search-item:not(.hidden) .search-item-link');
      await expect(results.first()).toContainText(/typescript/i);
      await expectReadable(results.first());
      await expectReadable(results.first().locator('.search-highlight').first());
      await expectReadable(page.locator('#search-tag-list .search-highlight').first());
      await input.fill('');
      const selectedBackground = await results.first().evaluate((element) => getComputedStyle(element).backgroundColor);
      await page.keyboard.press('ArrowDown');
      await expect(results.nth(1)).toHaveClass(/search-item-focus/);
      await expect(results.first()).not.toHaveCSS('background-color', selectedBackground);
      await expectReadable(results.nth(1));
      await results.first().hover();
      await expect(results.first()).not.toHaveCSS('background-color', selectedBackground);
      await expectReadable(results.first());

      await page.keyboard.press('Escape');
      await expect(popup).toBeHidden();
      await page.locator('#popup-btn').click();
      await expect(popup).toBeVisible();
      await expect(input).toHaveValue('');
      if (viewport.width > 600) {
        await page.locator('#overlay').click({ position: { x: 5, y: 5 } });
      } else {
        await page.getByRole('button', { name: '검색에서 돌아가기' }).click();
      }
      await expect(popup).toBeHidden();
    });

    test('selected tags and keyboard result navigation remain usable', async ({ page }) => {
      await page.goto('http://localhost:3000/#search=open&tags=typescript');
      const selectedTag = page.locator('#search-tag-list .tag-link[data-tag="typescript"]');
      await expect(selectedTag).toHaveClass(/selected/);
      const otherTag = page.locator('#search-tag-list .tag-link:not(.selected)').first();
      await expect(selectedTag).not.toHaveCSS(
        'background-color',
        await otherTag.evaluate((element) => getComputedStyle(element).backgroundColor),
      );
      await expectReadable(selectedTag);
      await page.locator('#search-input').fill('');
      await page.keyboard.press('ArrowDown');
      await expect(page.locator('.search-item-link').nth(1)).toHaveClass(/search-item-focus/);
      await page.keyboard.press('ArrowUp');
      await expect(page.locator('.search-item-link').first()).toHaveClass(/search-item-focus/);
      const selectedResult = page.locator('.search-item-focus');
      const destination = new URL((await selectedResult.getAttribute('href'))!, page.url());
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL((url) => url.pathname === destination.pathname);
    });
  });
}
