// ==UserScript==
// @name         Mega Nomi Script beta
// @namespace    https://gzo.sh
// @version      0.8.7
// @description  Everything in one :)
// @author       Ghezzo
// @match        https://beta.nomi.ai/nomis*
// @match        https://beta.nomi.ai/group-chats*
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
    settingsPanel.style.top = '50px';
    settingsPanel.style.right = '10px';
    settingsPanel.style.display = 'none';
    settingsPanel.style.minWidth = '300px'; // add a width to the panel
    settingsPanel.style.minHeight = '100px'; // add a height to the panel
    settingsPanel.style.background = '#181a20'; // add a background color to the panel
    settingsPanel.style.border = '1px solid #979eb1'; // add a border to the panel
    settingsPanel.style.borderRadius = '5px'; // add a border radius to the panel
    settingsPanel.style.color = 'white'; // add padding to the panel
    settingsPanel.style.padding = '10px'; // add padding to the panel
    settingsPanel.innerHTML = `
    <span>Version 0.8.7</span>
    <h2>Settings</h2>
    <label>
        Asterisk Style:<br>
        
        <textarea id="asteriskStyle" rows="5" class="textbox">${GM_getValue('asteriskColor')}</textarea>
    </label>
    <br>
    <label>
        Bubble Color:<br>
        <input type="text" id="bubbleStyle" class="textbox" value="${GM_getValue('bubbleColor')}">
    </label>
    <br>
    <label>
        Font Size:<br>
        <input type="text" id="fontSize" class="textbox" value="${GM_getValue('fontSize')}">
    </label>
    <br>
    `;
    //<button id="saveSettingsButton">Save</button>

    // Create a checkbox
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'hideCallBtn';

    // Create a label for the checkbox
    var label = document.createElement('label');
    label.textContent = 'Hide Call Button';
    label.htmlFor = 'hideCallBtn';

    var br2 = document.createElement('br');


    var checkbox2 = document.createElement('input');
    checkbox2.type = 'checkbox';
    checkbox2.id = 'italicTextCheckbox';

    // Create a label for the checkbox
    var label2 = document.createElement('label');
    label2.textContent = 'Italic Asterisk Text';
    label2.htmlFor = 'italicTextCheckbox';


    var br = document.createElement('br');

    // Create a save button
    var saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.id = 'saveSettingsButton';

    // Create the settings button
    var settingsButton = document.createElement('button');
    settingsButton.textContent = 'MNS Settings';
    settingsButton.style.position = 'fixed';
    settingsButton.style.top = '10px';
    settingsButton.style.right = '10px';
    settingsButton.id = 'settingsButton';

    // Add the checkbox and label to the settings panel
    settingsPanel.appendChild(checkbox);
    settingsPanel.appendChild(label);
    settingsPanel.appendChild(br2);
    settingsPanel.appendChild(checkbox2);
    settingsPanel.appendChild(label2);
    settingsPanel.appendChild(br);
    
    settingsPanel.appendChild(saveButton);

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

    //addGlobalStyle("#hideCallBtn,#saveSettingsButton{display:block}#hideCallBtn{margin-bottom:20px}");
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

    //addGlobalStyle('#settingsButton{background-color:#9610ff;color:#fff;border-radius:5px;border:none;padding:10px;cursor:pointer;z-index:9999}#settingsButton:hover{background-color:#fc03e3}#settingsPanel{display:none;position:absolute;top:50px;right:10px;background-color:#fff;border:1px solid #ccc;padding:10px;z-index:9999}#saveSettingsButton{background-color:#9610ff;color:#fff;border-radius:5px;border:none;padding:10px;cursor:pointer;margin-top:10px}#saveSettingsButton:hover{background-color:#fc03e3}');
    addGlobalStyle('#saveSettingsButton,#settingsButton{background-color:#9610ff;padding:10px;cursor:pointer;color:#fff}#settingsButton{border-radius:5px;border:none;z-index:9999}#saveSettingsButton:hover,#settingsButton:hover{background-color:#fc03e3}#settingsPanel{display:none;position:absolute;top:50px;right:10px;background-color:#fff;border:1px solid #ccc;padding:10px;z-index:9999}#saveSettingsButton{border-radius:5px;border:none;margin-top:10px}.textbox{background-color:#2b2f3a;color:#fff;border:1px solid #000;border-radius:5px;padding:5px}');

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

    // Get the current state of the checkbox
    var checkboxState2 = GM_getValue('italicTextCheckbox', false);

    // Set the state of the checkbox
    checkbox2.checked = checkboxState2;

    // Add an event listener to the checkbox
    checkbox2.addEventListener('change', function() {
    // Store the new state of the checkbox
    GM_setValue('italicTextCheckbox', checkbox2.checked);
    });

    //addGlobalStyle(await GM_getValue('asteriskColor'));

    function processTextNode(node) {
        const italicPattern = /\*(\S(.*?\S)?)\*/g;

    /*     if (GM_getValue('italicTextCheckbox', false)) {
            const newHTML = node.textContent.replace(italicPattern, (match, p1) => `*<em class="text">${p1}</em>*`);
        } else {
            const newHTML = node.textContent.replace(italicPattern, (match, p1) => `*<span class="text">${p1}</span>*`);
        } */
        const newHTML = GM_getValue('italicTextCheckbox', false) ? 
    node.textContent.replace(italicPattern, (match, p1) => `*<em class="text">${p1}</em>*`) : 
    node.textContent.replace(italicPattern, (match, p1) => `*<span class="text">${p1}</span>*`);

        //const newHTML = node.textContent.replace(italicPattern, (match, p1) => `*<em class="text">${p1}</em>*`);
        

        

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
