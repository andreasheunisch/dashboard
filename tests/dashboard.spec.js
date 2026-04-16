const { test, expect, request } = require('@playwright/test');

// ── Dashboard home page ───────────────────────────────────────────────────────

test.describe('Dashboard home page', () => {
  test('page title is "Dashboard"', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Dashboard');
  });

  test('calculator card links to /calculator', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('a[href="/calculator"]');
    await expect(link).toBeVisible();
  });
});

// ── Calculator page ───────────────────────────────────────────────────────────

test.describe('Calculator page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculator');
  });

  test('page title contains "Calculator"', async ({ page }) => {
    await expect(page).toHaveTitle(/Calculator/);
  });

  test('display initialises to 0', async ({ page }) => {
    await expect(page.locator('#display')).toHaveText('0');
  });

  test('all operator and control buttons are visible', async ({ page }) => {
    for (const label of ['+', '−', '×', '÷', '=', 'C']) {
      await expect(page.getByRole('button', { name: label, exact: true })).toBeVisible();
    }
  });
});

// ── Calculator arithmetic ─────────────────────────────────────────────────────

test.describe('Calculator arithmetic', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculator');
  });

  test('3 + 4 = 7', async ({ page }) => {
    await page.getByRole('button', { name: '3', exact: true }).click();
    await page.getByRole('button', { name: '+', exact: true }).click();
    await page.getByRole('button', { name: '4', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('7');
  });

  test('5 ÷ 0 = Error', async ({ page }) => {
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '÷', exact: true }).click();
    await page.getByRole('button', { name: '0', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('Error');
  });

  test('C resets display to 0', async ({ page }) => {
    await page.getByRole('button', { name: '9', exact: true }).click();
    await page.getByRole('button', { name: '9', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('99');
    await page.getByRole('button', { name: 'C', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('0');
  });
});

// ── Server routing ────────────────────────────────────────────────────────────

test.describe('Server routing', () => {
  test('unknown path returns 404', async () => {
    const ctx = await request.newContext({ baseURL: 'http://localhost:3000' });
    const response = await ctx.get('/nonexistent');
    expect(response.status()).toBe(404);
    await ctx.dispose();
  });
});
