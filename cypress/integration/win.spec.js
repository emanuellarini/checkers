describe('Win', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('can win by capturing all other player discs', () => {
    cy.dragAndDrop('44', '37');
    cy.dragAndDrop('19', '28');
    cy.dragAndDrop('51', '44');
    cy.dragAndDrop('21', '30');
    cy.dragAndDrop('46', '39');
    cy.dragAndDrop('14', '21');
    cy.dragAndDrop('42', '33');
    cy.dragAndDrop('5', '14');
    cy.dragAndDrop('37', '19', false);
    cy.dragAndDrop('19', '5');
    cy.dragAndDrop('3', '12');
    cy.dragAndDrop('33', '26');
    cy.dragAndDrop('21', '28');
    cy.dragAndDrop('5', '19', false);
    cy.dragAndDrop('19', '37');
    cy.dragAndDrop('10', '19');
    cy.dragAndDrop('26', '12');
    cy.dragAndDrop('17', '26');
    cy.dragAndDrop('40', '33');
    cy.dragAndDrop('8', '17');
    cy.dragAndDrop('33', '19');
    cy.dragAndDrop('1', '10');
    cy.dragAndDrop('19', '1');
    cy.dragAndDrop('14', '21');
    cy.dragAndDrop('1', '10');
    cy.dragAndDrop('7', '14');
    cy.dragAndDrop('10', '24');
    cy.dragAndDrop('21', '28');
    cy.dragAndDrop('37', '19');
    cy.dragAndDrop('30', '37');
    cy.dragAndDrop('44', '30');
    cy.dragAndDrop('23', '37');
    cy.dragAndDrop('55', '46');
    cy.dragAndDrop('14', '21');
    cy.dragAndDrop('46', '28', false);
    cy.dragAndDrop('28', '14', false);
    cy.get('[aria-label="Wins"]').contains('1');
    cy.get('[aria-label="Discs"]').contains('12');
    cy.get('button[aria-label="Restart Game"]').click();
    cy.wait(500);
    cy.get('[aria-label="Discs"]').contains('0');
  });
});
