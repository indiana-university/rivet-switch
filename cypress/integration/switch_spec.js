const SWITCHABLE_BUTTON = '[data-switch="email-switch"]';
const SWITCH_ON = '#default-switch-on';
const SWITCH_OFF = '#default-switch-off';
const DEV_SERVER = 'http://localhost:3000';

describe('Rivet switch interactions', function() {
    beforeEach(function() {
        cy.visit(DEV_SERVER)
    })

    it('Click the default Rivet switch', function() {
        cy.get(SWITCHABLE_BUTTON)
            .click()
            .should('have.attr', 'aria-checked', 'true');

        cy.get(SWITCH_ON)
            .should('be.visible');
        
        cy.get(SWITCH_OFF)
            .should('be.hidden');

        cy.get(SWITCHABLE_BUTTON)
            .click()
            .should('have.attr', 'aria-checked', 'false');

        cy.get(SWITCH_ON)
            .should('be.hidden');
        
        cy.get(SWITCH_OFF)
            .should('be.visible');
    });
});

describe('Switch API methods', function() {
    beforeEach(function() {
        cy.visit(DEV_SERVER)
    })

    it('Call the .on() method', function() {
        cy.window().then(win => {
            const toggleSwitch = win.document.querySelector(SWITCHABLE_BUTTON);
            win.Switch.on(toggleSwitch);
        });

        cy.get(SWITCHABLE_BUTTON)
            .should('have.attr', 'aria-checked', 'true');

        cy.get(SWITCH_ON)
            .should('be.visible');
        
        cy.get(SWITCH_OFF)
            .should('be.hidden');
    });

    it('Call the .off() method', function() {
        cy.window().then(win => {
            const toggleSwitch = win.document.querySelector(SWITCHABLE_BUTTON);
            win.Switch.off(toggleSwitch);
        });

        cy.get(SWITCHABLE_BUTTON)
            .should('have.attr', 'aria-checked', 'false');

        cy.get(SWITCH_ON)
            .should('be.hidden');
        
        cy.get(SWITCH_OFF)
            .should('be.visible');
    });
})