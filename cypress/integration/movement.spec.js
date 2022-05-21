describe('Movement', () => {
  beforeEach(() => {
    cy.viewport(1440, 1054);
    cy.visit('http://localhost:3000');
  });

  it('can move and capture a disc in all diagonals', () => {
    // player 1 can move to upper right diagonal
    cy.dragAndDrop(
      'div[data-rbd-draggable-id="player-1/disc-2"]',
      'div[data-rbd-droppable-id="square-37"]',
      true
    );
    cy.get('div[data-rbd-droppable-id="square-37"]').find(
      'div[data-rbd-draggable-id="player-1/disc-2"]'
    );

    // player 2 can move to lower right diagonal
    cy.dragAndDrop(
      'div[data-rbd-draggable-id="player-2/disc-9"]',
      'div[data-rbd-droppable-id="square-28"]',
      true
    );
    cy.get('div[data-rbd-droppable-id="square-28"]').find(
      'div[data-rbd-draggable-id="player-2/disc-9"]'
    );

    // player 1 can capture player 2 disc in upper left diagonal
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

    // player 2 can capture player 1 disc in down right diagonal
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

    // player 1 can move to upper right diagonal
    cy.dragAndDrop(
      'div[data-rbd-draggable-id="player-1/disc-1"]',
      'div[data-rbd-droppable-id="square-35"]',
      true
    );
    cy.get('div[data-rbd-droppable-id="square-35"]').find(
      'div[data-rbd-draggable-id="player-1/disc-1"]'
    );

    // player 2 can capture player 1 disc in down right diagonal
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

    // player 1 can capture player 2 disc in upper right diagonal
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
