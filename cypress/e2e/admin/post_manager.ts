import { Given,When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("Start to post page", () => {
  cy.visit('/admin')
});
When("click create button", () => {
  cy.get('.create-btn').click();
});
Then("Visit create page. Url should contain {string}", (link) => {
  cy.url()
    .should('contain', link);
});
Given("create page", () => {
  cy.visit('/admin/create')
});
When("User enter Title {string}.user will recieve a message {string}", (title: string, message: string) => {
  cy.get('#title').type(title);
  cy.get('#title').siblings('.error-message').contains(message);
});
When("User click on Submit button", () => {
  cy.get('button[type="submit"]').click();
});
Then("user will stay on create page {string}", (url) => {
  cy.url()
    .should('contain', url);
});



Given("user enter to create page", () => {
  cy.wait(1000);
  cy.visit('/admin/create')
});
When("user creates a post with following data", (dataTable:any) => {
  dataTable.hashes().forEach((row:any) => {
    cy.get('#title').type(row.Title);
    cy.wait(500);
    cy.get('#summary').type(row.Summary);
    cy.get('#insertDate').type(row.InsertDate);
    cy.get('#content').type(row.Content);
    cy.get('#imageFile').selectFile(row.ImageFile);
    if (row.Published=='True')
      cy.get('#published').check({ force: true });
    cy.wait(2000);
    cy.get('button[type="submit"]').click();
  });
});

Then("user can get all posts and filter with below data and get {string} record", (count: number, dataTable: any) => {
  cy.wait(3000);
  
  dataTable.hashes().forEach((row: any) => {
    cy.get('.search #search-text').clear().type(row.Title);
    cy.get('.search button').click();
    cy.wait(3000);
    let foundCount = 0;
        //// do task that you want to perform
      cy.get('table tbody tr')
        .each((tr, i) => {
          if (
            tr.find('td.title').text().indexOf(row.Title) > -1 &&
            tr.find('td.summary').text().indexOf(row.Summary) > -1 &&
            tr.find('td.insertDate').text().indexOf(row.InsertDate) > -1 &&
            tr.find('td.published').text().indexOf(row.Published == 'True' ? 'Yes' : 'No') > -1
          ) {
            foundCount++;
          }
        })
        .then(() => {
          expect(foundCount).to.equal(+count);
        });
   



  });
});

When("user edit post with new data by Title of {string}", (title: string, dataTable:any) => {
  cy.visit('/admin')
  cy.wait(1500);
  cy.get('.search #search-text').clear().type(title);
  cy.get('.search button').click();
  cy.wait(2000);
  cy.contains('table tbody tr td.title', title).siblings('td.edit').children('a').click();
  cy.wait(2000);
  dataTable.hashes().forEach((row:any) => {
    cy.get('#title').clear().type(row.Title);
    cy.wait(500);
    cy.get('#summary').clear().type(row.Summary);
    cy.get('#insertDate').clear().type(row.InsertDate);
    cy.get('#content').clear().type(row.Content);
    cy.get('#imageFile').selectFile(row.ImageFile);
    if (row.Published == 'True')
      cy.get('#published').check({ force: true });
    cy.wait(2000);
    cy.get('button[type="submit"]').click();
  });
});

When("user delete post with Title of {string}", (title: string,) => {
  cy.wait(1500);
  cy.get('.search #search-text').clear().type(title);
  cy.get('.search button').click();
  cy.wait(2000);
  cy.contains('table tbody tr td.title', title).siblings('td.delete').children('a').click();
  cy.wait(2000);
  cy.get('button[type="submit"]').click();
});





