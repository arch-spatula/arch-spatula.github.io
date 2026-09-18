import { describe, it, expect, vi } from 'vitest';
import type { Browser, BrowserContext } from 'playwright';
import { createReusableBrowser } from './reusableBrowser';

describe('createReusableBrowser', () => {
  it('waits for context cleanup before closing the shared browser', async () => {
    const cleanup = Promise.withResolvers<void>();
    const context = { close: vi.fn(() => cleanup.promise) } as unknown as BrowserContext;
    const browser = {
      newContext: vi.fn().mockResolvedValue(context),
      close: vi.fn().mockResolvedValue(undefined),
    } as unknown as Browser;
    const reusable = createReusableBrowser(browser);
    const shared = await reusable.browserType.launch();
    const wrappedContext = await shared.newContext({ bypassCSP: true });

    void wrappedContext.close();
    await shared.close();
    const closing = reusable.close();
    await Promise.resolve();
    expect(browser.close).not.toHaveBeenCalled();

    cleanup.resolve();
    await closing;
    expect(browser.newContext).toHaveBeenCalledWith({ bypassCSP: true });
    expect(browser.close).toHaveBeenCalledTimes(1);
  });

  it('reports cleanup errors after waiting for other contexts and closing the browser', async () => {
    const error = new Error('context cleanup failed');
    const cleanup = Promise.withResolvers<void>();
    const browser = {
      newContext: vi
        .fn()
        .mockResolvedValueOnce({ close: vi.fn().mockRejectedValue(error) })
        .mockResolvedValueOnce({ close: vi.fn(() => cleanup.promise) }),
      close: vi.fn().mockResolvedValue(undefined),
    } as unknown as Browser;
    const reusable = createReusableBrowser(browser);
    const shared = await reusable.browserType.launch();
    const first = await shared.newContext();
    const second = await shared.newContext();

    // Match Mermaid's fire-and-forget cleanup, including a rejected close.
    void first.close();
    void second.close();
    const closing = reusable.close();
    const assertion = expect(closing).rejects.toMatchObject({ errors: [error] });
    await Promise.resolve();
    expect(browser.close).not.toHaveBeenCalled();

    cleanup.resolve();
    await assertion;
    expect(browser.close).toHaveBeenCalledTimes(1);
  });
});
