# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scripts\demo\portfolio.spec.js >> MilkTea Premium Portfolio Demo
- Location: scripts\demo\portfolio.spec.js:5:1

# Error details

```
Error: page.waitForTimeout: Target page, context or browser has been closed
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.setTimeout(180000);
  4   | 
  5   | test('MilkTea Premium Portfolio Demo', async ({ page }) => {
  6   | 
  7   |   //-----------------------------------------
  8   |   // HOME
  9   |   //-----------------------------------------
  10  | 
  11  |   await page.goto('/');
  12  | 
  13  |   await page.waitForLoadState('networkidle');
  14  | 
> 15  |   await page.waitForTimeout(2500);
      |              ^ Error: page.waitForTimeout: Target page, context or browser has been closed
  16  | 
  17  |   //-----------------------------------------
  18  |   // HERO
  19  |   //-----------------------------------------
  20  | 
  21  |   await page.mouse.move(960, 300);
  22  | 
  23  |   await page.waitForTimeout(1000);
  24  | 
  25  |   //-----------------------------------------
  26  |   // SCROLL HERO
  27  |   //-----------------------------------------
  28  | 
  29  |   await page.mouse.wheel(0, 300);
  30  | 
  31  |   await page.waitForTimeout(1200);
  32  | 
  33  |   await page.mouse.wheel(0, 300);
  34  | 
  35  |   await page.waitForTimeout(1200);
  36  | 
  37  |   await page.mouse.wheel(0, 300);
  38  | 
  39  |   await page.waitForTimeout(1200);
  40  | 
  41  |   //-----------------------------------------
  42  |   // FEATURED PRODUCTS
  43  |   //-----------------------------------------
  44  | 
  45  |   await page.mouse.move(700, 500);
  46  | 
  47  |   await page.waitForTimeout(1200);
  48  | 
  49  |   await page.mouse.move(1200, 500);
  50  | 
  51  |   await page.waitForTimeout(1200);
  52  | 
  53  |   //-----------------------------------------
  54  |   // CATEGORIES
  55  |   //-----------------------------------------
  56  | 
  57  |   await page.mouse.wheel(0, 500);
  58  | 
  59  |   await page.waitForTimeout(1500);
  60  | 
  61  |   await page.mouse.move(650, 420);
  62  | 
  63  |   await page.waitForTimeout(800);
  64  | 
  65  |   await page.mouse.move(980, 420);
  66  | 
  67  |   await page.waitForTimeout(800);
  68  | 
  69  |   await page.mouse.move(1320, 420);
  70  | 
  71  |   await page.waitForTimeout(800);
  72  | 
  73  |   //-----------------------------------------
  74  |   // TESTIMONIALS
  75  |   //-----------------------------------------
  76  | 
  77  |   await page.mouse.wheel(0, 500);
  78  | 
  79  |   await page.waitForTimeout(1500);
  80  | 
  81  |   await page.mouse.move(900, 450);
  82  | 
  83  |   await page.waitForTimeout(1500);
  84  | 
  85  |   //-----------------------------------------
  86  |   // FOOTER
  87  |   //-----------------------------------------
  88  | 
  89  |   await page.mouse.wheel(0, 900);
  90  | 
  91  |   await page.waitForTimeout(2000);
  92  | 
  93  |   //-----------------------------------------
  94  |   // BACK TO TOP
  95  |   //-----------------------------------------
  96  | 
  97  |   await page.mouse.wheel(0, -2500);
  98  | 
  99  |   await page.waitForTimeout(2500);
  100 | 
  101 |   //-----------------------------------------
  102 |   // DARK MODE
  103 |   //-----------------------------------------
  104 | 
  105 |   const themeButton = page.locator('[data-theme-toggle]').first();
  106 | 
  107 |   if (await themeButton.isVisible().catch(() => false)) {
  108 | 
  109 |     await themeButton.hover();
  110 | 
  111 |     await page.waitForTimeout(500);
  112 | 
  113 |     await themeButton.click();
  114 | 
  115 |     await page.waitForTimeout(2500);
```