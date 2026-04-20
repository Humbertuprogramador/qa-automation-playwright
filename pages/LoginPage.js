class LoginPage {
  constructor(page) {
    this.page = page

    // Selectores
    this.usernameInput = '#user-name'
    this.passwordInput = '#password'
    this.loginButton = '#login-button'

    // Validaciones
    this.welcomeText = '.inventory'
    this.errorMessage = '[data-test="error"]'
  }

  // Navegar a login
  async navigate() {
    await this.page.goto('https://www.saucedemo.com/')
    await this.page.waitForLoadState('networkidle')
    await this.page.locator(this.usernameInput).waitFor({ state: 'visible' })
  }

  // Completar usuario
  async enterUsername(username) {
    const input = this.page.locator(this.usernameInput)
    await input.waitFor({ state: 'visible' })
    await input.fill(username)
  }

  // Completar password
  async enterPassword(password) {
    const input = this.page.locator(this.passwordInput)
    await input.waitFor({ state: 'visible' })
    await input.fill(password)
  }

  // Click en login
  async clickLogin() {
    const button = this.page.locator(this.loginButton)
    await button.waitFor({ state: 'visible' })
    await button.click()
    await this.page.waitForLoadState('networkidle')
  }

  // Flujo completo de login
  async login(username, password) {
    await this.enterUsername(username)
    await this.enterPassword(password)
    await this.clickLogin()
  }

  // 👇 ELEMENTOS PARA ASSERTIONS (clave)
  getWelcomeText() {
    return this.page.locator(this.welcomeText)
  }

  getErrorMessage() {
    return this.page.locator(this.errorMessage)
  }
}

export default LoginPage