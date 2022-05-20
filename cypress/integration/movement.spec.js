describe('Movement', () => {
  beforeEach(() => {
    cy.viewport(1440, 1054);
    cy.visit('http://localhost:3000');
  });

  it('can move and capture a disc in all diagonals', () => {
    cy.dragAndDrop(
      'div[data-rbd-draggable-id="player-1/disc-2"]',
      'div[data-rbd-droppable-id="square-37"]',
      true
    );
    cy.get('div[data-rbd-droppable-id="square-37"]').find(
      'div[data-rbd-draggable-id="player-1/disc-2"]'
    );

    cy.dragAndDrop(
      'div[data-rbd-draggable-id="player-2/disc-9"]',
      'div[data-rbd-droppable-id="square-28"]',
      true
    );
    cy.get('div[data-rbd-droppable-id="square-28"]').find(
      'div[data-rbd-draggable-id="player-2/disc-9"]'
    );

    cy.dragAndDrop(
      'div[data-rbd-draggable-id="player-1/disc-2"]',
      'div[data-rbd-droppable-id="square-19"]',
      true
    );
    cy.get('div[data-rbd-droppable-id="square-19"]').find(
      'div[data-rbd-draggable-id="player-1/disc-2"]'
    );
    // upper left captured
    cy.get('div[data-rbd-draggable-id="player-2/disc-9"]').should('not.exist');

    cy.dragAndDrop(
      'div[data-rbd-draggable-id="player-2/disc-5"]',
      'div[data-rbd-droppable-id="square-28"]',
      true
    );
    cy.get('div[data-rbd-droppable-id="square-28"]').find(
      'div[data-rbd-draggable-id="player-2/disc-5"]'
    );
    // down right captured
    cy.get('div[data-rbd-draggable-id="player-1/disc-2"]').should('not.exist');

    cy.dragAndDrop(
      'div[data-rbd-draggable-id="player-1/disc-1"]',
      'div[data-rbd-droppable-id="square-35"]',
      true
    );
    cy.get('div[data-rbd-droppable-id="square-35"]').find(
      'div[data-rbd-draggable-id="player-1/disc-1"]'
    );

    cy.dragAndDrop(
      'div[data-rbd-draggable-id="player-2/disc-5"]',
      'div[data-rbd-droppable-id="square-42"]',
      true
    );
    cy.get('div[data-rbd-droppable-id="square-42"]').find(
      'div[data-rbd-draggable-id="player-2/disc-5"]'
    );
    // down left captured
    cy.get('div[data-rbd-draggable-id="player-1/disc-1"]').should('not.exist');

    cy.dragAndDrop(
      'div[data-rbd-draggable-id="player-1/disc-4"]',
      'div[data-rbd-droppable-id="square-35"]',
      true
    );
    cy.get('div[data-rbd-droppable-id="square-35"]').find(
      'div[data-rbd-draggable-id="player-1/disc-4"]'
    );
    // upper right captured
    cy.get('div[data-rbd-draggable-id="player-2/disc-5"]').should('not.exist');
  });
});
