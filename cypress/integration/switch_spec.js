const SWITCHABLE_BUTTON = '[data-switch="two-factor-switch"]';
const LISTENER_BUTTON = '[data-switch="email-switch"]';
const SWITCH_ON = "#duo-switch-on";
const SWITCH_OFF = "#duo-switch-off";
const DEV_SERVER = "http://localhost:3000";

describe("Rivet switch interactions", function() {
  it("Click the default Rivet switch", function() {
    cy.visit(DEV_SERVER);

    cy.get(SWITCHABLE_BUTTON)
      .click()
      .should("have.attr", "aria-checked", "false");

    cy.get(SWITCH_ON).should("be.hidden");

    cy.get(SWITCH_OFF).should("be.visible");

    cy.get(SWITCHABLE_BUTTON)
      .click()
      .should("have.attr", "aria-checked", "true");

    cy.get(SWITCH_ON).should("be.visible");

    cy.get(SWITCH_OFF).should("be.hidden");
  });
});

describe("Switch API methods", function() {
  it("Call the .off() method", function() {
    cy.visit(DEV_SERVER);

    cy.window().then(win => {
      const toggleSwitch = win.document.querySelector(SWITCHABLE_BUTTON);

      win.Switch.off(toggleSwitch);
    });

    cy.get(SWITCHABLE_BUTTON).should("have.attr", "aria-checked", "false");

    cy.get(SWITCH_ON).should("be.hidden");

    cy.get(SWITCH_OFF).should("be.visible");
  });

  it("Call the .on() method", function() {
    cy.window().then(win => {
      const toggleSwitch = win.document.querySelector(SWITCHABLE_BUTTON);

      win.Switch.on(toggleSwitch);
    });

    cy.get(SWITCHABLE_BUTTON).should("have.attr", "aria-checked", "true");

    cy.get(SWITCH_ON).should("be.visible");

    cy.get(SWITCH_OFF).should("be.hidden");
  });
});

describe("Listen for custom events", function() {
  it("Listen for the switchOn name", function() {
    cy.visit(DEV_SERVER);

    cy.window().then(win => {
      cy.spy(console, "log");

      win.addEventListener(win.Switch.on.name, function() {
        console.log(win.Switch.on.name);
      });

      const toggleSwitch = win.document.querySelector(LISTENER_BUTTON);

      win.Switch.on(toggleSwitch);

      expect(console.log).to.be.called;
    });
  });

  it("Listen for the switchOff name", function() {
    cy.window().then(win => {
      cy.spy(console, "log");

      win.addEventListener(win.Switch.off.name, function() {
        console.log(win.Switch.off.name);
      });

      const toggleSwitch = win.document.querySelector(LISTENER_BUTTON);

      win.Switch.off(toggleSwitch);

      expect(console.log).to.be.called;
    });
  });
});
