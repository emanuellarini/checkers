describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Initial testing', () => {
    cy.get('header').contains('Learn React');
  });
});
