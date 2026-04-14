import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';


// Test 1 - Login correcto usando Page Object
test('login en saucedemo', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page.locator('.inventory_list')).toBeVisible();

});


// Test 2 - Login incorrecto (lo dejamos normal por ahora)
test('login incorrecto muestra error', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  await page.fill('#user-name', 'usuario_falso');
  await page.fill('#password', '123456');

  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toBeVisible();

});