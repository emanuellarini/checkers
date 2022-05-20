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

Cypress.Commands.add('dragAndDrop', (subject, target, passTurn = false) => {
  Cypress.log({
    name: 'DRAGNDROP',
    message: `Dragging element ${subject} to ${target}`,
    consoleProps: () => {
      return {
        subject: subject,
        target: target
      };
    }
  });

  const SLOPPY_CLICK_THRESHOLD = 10;
  cy.get(target)
    .first()
    .then($target => {
      let coordsDrop = $target[0].getBoundingClientRect();
      cy.get(subject)
        .first()
        .then(subject => {
          const coordsDrag = subject[0].getBoundingClientRect();
          cy.wrap(subject)
            .trigger('mousedown', {
              button: 0,
              which: 1,
              clientX: coordsDrag.x,
              clientY: coordsDrag.y,
              force: true
            })
            .trigger('mousemove', {
              button: 0,
              clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
              clientY: coordsDrag.y,
              force: true
            });
          cy.wait(800);
          cy.get('body')
            .trigger('mousemove', {
              button: 0,
              clientX: coordsDrop.x,
              clientY: coordsDrop.y,
              force: true
            })
            .trigger('mouseup');
        });
    });

  cy.wait(800);

  if (passTurn) {
    cy.get('#root').trigger('keydown', {
      code: 'Space',
      force: true
    });
  }
});
