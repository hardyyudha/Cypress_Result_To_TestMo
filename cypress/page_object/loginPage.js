// Use console.log to each function to log the step
class LoginPage {
  inputUsername(username) {
    console.log(`User input username: ${username}`);
    cy.get('[data-test="username"]', { timeout: 3000 }).type(username);
  }
  inputPassword(password) {
    console.log(`User input password: ${password}`);
    cy.get('[data-test="password"]', { timeout: 3000 }).type(password);
  }
  loginSubmit() {
    console.log("User click login button");
    cy.get('[data-test="login-button"]', { timeout: 3000 }).click();
  }
  loginAssertion(assertion) {
    console.log(`User should see: ${assertion}`);
    cy.contains(assertion, { timeout: 3000 }).should("be.visible");
  }
}

export default LoginPage;
