describe('Movement', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('can move a disc', () => {
    cy.dragAndDrop(
      'div[data-rbd-draggable-id="player-1/disc-44"]',
      'div[data-rbd-droppable-id="square-37"]'
    );
  });
});
