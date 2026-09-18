import type { Browser, BrowserType } from 'playwright';

export const createReusableBrowser = (browser: Browser) => {
  const pendingCloses: Promise<void>[] = [];
  const errors: unknown[] = [];
  const browserType = {
    launch: async () => ({
      newContext: async (options: Parameters<Browser['newContext']>[0]) => {
        const context = await browser.newContext(options);
        const close = context.close.bind(context);
        context.close = (closeOptions) => {
          // Mermaid does not await cleanup. Report failures after all contexts have closed.
          const pending = close(closeOptions).catch((error: unknown) => {
            errors.push(error);
          });
          pendingCloses.push(pending);
          return pending;
        };
        return context;
      },
      close: async () => {},
    }),
  } as unknown as BrowserType;

  return {
    browserType,
    close: async () => {
      await Promise.all(pendingCloses);
      try {
        await browser.close();
      } catch (error) {
        errors.push(error);
      }
      if (errors.length) throw new AggregateError(errors, 'Failed to close Mermaid browser resources');
    },
  };
};
