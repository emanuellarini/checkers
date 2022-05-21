describe('Turn', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('can pass turn by clicking button after a move', () => {
    cy.get('header').contains('Checkers Game - Player 1 Turn');
    cy.get('Pass Turn').should('not.exist');

    cy.dragAndDrop('44', '37');

    cy.get('button[aria-label="Pass Turn"]').click();

    cy.get('header').contains('Checkers Game - Player 2 Turn');
  });

  it('can pass turn by pressing spacebar', () => {
    cy.get('header').contains('Checkers Game - Player 1 Turn');

    cy.dragAndDrop('44', '37');

    cy.get('body').trigger('keydown', {
      code: 'Space',
      force: true
    });

    cy.get('header').contains('Checkers Game - Player 2 Turn');
  });
});
