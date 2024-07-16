class HomePage {
    get freeShippingItems() { return $$('//*[contains(text(),"Free shipping")]/following-sibling::button'); }
    get nonFreeShippingItems() { return $$('//*[not(contains(text(),"Free shipping"))]/following-sibling::button'); }
    get addToCartButtons() { return $$('button.add-to-cart'); }

    async open() {
        await browser.url('https://react-shopping-cart-67954.firebaseapp.com/');
    }

    async addFreeShippingItemsToCart(count) {
        for (let i = 0; i < count; i++) {
            await this.freeShippingItems[i].click();
        }
    }

    async addNonFreeShippingItemToCart() {
        await this.nonFreeShippingItems[0].click();
    }

    async addSameItemMultipleTimes() {
        await this.addToCartButtons[0].click();
        await this.addToCartButtons[0].click();
    }

    async addFewItemsToCart() {
        for (let i = 0; i < 3; i++) {
            await this.addToCartButtons[i].click();
        }
    }
}

module.exports = new HomePage();
