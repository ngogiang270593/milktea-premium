import { test, expect } from '@playwright/test';

test.setTimeout(180000);

test('MilkTea Premium Portfolio Demo', async ({ page }) => {

  //-----------------------------------------
  // HOME
  //-----------------------------------------

  await page.goto('/');

  await page.waitForLoadState('networkidle');

  await page.waitForTimeout(2500);

  //-----------------------------------------
  // HERO
  //-----------------------------------------

  await page.mouse.move(960, 300);

  await page.waitForTimeout(1000);

  //-----------------------------------------
  // SCROLL HERO
  //-----------------------------------------

  await page.mouse.wheel(0, 300);

  await page.waitForTimeout(1200);

  await page.mouse.wheel(0, 300);

  await page.waitForTimeout(1200);

  await page.mouse.wheel(0, 300);

  await page.waitForTimeout(1200);

  //-----------------------------------------
  // FEATURED PRODUCTS
  //-----------------------------------------

  await page.mouse.move(700, 500);

  await page.waitForTimeout(1200);

  await page.mouse.move(1200, 500);

  await page.waitForTimeout(1200);

  //-----------------------------------------
  // CATEGORIES
  //-----------------------------------------

  await page.mouse.wheel(0, 500);

  await page.waitForTimeout(1500);

  await page.mouse.move(650, 420);

  await page.waitForTimeout(800);

  await page.mouse.move(980, 420);

  await page.waitForTimeout(800);

  await page.mouse.move(1320, 420);

  await page.waitForTimeout(800);

  //-----------------------------------------
  // TESTIMONIALS
  //-----------------------------------------

  await page.mouse.wheel(0, 500);

  await page.waitForTimeout(1500);

  await page.mouse.move(900, 450);

  await page.waitForTimeout(1500);

  //-----------------------------------------
  // FOOTER
  //-----------------------------------------

  await page.mouse.wheel(0, 900);

  await page.waitForTimeout(2000);

  //-----------------------------------------
  // BACK TO TOP
  //-----------------------------------------

  await page.mouse.wheel(0, -2500);

  await page.waitForTimeout(2500);

  //-----------------------------------------
  // DARK MODE
  //-----------------------------------------

  const themeButton = page.locator('[data-theme-toggle]').first();

  if (await themeButton.isVisible().catch(() => false)) {

    await themeButton.hover();

    await page.waitForTimeout(500);

    await themeButton.click();

    await page.waitForTimeout(2500);

    await themeButton.hover();

    await page.waitForTimeout(500);

    await themeButton.click();

    await page.waitForTimeout(2500);

  }

  //-----------------------------------------
  // PART 2 STARTS HERE
  //-----------------------------------------
    //-----------------------------------------
  // LANGUAGE
  //-----------------------------------------

  const languageButton = page.locator('[data-language-toggle]').first();

  if (await languageButton.isVisible().catch(() => false)) {

    await languageButton.hover();

    await page.waitForTimeout(500);

    await languageButton.click();

    await page.waitForTimeout(2000);

    await languageButton.hover();

    await page.waitForTimeout(500);

    await languageButton.click();

    await page.waitForTimeout(2000);

  }

  //-----------------------------------------
  // OPEN MENU PAGE
  //-----------------------------------------

  await page.goto('/menu');

  await page.waitForLoadState('networkidle');

  await page.waitForTimeout(2500);

  //-----------------------------------------
  // MENU INTRO
  //-----------------------------------------

  await page.mouse.move(900,250);

  await page.waitForTimeout(800);

  await page.mouse.wheel(0,350);

  await page.waitForTimeout(1200);

  await page.mouse.wheel(0,-350);

  await page.waitForTimeout(1200);

  //-----------------------------------------
  // CATEGORY FILTER DEMO
  //-----------------------------------------

  const categories = page.locator('[data-category]');

  const totalCategories = await categories.count();

  for (let i = 0; i < Math.min(totalCategories,4); i++) {

      const category = categories.nth(i);

      await category.hover();

      await page.waitForTimeout(600);

      await category.click();

      await page.waitForLoadState('networkidle');

      await page.waitForTimeout(1800);

  }

  //-----------------------------------------
  // CLEAR CATEGORY
  //-----------------------------------------

  if(totalCategories){

      await categories.first().click().catch(()=>{});

      await page.waitForTimeout(1500);

  }

  //-----------------------------------------
  // SEARCH
  //-----------------------------------------

  const search = page.locator('input[type="search"]').first();

  if(await search.isVisible().catch(()=>false)){

      await search.click();

      await page.waitForTimeout(500);

      await search.pressSequentially('matcha');

      await page.waitForTimeout(2200);

      await search.clear();

      await page.waitForTimeout(1000);

      await search.pressSequentially('brown sugar');

      await page.waitForTimeout(2200);

      await search.clear();

      await page.waitForTimeout(1500);

  }

  //-----------------------------------------
  // SORT (OPTIONAL)
  //-----------------------------------------

  const sort = page.locator('select').first();

  if(await sort.isVisible().catch(()=>false)){

      const optionCount = await sort.locator('option').count();

      if(optionCount>1){

          await sort.selectOption({index:1});

          await page.waitForTimeout(1800);

          await sort.selectOption({index:0});

          await page.waitForTimeout(1800);

      }

  }

  //-----------------------------------------
  // PRODUCT GRID SCROLL
  //-----------------------------------------

  await page.mouse.wheel(0,500);

  await page.waitForTimeout(1000);

  await page.mouse.wheel(0,500);

  await page.waitForTimeout(1000);

  await page.mouse.move(600,500);

  await page.waitForTimeout(600);

  await page.mouse.move(900,500);

  await page.waitForTimeout(600);

  await page.mouse.move(1250,500);

  await page.waitForTimeout(1200);

  await page.mouse.wheel(0,-1000);

  await page.waitForTimeout(1500);

  //-----------------------------------------
  // PART 3 STARTS HERE
  //-----------------------------------------
    //-----------------------------------------
  // PRODUCT HOVER SHOWCASE
  //-----------------------------------------

  const products = page.locator('[data-product-card]');

  const totalProducts = await products.count();

  for (let i = 0; i < Math.min(totalProducts, 4); i++) {

    const product = products.nth(i);

    await product.scrollIntoViewIfNeeded();

    await page.waitForTimeout(800);

    await product.hover();

    await page.waitForTimeout(1200);

  }

  //-----------------------------------------
  // OPEN FIRST PRODUCT
  //-----------------------------------------

  if (totalProducts > 0) {

    await products.first().click();

    await page.waitForLoadState('networkidle');

    await page.waitForTimeout(2500);

  }

  //-----------------------------------------
  // PRODUCT GALLERY
  //-----------------------------------------

  const gallery = page.locator('[data-product-gallery] img');

  const galleryCount = await gallery.count();

  if (galleryCount > 1) {

    for (let i = 0; i < Math.min(galleryCount, 4); i++) {

      await gallery.nth(i).hover();

      await page.waitForTimeout(600);

      await gallery.nth(i).click();

      await page.waitForTimeout(1500);

    }

  }

  //-----------------------------------------
  // PRODUCT DESCRIPTION
  //-----------------------------------------

  await page.mouse.wheel(0, 350);

  await page.waitForTimeout(1500);

  await page.mouse.wheel(0, 350);

  await page.waitForTimeout(1500);

  await page.mouse.wheel(0, -700);

  await page.waitForTimeout(1500);

  //-----------------------------------------
  // QUANTITY
  //-----------------------------------------

  const plus = page.locator('[data-qty-plus]').first();

  if (await plus.isVisible().catch(() => false)) {

    await plus.click();

    await page.waitForTimeout(1000);

    await plus.click();

    await page.waitForTimeout(1000);

  }

  const minus = page.locator('[data-qty-minus]').first();

  if (await minus.isVisible().catch(() => false)) {

    await minus.click();

    await page.waitForTimeout(1000);

  }

  //-----------------------------------------
  // WISHLIST
  //-----------------------------------------

  const wishlist = page.locator('[data-add-wishlist]').first();

  if (await wishlist.isVisible().catch(() => false)) {

    await wishlist.hover();

    await page.waitForTimeout(600);

    await wishlist.click();

    await page.waitForTimeout(1800);

  }

  //-----------------------------------------
  // ADD CART
  //-----------------------------------------

  const addCart = page.locator('[data-add-cart]').first();

  if (await addCart.isVisible().catch(() => false)) {

    await addCart.hover();

    await page.waitForTimeout(600);

    await addCart.click();

    await page.waitForTimeout(2500);

  }

  //-----------------------------------------
  // MINI CART
  //-----------------------------------------

  const miniCart = page.locator('[data-cart-toggle]').first();

  if (await miniCart.isVisible().catch(() => false)) {

    await miniCart.hover();

    await page.waitForTimeout(500);

    await miniCart.click();

    await page.waitForTimeout(2500);

  }

  //-----------------------------------------
  // GO TO CART
  //-----------------------------------------

  await page.goto('/cart');

  await page.waitForLoadState('networkidle');

  await page.waitForTimeout(2500);

  //-----------------------------------------
  // CART SCROLL
  //-----------------------------------------

  await page.mouse.wheel(0, 350);

  await page.waitForTimeout(1200);

  await page.mouse.wheel(0, -350);

  await page.waitForTimeout(1200);

  //-----------------------------------------
  // CART QUANTITY
  //-----------------------------------------

  const cartPlus = page.locator('[data-cart-plus]').first();

  if (await cartPlus.isVisible().catch(() => false)) {

    await cartPlus.click();

    await page.waitForTimeout(1000);

    await cartPlus.click();

    await page.waitForTimeout(1000);

  }

  const cartMinus = page.locator('[data-cart-minus]').first();

  if (await cartMinus.isVisible().catch(() => false)) {

    await cartMinus.click();

    await page.waitForTimeout(1200);

  }

  //-----------------------------------------
  // PART 4 STARTS HERE
  //-----------------------------------------
    //-----------------------------------------
  // CHECKOUT
  //-----------------------------------------

  await page.goto('/checkout');

  await page.waitForLoadState('networkidle');

  await page.waitForTimeout(2500);

  //-----------------------------------------
  // CUSTOMER INFORMATION
  //-----------------------------------------

  const firstName = page.locator('input[name="firstName"]').first();

  if (await firstName.isVisible().catch(() => false)) {

    await firstName.fill('John');
    await page.waitForTimeout(500);

    await page.locator('input[name="lastName"]').fill('Doe');
    await page.waitForTimeout(500);

    await page.locator('input[name="email"]').fill('john@example.com');
    await page.waitForTimeout(500);

    await page.locator('input[name="phone"]').fill('0123456789');
    await page.waitForTimeout(500);

  }

  //-----------------------------------------
  // ADDRESS
  //-----------------------------------------

  const address = page.locator('textarea').first();

  if (await address.isVisible().catch(() => false)) {

    await address.fill('123 Demo Street');
    await page.waitForTimeout(1200);

  }

  //-----------------------------------------
  // ORDER SUMMARY
  //-----------------------------------------

  await page.mouse.wheel(0,400);

  await page.waitForTimeout(1500);

  await page.mouse.wheel(0,400);

  await page.waitForTimeout(1500);

  await page.mouse.wheel(0,-800);

  await page.waitForTimeout(1500);

  //-----------------------------------------
  // PAYMENT
  //-----------------------------------------

  const payment = page.locator('[type="radio"]').first();

  if(await payment.isVisible().catch(()=>false)){

      await payment.check().catch(()=>{});

      await page.waitForTimeout(1500);

  }

  //-----------------------------------------
  // BACK HOME
  //-----------------------------------------

  await page.goto('/');

  await page.waitForLoadState('networkidle');

  await page.waitForTimeout(2000);

  //-----------------------------------------
  // FINAL SCROLL
  //-----------------------------------------

  await page.mouse.wheel(0,500);

  await page.waitForTimeout(1200);

  await page.mouse.wheel(0,-500);

  await page.waitForTimeout(1200);

  //-----------------------------------------
  // LOGO PAUSE
  //-----------------------------------------

  await page.mouse.move(960,250);

  await page.waitForTimeout(4000);

});