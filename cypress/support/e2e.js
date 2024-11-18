import './commands'

var util = require('util')

var originalLogFunction = console.log
var originalErrorFunction = console.error

beforeEach(function() {
    var currentTest = this.currentTest
    console.log = function captureLog() {
        var formattedMessage = util.format.apply(util, arguments)
        currentTest._testConfig.consoleOutputs = (currentTest._testConfig.consoleOutputs || []).concat(formattedMessage)
    }
    console.error = function captureError() {
        var formattedMessage = util.format.apply(util, arguments)
        currentTest._testConfig.consoleErrors = (currentTest._testConfig.consoleErrors || []).concat(formattedMessage)
    }
})

// This function will do logging to the console for each step
afterEach(function () {
    console.log = originalLogFunction
    console.error = originalErrorFunction

    let caseName = Cypress.spec.name + ": " + Cypress.currentTest.titlePath[0] + " - " + Cypress.currentTest.titlePath[1]
    let error = this.currentTest.err ? this.currentTest.err.message : 'Unknown error';
    if (this.currentTest.state === 'passed') {
            cy.task('log', `${caseName}: Test Case Passed`);
    } else {
        cy.task('log', `${caseName}: Test Case Failed: ${error}`);
        this.currentTest._testConfig.attachments = [`cypress/screenshots/${Cypress.spec.name}/${Cypress.currentTest.titlePath[0]} -- ${Cypress.currentTest.titlePath[1]} (failed).png`];
    }
})