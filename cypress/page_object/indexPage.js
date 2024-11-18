// Use console.log to each function to log the step
class IndexPage {
  visitDashboard() {
    console.log("User visit dashboard page");
    cy.visit("/");
  }
}

export default IndexPage;
