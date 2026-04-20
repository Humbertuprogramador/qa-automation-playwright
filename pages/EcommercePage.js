class EcommercePage {
  constructor(page) {
    this.page = page

    // Selectores de inventario
    this.productTitle = '.title'
    this.addToCartButton = '.inventory_item button'
    this.shoppingCartLink = '.shopping_cart_link'
    this.cartItem = '.cart_item'
    this.checkoutButton = '#checkout'
    this.continueButton = '#continue'
    this.finishButton = '#finish'

    // Selectores de checkout
    this.firstNameInput = '#first-name'
    this.lastNameInput = '#last-name'
    this.postalCodeInput = '#postal-code'
  }

  // Navegar a inventory
  async navigateToInventory() {
    await this.page.goto('https://www.saucedemo.com/inventory.html')
    await this.page.waitForLoadState('networkidle')
  }

  // Esperar a que se cargue la página de productos
  async waitForProductsPage() {
    await this.page.waitForURL(/inventory.html/)
    await this.page.locator(this.productTitle).waitFor({ state: 'visible' })
  }

  // Agregar producto al carrito
  async addProductToCart(index = 0) {
    const buttons = await this.page.locator(this.addToCartButton).all()
    await buttons[index].click()
    await this.page.waitForTimeout(500) // Pequeña espera para animación
  }

  // Ir al carrito
  async goToCart() {
    await this.page.click(this.shoppingCartLink)
    await this.page.waitForURL(/cart.html/)
  }

  // Validar que hay productos en carrito
  async verifyProductInCart() {
    return await this.page.locator(this.cartItem).isVisible()
  }

  // Ir a checkout
  async proceedToCheckout() {
    await this.page.click(this.checkoutButton)
    await this.page.waitForURL(/checkout-step-one.html/)
  }

  // Completar información de checkout
  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.page.fill(this.firstNameInput, firstName)
    await this.page.fill(this.lastNameInput, lastName)
    await this.page.fill(this.postalCodeInput, postalCode)
  }

  // Continuar en checkout
  async continueCheckout() {
    await this.page.click(this.continueButton)
    await this.page.waitForURL(/checkout-step-two.html/)
  }

  // Finalizar compra
  async finishOrder() {
    await this.page.click(this.finishButton)
    await this.page.waitForURL(/checkout-complete.html/)
  }

  // Obtener título de página
  getTitle() {
    return this.page.locator(this.productTitle)
  }
}

export default EcommercePage
