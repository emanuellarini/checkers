describe('Movement', () => {
  beforeEach(() => {
    cy.createGame();
  });

  it('can not move if not in first diagonals', () => {
    cy.dragAndDrop('44', '30', false);
    cy.getDisc('44').should('exist');
    cy.getDisc('30').should('not.exist');

    cy.dragAndDrop('44', '28', false);
    cy.getDisc('44').should('exist');
    cy.getDisc('28').should('not.exist');

    cy.dragAndDrop('44', '26', false);
    cy.getDisc('44').should('exist');
    cy.getDisc('26').should('not.exist');

    cy.dragAndDrop('46', '30', false);
    cy.getDisc('46').should('exist');
    cy.getDisc('30').should('not.exist');

    cy.dragAndDrop('40', '24', false);
    cy.getDisc('40').should('exist');
    cy.getDisc('24').should('not.exist');
  });

  it('can not move again if already moved', () => {
    cy.dragAndDrop('44', '37', false);
    cy.dragAndDrop('42', '35', false);
    cy.getDisc('42').should('exist');
    cy.getDisc('35').should('not.exist');
  });

  it('can move and capture a disc in all diagonals', () => {
    // player 1 can move to upper right diagonal
    cy.dragAndDrop('44', '37');

    // // player 2 can move to lower right diagonal
    cy.dragAndDrop('19', '28');

    // player 1 can capture player 2 disc in upper left diagonal
    cy.dragAndDrop('37', '19');
    cy.getDisc('28').should('not.exist');

    // player 2 can capture player 1 disc in down right diagonal
    cy.dragAndDrop('10', '28');
    cy.getDisc('19').should('not.exist');

    // player 1 can move to upper right diagonal
    cy.dragAndDrop('42', '35');

    // player 2 can capture player 1 disc in down left diagonal
    cy.dragAndDrop('28', '42');
    cy.getDisc('35').should('not.exist');

    // player 1 can capture player 2 disc in upper right diagonal
    cy.dragAndDrop('49', '35');
    cy.getDisc('42').should('not.exist');
  });

  it('can make multi captures, become a king and multi capture more', () => {
    cy.dragAndDrop('44', '37');
    cy.dragAndDrop('19', '28');
    cy.dragAndDrop('51', '44');
    cy.dragAndDrop('21', '30');
    cy.dragAndDrop('46', '39');
    cy.dragAndDrop('14', '21');
    cy.dragAndDrop('42', '33');
    cy.dragAndDrop('5', '14');

    // multi capture!
    cy.dragAndDrop('37', '19', false);
    cy.getDisc('28').should('not.exist');
    cy.dragAndDrop('19', '5');
    cy.getDisc('12').should('not.exist');

    // transformed into King!
    cy.getDisc('5').children('div').should('have.attr', 'aria-label', 'King');

    cy.dragAndDrop('3', '12');
    cy.dragAndDrop('33', '26');
    cy.dragAndDrop('21', '28');

    // king can go in any directions and make multi captures!
    cy.dragAndDrop('5', '19', false);
    cy.getDisc('12').should('not.exist');
    cy.dragAndDrop('19', '37');
    cy.getDisc('28').should('not.exist');
  });
});
