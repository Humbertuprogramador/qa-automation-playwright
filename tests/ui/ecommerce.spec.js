import { test, expect } from '@playwright/test'
import LoginPage from '../../pages/LoginPage.js'
import EcommercePage from '../../pages/EcommercePage.js'

test('flujo de compra en ecommerce', async ({ page }) => {
  // Login
  const loginPage = new LoginPage(page)
  await loginPage.navigate()
  await loginPage.login('standard_user', 'secret_sauce')
  
  // Esperar a que cargue inventory
  const ecommercePage = new EcommercePage(page)
  await ecommercePage.waitForProductsPage()
  
  // Validar título de productos
  await expect(ecommercePage.getTitle()).toHaveText('Products')

  // Agregar producto al carrito
  await ecommercePage.addProductToCart(0)

  // Ir al carrito
  await ecommercePage.goToCart()

  // Validar que el producto está en carrito
  const productInCart = await ecommercePage.verifyProductInCart()
  expect(productInCart).toBeTruthy()

  // Proceder a checkout
  await ecommercePage.proceedToCheckout()

  // Completar información de checkout
  await ecommercePage.fillCheckoutInfo('Juan', 'Pérez', '28001')

  // Continuar
  await ecommercePage.continueCheckout()

  // Validar resumen de orden
  await expect(page.locator('.title')).toHaveText('Checkout: Overview')

  // Finalizar compra
  await ecommercePage.finishOrder()

  // Validar orden completada
  await expect(page.locator('.title')).toHaveText('Checkout: Complete!')
})