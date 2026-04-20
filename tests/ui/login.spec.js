import { test, expect } from '@playwright/test'
import LoginPage from '../../pages/LoginPage.js'

test('login exitoso', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.navigate()

  const user = 'standard_user'
  const password = 'secret_sauce'

  await loginPage.login(user, password)

  // Esperar a que cargue la página de inventario con timeout corto
  await expect(page).toHaveURL(/inventory.html/, { timeout: 5000 })
  await page.locator('.title').waitFor({ state: 'visible', timeout: 5000 })
})

test('login fallido', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.navigate()

  const user = 'usuario_invalido'
  const password = 'wrongpass'

  await loginPage.login(user, password)

  // Esperar a que aparezca el error
  await expect(loginPage.getErrorMessage()).toBeVisible({ timeout: 5000 })
})