// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  'dragAndDrop',
  (currentPosition, nextPosition, passTurn = true) => {
    Cypress.log({
      name: 'drag-drop',
      message: `Dragging element from square ${currentPosition} to ${nextPosition}`,
      consoleProps: () => ({
        currentPosition,
        nextPosition
      })
    });

    const subject = `div[data-rbd-droppable-id="square-${currentPosition}"] > div`;
    const target = `div[data-rbd-droppable-id="square-${nextPosition}"]`;

    const SLOPPY_CLICK_THRESHOLD = 2;
    cy.get(target)
      .first()
      .then($target => {
        let coordsDrop = $target[0].getBoundingClientRect();
        cy.get(subject)
          .first()
          .then(subject => {
            const coordsDrag = subject[0].getBoundingClientRect();
            cy.wrap(subject)
              .trigger('mousemove', {
                button: 0,
                clientX: coordsDrag.x,
                clientY: coordsDrag.y
              })
              .trigger('mousedown', { force: true, button: 0 });

            cy.wrap(subject).trigger('mousemove', {
              button: 0,
              clientX: coordsDrag.x,
              clientY: coordsDrag.y
            });

            cy.get(target)
              .trigger('mousemove', {
                button: 0,
                clientX: coordsDrop.x + SLOPPY_CLICK_THRESHOLD,
                clientY: coordsDrop.y + SLOPPY_CLICK_THRESHOLD
              })
              .wait(500)
              .trigger('mouseup');

            cy.wait(450);
          });
      });

    if (passTurn) {
      Cypress.log({
        name: 'pass-turn',
        message: 'Passing Turn'
      });

      cy.get('#root').trigger('keydown', {
        code: 'Space',
        force: true
      });

      cy.wait(350);
    }
  }
);

Cypress.Commands.add('getDisc', position =>
  cy.get(
    `div[data-rbd-droppable-id="square-${position}"] > div[aria-label="Disc"]`
  )
);
