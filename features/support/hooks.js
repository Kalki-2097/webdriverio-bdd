const { Before, After } = require('@cucumber/cucumber');

Before(async () => {
    // Perform setup before each scenario
    // For example, open the browser and navigate to the base URL
    await browser.url('/');
});

After(async () => {
    // Perform teardown after each scenario
    // For example, clear the browser cookies and localStorage to ensure a clean state
    await browser.deleteCookies();
    await browser.execute('window.localStorage.clear();');
});
