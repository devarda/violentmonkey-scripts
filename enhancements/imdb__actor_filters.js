// ==UserScript==
// @name        Only Acting imdb.com
// @namespace   Violentmonkey Scripts
// @match       https://www.imdb.com/name/nm0454236/*
// @grant       none
// @version     1.4
// @author      -
// @description Adds a button to remove voice acting etc to show only movies by actor
// ==/UserScript==

const hideVoiceItems = () => {
    const listItems = document.querySelectorAll('li.ipc-metadata-list-summary-item');
  
    for (const item of listItems) {
      if (item.textContent.includes('(voice)')) {
        item.style.display = 'none';
      }
    }
  };
  
  const createButton = () => {
    const titleTextElements = document.querySelectorAll('.ipc-title__text');
    for (const element of titleTextElements) {
      if (element.textContent.trim() === 'Actor') { // Use trim() for better matching
        const button = document.createElement('button');
        button.textContent = 'Only Acting';
        button.addEventListener('click', hideVoiceItems);
        element.appendChild(button);
        return; // Exit the loop after finding the matching element
      }
    }
  };
  
  createButton();
  