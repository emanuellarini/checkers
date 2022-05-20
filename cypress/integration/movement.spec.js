describe('Movement', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('can move a disc', () => {
    cy.dragAndDrop(
      'div[data-rbd-draggable-id="player-1/disc-2"]',
      'div[data-rbd-droppable-id="square-37"]'
    );
    cy.get('div[data-rbd-droppable-id="square-37"]').find(
      'div[data-rbd-draggable-id="player-1/disc-2"]'
    );
  });

  it('can capture a disc', () => {
    cy.dragAndDrop(
      'div[data-rbd-draggable-id="player-1/disc-2"]',
      'div[data-rbd-droppable-id="square-37"]'
    );
    cy.get('div[data-rbd-droppable-id="square-37"]').find(
      'div[data-rbd-draggable-id="player-1/disc-2"]'
    );

    cy.dragAndDrop(
      'div[data-rbd-draggable-id="player-2/disc-11"]',
      'div[data-rbd-droppable-id="square-30"]'
    );
    cy.get('div[data-rbd-droppable-id="square-30"]').find(
      'div[data-rbd-draggable-id="player-2/disc-11"]'
    );

    cy.dragAndDrop(
      'div[data-rbd-draggable-id="player-1/disc-2"]',
      'div[data-rbd-droppable-id="square-23"]'
    );
    cy.get('div[data-rbd-droppable-id="square-23"]').find(
      'div[data-rbd-draggable-id="player-1/disc-2"]'
    );

    // captured
    cy.get('div[data-rbd-draggable-id="player-2/disc-11"]').should('not.exist');
  });
});
