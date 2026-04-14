import { test, expect } from '@playwright/test';

test('flujo de compra en ecommerce', async ({ page }) => {

  // Login
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Validar que entró
  await expect(page.locator('.title')).toHaveText('Products');

  // Agregar producto
  await page.click('.inventory_item button');

  // Ir al carrito
  await page.click('.shopping_cart_link');

  // Validar producto en carrito
  await expect(page.locator('.cart_item')).toBeVisible();

  // Ir al checkout
  await page.click('#checkout');

  // Validar que está en checkout
  await expect(page.locator('.title')).toHaveText('Checkout: Your Information');

});