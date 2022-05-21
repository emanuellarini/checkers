describe('Movement', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('can move and capture a disc in all diagonals', () => {
    // player 1 can move to upper right diagonal
    cy.dragAndDrop('44', '37', true);

    // // player 2 can move to lower right diagonal
    cy.dragAndDrop('19', '28', true);

    // player 1 can capture player 2 disc in upper left diagonal
    cy.dragAndDrop('37', '19', true);
    cy.getDisc('28').should('not.exist');

    // player 2 can capture player 1 disc in down right diagonal
    cy.dragAndDrop('10', '28', true);
    cy.getDisc('19').should('not.exist');

    // player 1 can move to upper right diagonal
    cy.dragAndDrop('42', '35', true);

    // player 2 can capture player 1 disc in down left diagonal
    cy.dragAndDrop('28', '42', true);
    cy.getDisc('35').should('not.exist');

    // player 1 can capture player 2 disc in upper right diagonal
    cy.dragAndDrop('49', '35', true);
    cy.getDisc('42').should('not.exist');
  });

  it('can make multi captures', () => {
    cy.dragAndDrop('44', '37', true);
    cy.dragAndDrop('19', '28', true);
    cy.dragAndDrop('51', '44', true);
    cy.dragAndDrop('21', '30', true);
    cy.dragAndDrop('46', '39', true);
    cy.dragAndDrop('14', '21', true);
    cy.dragAndDrop('42', '33', true);
    cy.dragAndDrop('5', '14', true);

    // multi capture!
    cy.dragAndDrop('37', '19');
    cy.getDisc('28').should('not.exist');
    cy.dragAndDrop('19', '5', true);
    cy.getDisc('12').should('not.exist');
  });
});
