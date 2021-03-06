// An example configuration file.
exports.config = {
    // Do not start a Selenium Standalone sever - only run this using chrome.
    chromeOnly: false,
    // chromeDriver: 'node_modules/grunt-protractor-runner/protractor/selenium/chromedriver',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'firefox'
    },

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: [ 'test/e2e/**/*.spec.js' ],

    baseUrl: 'http://localhost:9000/',

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
