class CartPage {
    get cartItems() { return $$('div.cart-item'); }
    get cartTotalCount() { return $('span.cart-count'); }
    get cartTotalPrice() { return $('span.cart-total'); }
    get incrementButtons() { return $$('button[aria-label="increment quantity"]'); }
    get removeButtons() { return $$('button[aria-label="remove item"]'); }
    get checkoutButton() { return $('button.checkout'); }

    async getItemsOrder() {
        const items = await this.cartItems;
        return await Promise.all(items.map(async item => {
            const text = await item.getText();
            return text.split('\n')[0]; // Assuming item text is in the first line
        }));
    }

    async getItemsPrices() {
        const items = await this.cartItems;
        return await Promise.all(items.map(async item => {
            const priceElement = await item.$('div.price');
            return await priceElement.getText();
        }));
    }

    async getItemCountAndPrice() {
        const count = await this.cartTotalCount.getText();
        const price = await this.cartTotalPrice.getText();
        return { count, price };
    }

    async incrementItemCount() {
        await this.incrementButtons[0].click();
    }

    async clearCart() {
        for (let button of this.removeButtons) {
            await button.click();
        }
    }

    async checkout() {
        await this.checkoutButton.click();
    }

    async getAlertMessage() {
        return await browser.getAlertText();
    }
}

module.exports = new CartPage();
