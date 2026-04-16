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

// ── Calculator memory ────────────────────────────────────────────────────────

test.describe('Calculator memory', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculator');
  });

  test('M+ stores value and MR recalls it', async ({ page }) => {
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: 'M+', exact: true }).click();
    await page.getByRole('button', { name: 'C', exact: true }).click();
    await page.getByRole('button', { name: 'MR', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('5');
  });

  test('MC clears memory', async ({ page }) => {
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: 'M+', exact: true }).click();
    await page.getByRole('button', { name: 'MC', exact: true }).click();
    await page.getByRole('button', { name: 'MR', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('0');
  });

  test('M+ accumulates', async ({ page }) => {
    await page.getByRole('button', { name: '3', exact: true }).click();
    await page.getByRole('button', { name: 'M+', exact: true }).click();
    await page.getByRole('button', { name: '4', exact: true }).click();
    await page.getByRole('button', { name: 'M+', exact: true }).click();
    await page.getByRole('button', { name: 'C', exact: true }).click();
    await page.getByRole('button', { name: 'MR', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('7');
  });
});

// ── Scientific calculator ────────────────────────────────────────────────────

test.describe('Scientific calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculator');
    await page.locator('#btn-sci').click();
  });

  test('sin(0) → 0', async ({ page }) => {
    await page.getByRole('button', { name: '0', exact: true }).click();
    await page.getByRole('button', { name: 'sin', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('0');
  });

  test('cos(0) → 1', async ({ page }) => {
    await page.getByRole('button', { name: '0', exact: true }).click();
    await page.getByRole('button', { name: 'cos', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('1');
  });

  test('log(100) → 2', async ({ page }) => {
    await page.getByRole('button', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: '0', exact: true }).click();
    await page.getByRole('button', { name: '0', exact: true }).click();
    await page.getByRole('button', { name: 'log', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('2');
  });

  test('log(0) → Error', async ({ page }) => {
    await page.getByRole('button', { name: '0', exact: true }).click();
    await page.getByRole('button', { name: 'log', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('Error');
  });

  test('√(9) → 3', async ({ page }) => {
    await page.getByRole('button', { name: '9', exact: true }).click();
    await page.getByRole('button', { name: '√', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('3');
  });

  test('√(-1) → Error', async ({ page }) => {
    await page.getByRole('button', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: '±', exact: true }).click();
    await page.getByRole('button', { name: '√', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('Error');
  });

  test('x² of 5 → 25', async ({ page }) => {
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: 'x²', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('25');
  });

  test('2 xʸ 8 = → 256', async ({ page }) => {
    await page.getByRole('button', { name: '2', exact: true }).click();
    await page.getByRole('button', { name: 'xʸ', exact: true }).click();
    await page.getByRole('button', { name: '8', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('256');
  });

  test('π inserts 3.141592653589793', async ({ page }) => {
    await page.getByRole('button', { name: 'π', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('3.141592653589793');
  });

  test('± negates 5 → -5', async ({ page }) => {
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '±', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('-5');
  });

  test('% of 50 → 0.5', async ({ page }) => {
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '0', exact: true }).click();
    await page.getByRole('button', { name: '%', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('0.5');
  });

  test('(3+4) → 7', async ({ page }) => {
    await page.getByRole('button', { name: '(', exact: true }).click();
    await page.getByRole('button', { name: '3', exact: true }).click();
    await page.getByRole('button', { name: '+', exact: true }).click();
    await page.getByRole('button', { name: '4', exact: true }).click();
    await page.getByRole('button', { name: ')', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('7');
  });

  test('unmatched ) → Error', async ({ page }) => {
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: ')', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('Error');
  });

  test('sin(π) rounds to 0', async ({ page }) => {
    await page.getByRole('button', { name: 'π', exact: true }).click();
    await page.getByRole('button', { name: 'sin', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('0');
  });

  test('tan(0) → 0', async ({ page }) => {
    await page.getByRole('button', { name: '0', exact: true }).click();
    await page.getByRole('button', { name: 'tan', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('0');
  });

  test('ln(1) → 0', async ({ page }) => {
    await page.getByRole('button', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: 'ln', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('0');
  });

  test('ln(0) → Error', async ({ page }) => {
    await page.getByRole('button', { name: '0', exact: true }).click();
    await page.getByRole('button', { name: 'ln', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('Error');
  });

  test('ln(e) → 1', async ({ page }) => {
    await page.getByRole('button', { name: 'e', exact: true }).click();
    await page.getByRole('button', { name: 'ln', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('1');
  });

  test('5 + (3 + 4) → 12', async ({ page }) => {
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '+', exact: true }).click();
    await page.getByRole('button', { name: '(', exact: true }).click();
    await page.getByRole('button', { name: '3', exact: true }).click();
    await page.getByRole('button', { name: '+', exact: true }).click();
    await page.getByRole('button', { name: '4', exact: true }).click();
    await page.getByRole('button', { name: ')', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('12');
  });
});

// ── Scientific notation display ──────────────────────────────────────────────

test.describe('Scientific notation display', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculator');
  });

  test('9999999999 + 1 = shows 1E+10', async ({ page }) => {
    // Type 9999999999
    for (const d of '9999999999') {
      await page.getByRole('button', { name: d, exact: true }).click();
    }
    await page.getByRole('button', { name: '+', exact: true }).click();
    await page.getByRole('button', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('1E+10');
  });

  test('1 ÷ 10000000 = shows 1E-7', async ({ page }) => {
    await page.getByRole('button', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: '÷', exact: true }).click();
    for (const d of '10000000') {
      await page.getByRole('button', { name: d, exact: true }).click();
    }
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('1E-7');
  });

  test('12345 + 0 = shows 12345 (no scientific notation)', async ({ page }) => {
    for (const d of '12345') {
      await page.getByRole('button', { name: d, exact: true }).click();
    }
    await page.getByRole('button', { name: '+', exact: true }).click();
    await page.getByRole('button', { name: '0', exact: true }).click();
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('12345');
  });

  test('1.5 × 10000000000 = shows 1.5E+10 (trailing zeros stripped)', async ({ page }) => {
    await page.getByRole('button', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: '.', exact: true }).click();
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '×', exact: true }).click();
    for (const d of '10000000000') {
      await page.getByRole('button', { name: d, exact: true }).click();
    }
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(page.locator('#display')).toHaveText('1.5E+10');
  });

  test('display never contains "..." for computed results', async ({ page }) => {
    // Large result
    for (const d of '9999999999') {
      await page.getByRole('button', { name: d, exact: true }).click();
    }
    await page.getByRole('button', { name: '×', exact: true }).click();
    for (const d of '9999999999') {
      await page.getByRole('button', { name: d, exact: true }).click();
    }
    await page.getByRole('button', { name: '=', exact: true }).click();
    const text = await page.locator('#display').textContent();
    expect(text).not.toContain('...');
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
