const log4js = require('log4js');
const logger = log4js.getLogger();

async function addItemToCart(count, isFreeShipping) {
    const items = isFreeShipping ? await $$('//*[contains(text(),"Free shipping")]') : await $$('//*[not(contains(text(),"Free shipping"))]');
    for (let i = 0; i < count; i++) {
        await items[i].$('button').click();
    }
}

async function verifyCartItems() {
    const cartItems = await $$('div.cart-item');
    const itemTexts = await Promise.all(cartItems.map(async item => await item.getText()));
    itemTexts.forEach((text, index) => {
        logger.info(`Item ${index + 1}: ${text}`);
    });
}

async function verifyCartPrices() {
    const cartItems = await $$('div.cart-item');
    const prices = await Promise.all(cartItems.map(async item => await item.$('div.price').getText()));
    prices.forEach((price, index) => {
        logger.info(`Item ${index + 1} price: ${price}`);
    });
}

async function incrementItemInCart(itemIndex) {
    const plusButtons = await $$('button[aria-label="increment quantity"]');
    await plusButtons[itemIndex].click();
}

async function clearCart() {
    const removeButtons = await $$('button[aria-label="remove item"]');
    for (const button of removeButtons) {
        await button.click();
    }
}

async function placeOrder() {
    const checkoutButton = await $('button.checkout');
    await checkoutButton.click();
}

module.exports = {
    addItemToCart,
    verifyCartItems,
    verifyCartPrices,
    incrementItemInCart,
    clearCart,
    placeOrder
};
