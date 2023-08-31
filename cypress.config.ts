const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;




async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);
  const bundler = createBundler({
    plugins: [createEsbuildPlugin(config)],
  });

  on(
    "file:preprocessor", bundler
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({

  component: {
    specPattern: "app/**/*.cy.{ts,tsx}",
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/e2e/**/*.feature",
    // specPattern: "cypress/e2e/**/*.cy.ts",
    
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
    baseUrl: "http://localhost:3000/",
    supportFile: false,
  },

})
