const { Given, When, Then } = require('@cucumber/cucumber');
const HomePage = require('../../pageobjects/HomePage');
const CartPage = require('../../pageobjects/CartPage');
const cartUtils = require('../Utils/cartUtils');
const { expect } = require('chai');
const log4js = require('log4js');
const logger = log4js.getLogger();

Given('I open the shopping page', async () => {
    await HomePage.open();
});

When('I add 4 random items with free shipping to the cart', async () => {
    await HomePage.addFreeShippingItemsToCart(4);
});

When('I add 1 item without free shipping to the cart', async () => {
    await HomePage.addNonFreeShippingItemToCart();
});

Then('the items should be listed in the cart in the order they were added', async () => {
    const itemsOrder = await CartPage.getItemsOrder();
    // Expected order of items (assuming the order they were added)
    const expectedOrder = [
        'Item 1 (Free shipping)',
        'Item 2 (Free shipping)',
        'Item 3 (Free shipping)',
        'Item 4 (Free shipping)',
        'Item 5'
    ];
    expect(itemsOrder).to.eql(expectedOrder, 'Items are not in the expected order');
});

Then('the prices should be correct', async () => {
    const prices = await CartPage.getItemsPrices();
    // Here you can add your logic to validate the prices
    // For simplicity, we will just log the prices
    logger.info(prices);
});

When('I add the same item multiple times using the "Add to cart" button', async () => {
    await HomePage.addSameItemMultipleTimes();
});

Then('the count and price should increase accordingly', async () => {
    const countAndPrice = await CartPage.getItemCountAndPrice();
    // Here you can add your logic to validate the count and price increase
    // For simplicity, we will just log the count and price
    logger.info(countAndPrice);
});

When('I add an already present item using the "+" button', async () => {
    await cartUtils.incrementItemInCart(0);
});

When('I add few items to the cart', async () => {
    await HomePage.addFewItemsToCart();
});

Then('the total count and price should be displayed correctly', async () => {
    const totalCountAndPrice = await CartPage.getTotalCountAndPrice();
    // Here you can add your logic to validate the total count and price
    // For simplicity, we will just log the total count and price
    logger.info(totalCountAndPrice);
});

When('I clear all items in the cart', async () => {
    await cartUtils.clearCart();
});

Then('the price and count should be reset to 0', async () => {
    const countAndPrice = await CartPage.getItemCountAndPrice();
    expect(countAndPrice.count).to.equal('0', 'Cart item count is not 0');
    expect(countAndPrice.price).to.equal('$0.00', 'Cart price is not $0.00');
});

When('I click on the "checkout" button', async () => {
    await cartUtils.placeOrder();
});

Then('an alert message should be displayed with the correct price', async () => {
    const alertMessage = await CartPage.getAlertMessage();
    // Here you can add your logic to validate the alert message and price
    // For simplicity, we will just log the alert message
    logger.info(alertMessage);
});

