// Bypass uncaught exception by the web framework
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

