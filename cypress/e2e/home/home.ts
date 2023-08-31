import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("I visit home page", () => {
  cy.visit('/')
});

Then("Title should {string}, Home link should {string}, Admin link should {string}" , (title,homeLink,adminLink) => {
  cy.title().should('eq', title)
  cy.get('header .main-menu a.home')
    .invoke('attr', 'href')
    .should('eq', homeLink);
  cy.get('header .main-menu a.admin')
    .invoke('attr', 'href')
    .should('eq', adminLink);
});
When("click Home link", () => {
  cy.get('header .main-menu a.home').click({ force: true });
});

Then("Home click result : Title should {string}, Home link should {string}, Admin link should {string}", (title, homeLink, adminLink) => {
  cy.title().should('eq', title)
  cy.get('header .main-menu a.home')
    .invoke('attr', 'href')
    .should('eq', homeLink);
  cy.get('header .main-menu a.admin')
    .invoke('attr', 'href')
    .should('eq', adminLink);
});
When("click Admin link", () => {
  cy.get('header .main-menu a.admin').click({ force: true });
});

Then("Url should contain {string}", (adminLink) => {
  cy.url()
    .should('contain', adminLink);
});

