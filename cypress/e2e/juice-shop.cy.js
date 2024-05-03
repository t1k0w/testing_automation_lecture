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

    it("Validate product card amount", () => {
      HomePage.visit();
      HomePage.validateProductCardAmount('12');
      HomePage.selectDropdownOption('24')
      HomePage.validateProductCardAmount('24');
      HomePage.selectDropdownOption('36')
      HomePage.validateProductCardAmount('36');
    });


    it("Buy Girlie T-shirt", () => {
      HomePage.visit();
      HomePage.clickSearchIcon();
      HomePage.searchForProduct("Girlie");
      HomePage.addToTheBasket();
      HomePage.goToBasketPage();
      HomePage.checkoutButton();
      HomePage.adressSubmition();
      HomePage.continueButtonToPayment();
      HomePage.selectDeliveryMethod('Standard Delivery');
      HomePage.continueButtonToDelivery();
      HomePage.clickCardAndRadio();
      HomePage.continueButtonToReview();
      HomePage.continueButtonToFinishPayment();
      HomePage.validateConfirmationOfOrder();
    });

    it("Add address", () => {
      HomePage.visit();
      HomePage.clickAccountButton();
      HomePage.goToPrivacyAddressSetings();
      HomePage.clickAddNewAddressButton();
      HomePage.clickAddNewAddress('CountryName', 'John Doe', '1234567890', '12345', '123 Main St', 'CityName', 'StateName');
      HomePage.submitReview();
    });


    it.only("Add payment option", () => {
      HomePage.visit();
      HomePage.clickAccountButton();
      HomePage.goToPrivacyPaymentsSetings();
      HomePage.clickAddNewCard();
      cy.get("#mat-input-29").should("be.visible").click().type("John Doe");

      

    });
    
  });
    
    // Fill in Name
    // Fill in Card Number
    // Set expiry month to 7
    // Set expiry year to 2090
    // Click Submit button
    // Validate that the card shows up in the list
});
