// ==UserScript==
// @name         eBay Total Price Calculator
// @namespace    ViolentMonkey Scripts
// @version      1.0
// @description  Calculates the total price (item + shipping) on eBay listings.
// @author       n0xi
// @match        https://www.ebay.com/itm/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function calculateTotalPrice() {
        const priceElement = document.querySelector('.x-price-primary');
        const shippingElement = document.querySelector('.x-shipping-message__textual-display');

        if (priceElement && shippingElement) {
            const priceText = priceElement.textContent.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
            const shippingText = shippingElement.textContent.replace(/[^0-9.]/g, '');

            const price = parseFloat(priceText);
            const shipping = parseFloat(shippingText);

            if (!isNaN(price) && !isNaN(shipping)) {
                const totalPrice = price + shipping;
                const totalPriceElement = document.createElement('div');
                totalPriceElement.style.fontSize = '18px';
                totalPriceElement.style.fontWeight = 'bold';
                totalPriceElement.style.marginTop = '10px';
                totalPriceElement.style.color = 'blue';
                totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;

                // Insert the total price element next to the shipping cost element
                shippingElement.parentNode.insertBefore(totalPriceElement, shippingElement.nextSibling);
            }
        }
    }

    // Initial calculation
    calculateTotalPrice();

    // Observe for dynamic changes and recalculate
    // const observer = new MutationObserver(calculateTotalPrice);
    // observer.observe(document.body, { childList: true, subtree: true });
})();