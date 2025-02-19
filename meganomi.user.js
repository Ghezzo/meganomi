// ==UserScript==
// @name         Mega Nomi Script
// @namespace    https://ghezzo.net/
// @version      0.4
// @description  Everything in one :)
// @author       Ghezzo
// @match        https://beta.nomi.ai/nomis*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nomi.ai
// @grant        none
// @downloadURL  https://github.com/Ghezzo/meganomi/raw/refs/heads/main/meganomi.user.js
// @updateURL    https://github.com/Ghezzo/meganomi/raw/refs/heads/main/meganomi.user.js
// ==/UserScript==

(function() {
    'use strict';

    console.log('Script started');

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css.replace(/;/g, ' !important;');
        head.appendChild(style);
    }
    addGlobalStyle('.text{color:#fff;text-shadow:1px 1px 10px #fc03e3,1px 1px 10px #ccc;text-align:center};');

    function processTextNode(node) {
        const italicPattern = /\*(\S(.*?\S)?)\*/g;

        const newHTML = node.textContent.replace(italicPattern, (match, p1) => `*<em class="text">${p1}</em>*`);

        if (newHTML !== node.textContent) {
            const span = document.createElement('span');
            span.innerHTML = newHTML;

            node.replaceWith(span);
        }
    }

    function walk(node) {
        let child, next;

        switch (node.nodeType) {
            case 1: // Element node
            case 9: // Document node
            case 11: // Document fragment node
                child = node.firstChild;
                while (child) {
                    next = child.nextSibling;
                    walk(child);
                    child = next;
                }
                break;

            case 3: // Text node
                processTextNode(node);
                break;
        }
    }

    // Initial run on the whole body
    //walk(document.body);

    function chatBubbleColor() {
        const divs = document.querySelectorAll('div');

        divs.forEach(div => {
            if (div.getAttribute('style')) {
            const style = div.getAttribute('style');
            const regexStart = /align-self:\s*flex-start;/i;
            const regexEnd = /align-self:\s*flex-end;/i;

            if (regexStart.test(style)) {
                // Get the first child div
                const childDiv = div.querySelector('div');
                if (childDiv) {
                // Get the first child div of the child div
                const grandchildDiv = childDiv.querySelector('div');
                if (grandchildDiv) {
                    const ggrandchildDiv = grandchildDiv.querySelector('div');
                    if(ggrandchildDiv) {
                        //const grandchildDiv = childDiv.querySelector('div');
                        ggrandchildDiv.style.fontSize = '20px';
                    }
                    grandchildDiv.style.backgroundColor = '#35383f';
                }
                }
            } else if (regexEnd.test(style)) {
                // Get the first child div
                const childDiv = div.querySelector('div');
                if (childDiv) {
                // Get all child divs of the child div
                const grandchildDivs = childDiv.querySelectorAll('div');
                if (grandchildDivs.length > 1) {
                    const ggrandchildDivs = grandchildDivs[1].querySelector('div');
                    if(ggrandchildDivs) {
                        //const grandchildDiv = childDiv.querySelector('div');
                        ggrandchildDivs.style.fontSize = '20px';
                    }
                    grandchildDivs[1].style.backgroundColor = '#2a2c32';
                }
                }
            }
            }
        });
    }

    function hideCallButton() {
        // Find all buttons with the title attribute "Call"
        const buttons = document.querySelectorAll('button[title="Call"]');
        // Hide each button
        buttons.forEach(button => button.style.display = 'none');
    }

    function scrollBars() {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
        ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #757575; /* blue */
            border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background-color: #838383; /* green */
        }
        ::-webkit-scrollbar-track {
            background-color: #2e2e2e; /* dark gray */
            border-radius: 5px;
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        }
        `;
        document.head.appendChild(style);
    }

    function setImageDimensions() {
        var images = document.getElementsByTagName('img');
        for (var i = 0; i < images.length; i++) {
            images[i].style.height = '100%';
            images[i].style.width = '100%';
        }
    }

    function hideNews() {
        var buttons = document.querySelectorAll('button');
        if (buttons.length > 0) {
            //console.log('Found ' + buttons.length + ' buttons');
            buttons.forEach(function(button) {
                //console.log('Button text content: ' + button.textContent);
                if (button.textContent === 'Show') {
                    //console.log('Found button with text "Show"');
                    var parentDiv = button.parentNode.parentNode;
                    //console.log('Parent div:', parentDiv);
                    if (parentDiv) {
                        parentDiv.style.display = 'none';
                        //console.log('Hid parent div');
                    } else {
                        //console.log('Parent div is null');
                    }
                }
            });
        }
    }

    chatBubbleColor();
    hideCallButton();
    scrollBars();
    //setImageDimensions();
    //hideNews();
    let lastCallTime = 0;
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            /* if (mutation.type === 'childList') { */
                mutation.addedNodes.forEach(node => {
                    walk(node);
                });
                chatBubbleColor();
                hideCallButton();
                //setImageDimensions();
                //hideNews();
            /* } */
        }
    });

    // Observe the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });
})();
