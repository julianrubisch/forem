describe('User Update Settings Profile', () => {
  beforeEach(() => {
    cy.testSetup();
    cy.fixture('users/articleEditorV1User.json').as('user');

    cy.get('@user').then((user) => {
      cy.loginAndVisit(user, '/settings/profile');
    });
  });

  it('should change Basic profile settings', () => {
    const websiteURL = 'https://example.com';
    const summary = 'This is my story...';
    const location = 'New York City';

    cy.findByLabelText(/^Website URL$/i).as('url');
    cy.get('@url').clear();
    cy.get('@url').type(websiteURL);
    cy.findByLabelText(/^Bio$/i).as('bio');
    cy.get('@bio').clear();
    cy.get('@bio').type(summary);
    cy.findByLabelText(/^Location$/i).as('location');
    cy.get('@location').clear();
    cy.get('@location').type(location);

    cy.findByText(/^Save Profile Information$/i).click();

    const { baseUrl } = Cypress.config();
    cy.url().should('equal', `${baseUrl}settings`);

    cy.findByText('Your profile has been updated').should('be.visible');

    cy.findByRole('textbox', { name: 'Website URL' }).should(
      'have.value',
      websiteURL,
    );
    cy.findByRole('textbox', { name: 'Bio' }).should('have.value', summary);
    cy.findByRole('textbox', { name: 'Location' }).should(
      'have.value',
      location,
    );
  });
});
