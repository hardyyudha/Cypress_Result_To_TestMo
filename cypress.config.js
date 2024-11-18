const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");
const packageJsonPath = path.resolve(__dirname, "package.json");

const currentDate = new Date().toISOString().split("T")[0];

// TestMo Data
const testmoInstance = ""; // Fill with your TestMo instance
const testmoProject = ""; // Fill with your TestMo project
const testmoToken = ""; // Fill with your TestMo API Token

// We will set the TestMo Data to the package.json
fs.readFile(packageJsonPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading package.json with: ", err);
  }

  // Parsing the JSON content
  let packageJson = JSON.parse(data);

  // Add new script for TestMo Upload
  packageJson.scripts.testmo_upload = `export TESTMO_TOKEN=${testmoToken} && testmo automation:run:submit --instance ${testmoInstance} --project-id ${testmoProject} --name "Cypress Automation: ${currentDate}" --source "your_project_name" --results results/*.xml`;

  // Convert the JSON object to string
  const updatedPackageJson = JSON.stringify(package.json, null, 2);

  // Write the modified content back to package.json
  fs.writeFile(packageJsonPath, updatedPackageJson, "utf8", (err) => {
    if (err) {
      console.error("Error writing package.json with: ", err);
    } else {
      console.log("Script testmo_upload has been succesfully updated");
    }
  });
});

module.exports = defineConfig({
  viewportHeight: 768,
  viewportWidth: 1280,
  numTestsKeptInMemory: 0,
  chromeWebSecurity: false,
  failOnStatusCode: false,
  reporter: "@pavlik62/cypress-junit-reporter", // Using the pavlik as the reporter
  reporterOptions: {
    jenkinsMode: true,
    outputs: true,
    testCaseSwitchClassnameAndName: true,
    suiteTitleSeparatedBy: ".",
    useFullSuiteTitle: true,
    overwrite: false,
    toConsole: true,
    attachments: true,
    mochaFile: "results/testing-[hash].xml", // This [hash] will make the difference of .xml file per runs
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message){
          console.log(message)
          return null
        }
      })
    },
    baseUrl: "https://www.saucedemo.com/",
  },
});
