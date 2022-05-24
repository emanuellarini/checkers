describe('Create Game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('fails to create if does not provide the required fields', () => {
    cy.get('button[type="submit"]').click();
    cy.get('p[id="player1.name-helper-text"]').contains(
      'This field is required'
    );
    cy.get('p[id="player2.name-helper-text"]').contains(
      'This field is required'
    );
    cy.get('p[id="player1.email-helper-text"]').contains(
      'This field is required'
    );
    cy.get('p[id="player2.email-helper-text"]').contains(
      'This field is required'
    );
  });

  it('can create a game and see it', () => {
    cy.createGame();
    cy.get('h5').contains('test');
    cy.get('h2').contains('Player 1 Turn');
  });
});
