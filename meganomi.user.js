// ==UserScript==
// @name         Mega Nomi Script beta
// @namespace    https://gzo.sh
// @version      0.7
// @description  Everything in one :)
// @author       Ghezzo
// @match        https://beta.nomi.ai/nomis*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nomi.ai
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM.getValue
// @grant        GM.setValue
// @downloadURL  https://github.com/Ghezzo/meganomi/raw/refs/heads/main/meganomi.user.js
// @updateURL    https://github.com/Ghezzo/meganomi/raw/refs/heads/main/meganomi.user.js
// ==/UserScript==

(async function() {
    'use strict';

    console.log('Script started');
  
    //await window.localStorage.setItem('asteriskColor', '.text{color:#fff;text-shadow:1px 1px 10px #fc03e3,1px 1px 10px #ccc;text-align:center};');
    var textColor = "";
    GM_setValue('defaultAsteriskColor', '');
    GM_setValue('defaultBubbleColor', '');
    GM_setValue('defaultFontSize', '');
    
    // Create the settings panel
    var settingsPanel = document.createElement('div');
    settingsPanel.style.position = 'fixed';
    settingsPanel.style.top = '40px';
    settingsPanel.style.right = '10px';
    settingsPanel.style.display = 'none';
    settingsPanel.style.minWidth = '300px'; // add a width to the panel
    settingsPanel.style.minHeight = '100px'; // add a height to the panel
    settingsPanel.style.background = 'white'; // add a background color to the panel
    settingsPanel.style.border = '1px solid black'; // add a border to the panel
    settingsPanel.innerHTML = `
    <h2>Settings</h2>
    <label>
        Asterisk Style:<br>
        <input type="text" id="asteriskStyle" value="${GM_getValue('asteriskColor')}">
    </label>
    <br>
    <label>
        Bubble Color:<br>
        <input type="text" id="bubbleStyle" value="${GM_getValue('bubbleColor')}">
    </label>
    <br>
    <label>
        Font Size:<br>
        <input type="text" id="fontSize" value="${GM_getValue('fontSize')}">
    </label>
    <br><br>
    <button id="saveSettingsButton">Save</button>
    `;

    // Create a checkbox
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'hideCallBtn';

    // Create a label for the checkbox
    var label = document.createElement('label');
    label.textContent = 'Hide Call Button';
    label.htmlFor = 'hideCallBtn';

    // Add the checkbox and label to the settings panel
    settingsPanel.appendChild(checkbox);
    settingsPanel.appendChild(label);

    // Create the settings button
    var settingsButton = document.createElement('button');
    settingsButton.textContent = 'Settings';
    settingsButton.style.position = 'fixed';
    settingsButton.style.top = '10px';
    settingsButton.style.right = '10px';

    // Create the settings panel


    // Add the settings button and panel to the page
    document.body.appendChild(settingsButton);
    document.body.appendChild(settingsPanel);

    // Add an event listener to the settings button
    settingsButton.addEventListener('click', function() {
    console.log('Button clicked!');
    if (settingsPanel.style.display === 'none') {
        settingsPanel.style.display = 'block';
    } else {
        settingsPanel.style.display = 'none';
    }
    });

    // Add an event listener to the saveSettingsButton element
    document.getElementById('saveSettingsButton').addEventListener('click', function() {
    var astColor = document.getElementById('asteriskStyle').value;
    var bubColor = document.getElementById('bubbleStyle').value;
    var fontSize = document.getElementById('fontSize').value;
    GM_setValue('asteriskColor', astColor);
    GM_setValue('bubbleColor', bubColor);
    GM_setValue('fontSize', fontSize);
    console.log('Settings saved!');
    });

    var settings = {
        mySetting: {
          label: 'My Setting',
          type: 'text',
          default: 'defaultValue'
        }
      };

    GM_config.init();

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css.replace(/;/g, ' !important;');
        head.appendChild(style);
    }
    //addGlobalStyle('.text{color:#fff;text-shadow:1px 1px 10px #fc03e3,1px 1px 10px #ccc;text-align:center};');
    if (await GM_getValue('asteriskColor') === "") {
        GM_setValue('asteriskColor', GM_getValue('defaultAsteriskColor'));
        addGlobalStyle(GM_getValue('asteriskColor'));
    } else {
        GM_setValue('asteriskColor', GM_getValue('asteriskColor'));
        addGlobalStyle(GM_getValue('asteriskColor'));
    }

    if (await GM_getValue('bubbleColor') === "") {
        GM_setValue('bubbleColor', GM_getValue('defaultBubbleColor'));
        addGlobalStyle(GM_getValue('bubbleColor'));
    } else {
        GM_setValue('bubbleColor', GM_getValue('bubbleColor'));
        addGlobalStyle(GM_getValue('bubbleColor'));
    }

    if (await GM_getValue('fontSize') === "") {
        GM_setValue('fontSize', GM_getValue('defaultFontSize'));
        addGlobalStyle(GM_getValue('fontSize'));
    } else {
        GM_setValue('fontSize', GM_getValue('fontSize'));
        addGlobalStyle(GM_getValue('fontSize'));
    }

    // Get the current state of the checkbox
    var checkboxState = GM_getValue('hideCallButton', false);

    // Set the state of the checkbox
    checkbox.checked = checkboxState;

    // Add an event listener to the checkbox
    checkbox.addEventListener('change', function() {
    // Store the new state of the checkbox
    GM_setValue('hideCallButton', checkbox.checked);
    });

    //addGlobalStyle(await GM_getValue('asteriskColor'));

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
            case 1:
            case 9:
            case 11:
                child = node.firstChild;
                while (child) {
                    next = child.nextSibling;
                    walk(child);
                    child = next;
                }
                break;

            case 3:
                processTextNode(node);
                break;
        }
    }

    function chatBubbleColor() {
        const divs = document.querySelectorAll('div');

        divs.forEach(div => {
            if (div.getAttribute('style')) {
            const style = div.getAttribute('style');
            const regexStart = /align-self:\s*flex-start;/i;
            const regexEnd = /align-self:\s*flex-end;/i;

            if (regexStart.test(style)) {
                const childDiv = div.querySelector('div');
                if (childDiv) {
                const grandchildDiv = childDiv.querySelector('div');
                if (grandchildDiv) {
                    const ggrandchildDiv = grandchildDiv.querySelector('div');
                    if(ggrandchildDiv) {
                        //ggrandchildDiv.style.fontSize = '20px';
                        ggrandchildDiv.style.fontSize = GM_getValue('fontSize')+'px';
                    }
                    //grandchildDiv.style.backgroundColor = '#35383f';
                }
                }
            } else if (regexEnd.test(style)) {
                const childDiv = div.querySelector('div');
                if (childDiv) {
                const grandchildDivs = childDiv.querySelectorAll('div');
                if (grandchildDivs.length > 1) {
                    const ggrandchildDivs = grandchildDivs[1].querySelector('div');
                    if(ggrandchildDivs) {
                        //ggrandchildDivs.style.fontSize = '20px';
                        ggrandchildDivs.style.fontSize = GM_getValue('fontSize')+'px';
                    }
                    grandchildDivs[1].style.backgroundColor = GM_getValue('bubbleColor');
                }
                }
            }
            }
        });
    }

    function hideCallButton() {
        const buttons = document.querySelectorAll('button[title="Call"]');
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

    /* function setImageDimensions() {
        var images = document.getElementsByTagName('img');
        for (var i = 0; i < images.length; i++) {
            images[i].style.height = '100%';
            images[i].style.width = '100%';
        }
    } */

    function hideNews() {
        var buttons = document.querySelectorAll('button');
        if (buttons.length > 0) {
            buttons.forEach(function(button) {
                if (button.textContent === 'Show') {
                    var parentDiv = button.parentNode.parentNode;
                    if (parentDiv) {
                        parentDiv.style.display = 'none';
                    } else {
                       
                    }
                }
            });
        }
    }

    chatBubbleColor();
    //hideCallButton();
    //scrollBars();
    if (GM_getValue('hideCallButton', false)) {
        hideCallButton();
    } else {
    
    }
    let lastCallTime = 0;
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
                mutation.addedNodes.forEach(node => {
                    walk(node);
                });
                chatBubbleColor();
                if (GM_getValue('hideCallButton', false)) {
                    hideCallButton();
                } else {
                    
                }
                //hideCallButton();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
