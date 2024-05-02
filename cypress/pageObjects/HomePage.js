
import { BasePage } from "../pageObjects/basePage";

export class HomePage extends BasePage {
  static get url() {
    return "/#/";
  }

  static get dismissButton() {
    return cy.get("[aria-label='Close Welcome Banner']");
  }

  static get meWantItButton() {
    return cy.get("[aria-label='dismiss cookie message']");
  }

  static loginPage(email, password) {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.contains('button[type="submit"]', 'Log in').click();
  }

  static clickAccountButton() {
    cy.contains('button', 'Account').click();
  }

  static clickLoginMenu() {
    cy.contains('.mat-menu-content', 'Login').click();
  }

  static login(email, password) {
    cy.get('[aria-label="Email address field"]').type(email);
    cy.get('[aria-label="Field for the password"]').type(password); 
    cy.get('[aria-label="Field to confirm the password"]').type(password);  

  }
  static clickSecurityQuestionDropdown() {
    cy.get('[aria-label="Selection list for the security question"]').click();
  }

  static selectSecurityQuestion(question) {
    // Wait for options to be visible and select the desired question
    cy.contains('mat-option', question).click();
  }
  static fillSecurityAnswer(answer) {
    cy.get('#securityAnswerControl').type(answer);
  }

  static submitRegistration() {
    cy.get('#registerButton').should('not.be.disabled').click();
  }

  static goToUserProfile() {
    this.clickAccountButton();
    cy.get('button[aria-label="Go to user profile"]')
      .contains('span', 'demo')
      .should('be.visible')
      .click();
  }

  static clickNotYetACustomer(text) {
    cy.get('a').contains(text).click();
  }

  static clickSearchIcon() {
    cy.get('.mat-search_icon-search').click(); 
  }

  static searchForProduct(productName) {
    this.clickSearchIcon(); 
    cy.get('#mat-input-0').type(`${productName}{enter}`); 
  }

  static clickOnProductImage(productName) {
    cy.get(`img[alt="${productName}"]`).should('be.visible').click();
  }

  static validateProductDescription(productName, description) {
    cy.contains('.product-card', productName).within(() => {
        cy.get('.product-description').should('contain', description);
    });
  }
  static validateProductImage(productName, imageUrl) {
    cy.get(`img[alt="${productName}"]`)
        .should('have.attr', 'src', imageUrl)
        .and('be.visible');
  }
  static checkProductNameVisibility(productName) {
    cy.get('h1').contains(productName).should('be.visible');
  }

  static checkProductDescriptionVisibility(description) {
    cy.get('div').contains(description).should('be.visible');
  }

  static checkProductPriceVisibility(price) {
    cy.get('p.item-price').contains(price).should('be.visible');
  }
  static closeProductDetailsDialog() {
    cy.get('button[mat-dialog-close]').click();
  }

  static clickOnProductImage2(productName) {
    const escapedProductName = productName.replace(/"/g, '\\"');
    cy.get(`img[alt="${escapedProductName}"]`).click();
  }

  static openReviews() {
    cy.get('[aria-label="Expand for Reviews"]').click().should('be.visible');
  }

  static typeReview(reviewText) {
    cy.get('textarea[aria-label="Text field to review a product"]').click().wait(100).type(reviewText);
  }
  static submitReview() {
    cy.get('#submitButton', { timeout: 10000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  }

}