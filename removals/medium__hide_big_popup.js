// ==UserScript==
// @name         Hide Medium Popup
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Hides a specific popup on Medium pages
// @match        https://medium.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function hidePopup() {
        // Find all divs with style containing "top: 50vh;"
        const divs = document.querySelectorAll('div[style*="top: 50vh;"]');

        divs.forEach(div => {
            // Check if the div contains a button with aria-label="close"
            const closeButton = div.querySelector('button[aria-label="close"]');

            if (closeButton) {
                // If found, set the div's display to none
                div.style.display = 'none';
                console.log('Popup hidden');
            }
        });
    }

    // Run the function immediately
    hidePopup();

    // Set up a MutationObserver to watch for dynamically added elements
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                hidePopup();
            }
        });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
})();