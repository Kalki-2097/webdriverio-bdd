Feature: Shopping Cart

    Scenario: Verify items are listed in cart in the order as added to cart with price
        Given I open the shopping page
        When I add 4 random items with free shipping to the cart
        And I add 1 item without free shipping to the cart
        Then the items should be listed in the cart in the order they were added
        And the prices should be correct

    Scenario: Verify user can add same items as desired
        Given I open the shopping page
        When I add the same item multiple times using the 'Add to cart' button
        Then the count and price should increase accordingly
        When I add an already present item using the '+' button
        Then the count and price should increase accordingly

    Scenario: Verify user can delete items in cart
        Given I open the shopping page
        When I add few items to the cart
        Then the total count and price should be displayed correctly
        When I clear all items in the cart
        Then the price and count should be reset to 0

    Scenario: Verify user can place an order
        Given I open the shopping page
        When I add few items to the cart
        And I click on the "checkout" button
        Then an alert message should be displayed with the correct price
        And the items in the cart should be reset on refreshing the page

