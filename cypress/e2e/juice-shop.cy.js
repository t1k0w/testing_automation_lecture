import { HomePage } from "../pageObjects/HomePage";

describe("Juice-shop scenarios", () => {
  context("Without auto login", () => {
    beforeEach(() => {
      HomePage.visit();
      HomePage.dismissButton.click();
      HomePage.meWantItButton.click();
    });

    it("Login", () => {
      HomePage.visit();
      HomePage.clickAccountButton();
      HomePage.clickLoginMenu();
      HomePage.loginPage('demo', 'demo');
      HomePage.goToUserProfile();

    });

    it("Registration", () => {
      HomePage.visit();
      HomePage.meWantItButton.click();
      HomePage.clickAccountButton();
      HomePage.clickLoginMenu();
      cy.get('a').contains('Not yet a customer?').click();
      HomePage.login("demo@demo.com","demo123");
      // cy.get('[aria-label="Selection list for the security question"]').click();
      HomePage.clickSecurityQuestionDropdown();
      HomePage.selectSecurityQuestion('Name of your favorite pet?');
      // Select a security question
      //cy.contains('mat-option', 'Name of your favorite pet?').click();
      //cy.get('input[name="securityAnswer"]').type('Fluffy');

      // Submit the registration form
      //cy.get('button').contains('Register').click();
      HomePage.fillSecurityAnswer('Fluffy');
      HomePage.submitRegistration();
    });
  });

  context("With auto login", () => {
    beforeEach(() => {
      cy.login("demo", "demo");
    });

    it("Search and validate Lemon", () => {
      HomePage.visit();
      HomePage.clickSearchIcon();
      HomePage.searchForProduct("Lemon");
      HomePage.clickOnProductImage("Lemon Juice (500ml)");
      //HomePage.validateProductDescription("Lemon Juice (500ml)", "Sour but full of vitamins.");
      HomePage.checkProductNameVisibility('Lemon Juice (500ml)');
      HomePage.checkProductDescriptionVisibility('Sour but full of vitamins.');
      HomePage.visit();

    });

    it("Search 500ml and validate Lemon", () => {
      HomePage.clickSearchIcon();
      HomePage.searchForProduct("500ml");
      HomePage.clickOnProductImage("Lemon Juice (500ml)");
      HomePage.checkProductNameVisibility('Lemon Juice (500ml)');
      HomePage.checkProductDescriptionVisibility('Sour but full of vitamins.');
      HomePage.visit();
    });


    it("Search 500ml and validate cards", () => {
      HomePage.clickSearchIcon();
      HomePage.searchForProduct("500ml");
      HomePage.clickOnProductImage("Eggfruit Juice (500ml)");
      HomePage.checkProductDescriptionVisibility('Now with even more exotic flavour.');
      HomePage.closeProductDetailsDialog();
      HomePage.clickOnProductImage("Lemon Juice (500ml)");
      HomePage.checkProductDescriptionVisibility('Sour but full of vitamins.');
      HomePage.closeProductDetailsDialog();
      HomePage.clickOnProductImage("Strawberry Juice (500ml)");
      HomePage.checkProductDescriptionVisibility('Sweet & tasty!');
      HomePage.visit();
    });

    it("Read a review", () => {
      HomePage.clickSearchIcon();
      HomePage.searchForProduct("King");
      HomePage.clickOnProductImage2('OWASP Juice Shop "King of the Hill" Facemask');
      HomePage.openReviews();
      HomePage.visit();
    });

    it("Add a review", () => {
      HomePage.clickSearchIcon();
      HomePage.searchForProduct("Raspberry");
      HomePage.clickOnProductImage2('Raspberry Juice (1000ml)');
      HomePage.openReviews();
      HomePage.typeReview("Tastes like metal");
      HomePage.openReviews();
      HomePage.submitReview();
      HomePage.visit();
      
    });

    it.only("Validate product card amount", () => {
      HomePage.visit();
      
    });
  });


    // Create scenario - Validate product card amount
    // Validate that the default amount of cards is 12
    // Change items per page (at the bottom of page) to 24
    // Validate that the amount of cards is 24
    // Change items per page (at the bottom of page) to 36
    // Validate that the amount of cards is 35

    // Create scenario - Buy Girlie T-shirt
    // Click on search icon
    // Search for Girlie
    // Add to basket "Girlie"
    // Click on "Your Basket" button
    // Create page object - BasketPage
    // Click on "Checkout" button
    // Create page object - SelectAddressPage
    // Select address containing "United Fakedom"
    // Click Continue button
    // Create page object - DeliveryMethodPage
    // Select delivery speed Standard Delivery
    // Click Continue button
    // Create page object - PaymentOptionsPage
    // Select card that ends with "5678"
    // Click Continue button
    // Create page object - OrderSummaryPage
    // Click on "Place your order and pay"
    // Create page object - OrderCompletionPage
    // Validate confirmation - "Thank you for your purchase!"

    // Create scenario - Add address
    // Click on Account
    // Click on Orders & Payment
    // Click on My saved addresses
    // Create page object - SavedAddressesPage
    // Click on Add New Address
    // Create page object - CreateAddressPage
    // Fill in the necessary information
    // Click Submit button
    // Validate that previously added address is visible

    // Create scenario - Add payment option
    // Click on Account
    // Click on Orders & Payment
    // Click on My payment options
    // Create page object - SavedPaymentMethodsPage
    // Click Add new card
    // Fill in Name
    // Fill in Card Number
    // Set expiry month to 7
    // Set expiry year to 2090
    // Click Submit button
    // Validate that the card shows up in the list
});
