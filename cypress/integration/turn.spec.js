describe('Turn', () => {
  beforeEach(() => {
    cy.createGame();
  });

  it('can pass turn by clicking button after a move', () => {
    cy.get('header h2').contains('Player 1 Turn');
    cy.get('Pass Turn').should('not.exist');

    cy.dragAndDrop('44', '37', false);

    cy.get('button[aria-label="Pass Turn"]').click();

    cy.get('h2').contains('Player 2 Turn');
  });

  it('can pass turn by pressing spacebar', () => {
    cy.get('header h2').contains(/Player 1 Turn/i);

    cy.dragAndDrop('44', '37', false);

    cy.get('body').trigger('keydown', {
      code: 'Space',
      force: true
    });

    cy.wait(200);

    cy.get('header h2').contains(/Player 2 Turn/i);
  });
});
