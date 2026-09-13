const { test, expect } = require('@playwright/test');

async function openAndStart(page, path = '/') {
  await page.goto(path);
  await expect(page.locator('#hero')).toBeVisible();
  await page.locator('#startBtn').click();
  await expect(page.locator('#hero')).toHaveClass(/hidden/);
}

async function progressValue(page) {
  return Number(await page.locator('.progress').getAttribute('aria-valuenow'));
}

test('boots cleanly and physical keyboard advances the manuscript', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await openAndStart(page);
  const before = await progressValue(page);

  for (const key of ['a', 's', 'd', 'f', 'j', 'k']) await page.keyboard.press(key);

  await expect.poll(() => progressValue(page)).toBeGreaterThan(before);
  await expect(page.locator('#paperTitle')).not.toHaveText('');
  expect(pageErrors).toEqual([]);
});

test('loads a preset through the product UI', async ({ page }) => {
  await openAndStart(page);
  await page.locator('#presetBtn').click();
  await expect(page.locator('#presetDialog')).toBeVisible();
  await page.getByRole('button', { name: /Research Paper/i }).click();

  await expect(page.locator('#presetDialog')).not.toBeVisible();
  await expect(page.locator('#sourceValue')).toContainText(/Custom text|自定义文本/);
  await expect(page.locator('#sections .section')).toHaveCount(5);
});

test('imports Markdown and preserves section structure', async ({ page }) => {
  await openAndStart(page);
  await page.locator('#loadBtn').click();
  await expect(page.locator('#loadDialog')).toBeVisible();

  await page.locator('#textInput').fill('# Test Manuscript\n\n## Abstract\nAlpha beta.\n\n## Results\nGamma delta.');
  await page.locator('#useTextBtn').click();

  await expect(page.locator('#loadDialog')).not.toBeVisible();
  await expect(page.locator('#sections .section')).toHaveCount(2);
  await expect(page.locator('#sections .section').nth(0).locator('h2')).toHaveText('Abstract');
  await expect(page.locator('#sections .section').nth(1).locator('h2')).toHaveText('Results');
});

test('applies shareable URL settings', async ({ page }) => {
  await page.goto('/?lang=zh&tempo=92&chaos=70&storm=1&sound=0');

  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.locator('#tempo')).toHaveValue('92');
  await expect(page.locator('#chaos')).toHaveValue('70');
  await expect(page.locator('#stormBtn')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#soundBtn')).toHaveAttribute('aria-pressed', 'false');
});

test('exports the currently revealed manuscript as Markdown', async ({ page }) => {
  await openAndStart(page);
  for (let index = 0; index < 14; index += 1) await page.keyboard.press('a');

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#exportBtn').click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toMatch(/\.md$/i);
});

test('Cinema mode can be toggled without requiring fullscreen permission', async ({ page }) => {
  await openAndStart(page);
  await page.keyboard.press('f');
  await expect(page.locator('html')).toHaveClass(/cinema/);
  await page.keyboard.press('Escape');
  await expect(page.locator('html')).not.toHaveClass(/cinema/);
});

test('accessibility semantics stay attached to dynamic UI', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.skip-link')).toHaveAttribute('href', '#paper');
  await expect(page.locator('#paper')).not.toHaveAttribute('aria-live', /.+/);
  await expect(page.locator('.progress')).toHaveAttribute('role', 'progressbar');
  await expect(page.locator('#keyboard')).toHaveAttribute('role', 'group');
  await expect(page.locator('#keyboard .key').first()).toHaveAttribute('role', 'button');
  await expect(page.locator('#loadBtn')).toHaveAttribute('aria-label', /Load text|导入文本/);
});

test('registers the offline service worker on HTTP origins', async ({ page }) => {
  await page.goto('/');
  const registered = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return false;
    for (let attempt = 0; attempt < 30; attempt += 1) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) return true;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return false;
  });
  expect(registered).toBe(true);
});

test('mobile users can advance by tapping the virtual keyboard', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'mobile-only interaction check');

  await openAndStart(page);
  const title = page.locator('#paperTitle');
  const beforeLength = (await title.textContent() || '').length;
  const firstKey = page.locator('#keyboard .key').first();

  await expect(firstKey).toHaveAttribute('role', 'button');
  await firstKey.tap();
  await expect.poll(async () => (await title.textContent() || '').length).toBeGreaterThan(beforeLength);

  const topbar = await page.locator('.topbar').boundingBox();
  expect(topbar?.height || 999).toBeLessThan(150);
});
