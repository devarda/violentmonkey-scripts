// ==UserScript==
// @name         Remove Google Sign-In iframe
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes the Google Sign-In iframe from all pages
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function removeGoogleIframe() {
        const iframes = document.getElementsByTagName('iframe');
        for (let i = 0; i < iframes.length; i++) {
            if (iframes[i].src.startsWith('https://accounts.google.com/gsi/iframe/select')) {
                iframes[i].remove();
                console.log('Google Sign-In iframe removed');
                break;
            }
        }
    }

    // Run the function immediately
    removeGoogleIframe();

    // Set up a MutationObserver to watch for dynamically added iframes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                removeGoogleIframe();
            }
        });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
})();