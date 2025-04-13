// ==UserScript==
// @name         Mega Nomi Script beta
// @namespace    https://gzo.sh
// @version      0.9.2
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
  
    var textColor = "";
    GM_setValue('defaultAsteriskColor', '');
    GM_setValue('defaultBubbleColor', '');
    GM_setValue('defaultNomiBubbleColor', '');
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
    <span>Version 0.9.2 | <a href="https://raw.githubusercontent.com/Ghezzo/meganomi/refs/heads/main/changelog.txt" target="_blank" class="changelogLink">Changelog (GitHub)</a></span>
    <h2>Settings</h2>
    <label>
        Asterisk Style:<br>
        
        <textarea id="asteriskStyle" rows="5" class="textbox" placeholder=".text{color:#fff;text-shadow:1px 1px 10px #fc03e3,1px 1px 10px #ccc;text-align:center};">${GM_getValue('asteriskColor') ?? ''}</textarea>
    </label>
    <br>
    <label>
        User Bubble Color:<br>
        <input type="text" id="bubbleStyle" class="textbox" value="${GM_getValue('bubbleColor') ?? ''}" placeholder="#ffffff">
    </label>
    <br>
    <label>
        Nomi Bubble Color:<br>
        <input type="text" id="nomiBubbleStyle" class="textbox" value="${GM_getValue('nomiBubbleColor') ?? ''}" placeholder="#000000">
    </label>
    <br>
    <label>
        Font Size:<br>
        <input type="text" id="fontSize" class="textbox" value="${GM_getValue('fontSize') ?? ''}" placeholder="20">
    </label>
    <br>
    `;

    var br = document.createElement('br');
    // Create a checkbox
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'hideCallBtn';

    // Create a label for the checkbox
    var label = document.createElement('label');
    label.textContent = 'Hide Call Button';
    label.htmlFor = 'hideCallBtn';


    var checkbox2 = document.createElement('input');
    checkbox2.type = 'checkbox';
    checkbox2.id = 'italicTextCheckbox';

    // Create a label for the checkbox
    var label2 = document.createElement('label');
    label2.textContent = 'Italic Asterisk Text';
    label2.htmlFor = 'italicTextCheckbox';


    var checkbox3 = document.createElement('input');
    checkbox3.type = 'checkbox';
    checkbox3.id = 'asterisksCheckbox';

    // Create a label for the checkbox
    var label3 = document.createElement('label');
    label3.textContent = 'Enable Asterisks';
    label3.htmlFor = 'asterisksCheckbox';


    var checkbox4 = document.createElement('input');
    checkbox4.type = 'checkbox';
    checkbox4.id = 'hideNewsCheckbox';

    // Create a label for the checkbox
    var label4 = document.createElement('label');
    label4.textContent = 'Hide News Bubbles';
    label4.htmlFor = 'hideNewsCheckbox';


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
    settingsPanel.appendChild(br);
    settingsPanel.appendChild(checkbox2);
    settingsPanel.appendChild(label2);
    settingsPanel.appendChild(br.cloneNode());
    settingsPanel.appendChild(checkbox3);
    settingsPanel.appendChild(label3);
    settingsPanel.appendChild(br.cloneNode());
    settingsPanel.appendChild(checkbox4);
    settingsPanel.appendChild(label4);
    settingsPanel.appendChild(br.cloneNode());
    
    settingsPanel.appendChild(saveButton);

    // Create the settings panel


    // Add the settings button and panel to the page
    document.body.appendChild(settingsButton);
    document.body.appendChild(settingsPanel);

    // Add an event listener to the settings button
    settingsButton.addEventListener('click', function() {
    console.log('Opened Settings Panel');
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
    var nomiBubColor = document.getElementById('nomiBubbleStyle').value;
    var fontSize = document.getElementById('fontSize').value;
    GM_setValue('asteriskColor', astColor);
    GM_setValue('bubbleColor', bubColor);
    GM_setValue('nomiBubbleColor', nomiBubColor);
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

    addGlobalStyle('#saveSettingsButton,#settingsButton{background-color:#9610ff;padding:10px;cursor:pointer;color:#fff}#settingsButton{border-radius:5px;border:none;z-index:9999}#saveSettingsButton:hover,#settingsButton:hover{background-color:#fc03e3}#settingsPanel{display:none;position:absolute;top:50px;right:10px;background-color:#fff;border:1px solid #ccc;padding:10px;z-index:9999}#saveSettingsButton{border-radius:5px;border:none;margin-top:10px}.textbox{background-color:#2b2f3a;color:#fff;border:1px solid #000;border-radius:5px;padding:5px}.changelogLink{color:#fff;text-decoration:none}');

    if (await GM_getValue('asteriskColor') === "") {
        GM_setValue('asteriskColor', GM_getValue('defaultAsteriskColor'));
    }
    addGlobalStyle(GM_getValue('asteriskColor'));

    if (await GM_getValue('bubbleColor') === "") {
        GM_setValue('bubbleColor', GM_getValue('defaultBubbleColor'));
    }
    addGlobalStyle(GM_getValue('bubbleColor'));

    if (await GM_getValue('nomiBubbleColor') === "") {
        GM_setValue('nomiBubbleColor', GM_getValue('defaultNomiBubbleColor'));
    }
    addGlobalStyle(GM_getValue('nomiBubbleColor'));

    if (await GM_getValue('fontSize') === "") {
        GM_setValue('fontSize', GM_getValue('defaultFontSize'));
    }
    addGlobalStyle(GM_getValue('fontSize'));

    checkbox.checked = GM_getValue('hideCallButton', false);
    checkbox.addEventListener('change', () => GM_setValue('hideCallButton', checkbox.checked));

    checkbox2.checked = GM_getValue('italicTextCheckbox', false);
    checkbox2.addEventListener('change', () => GM_setValue('italicTextCheckbox', checkbox2.checked));

    checkbox3.checked = GM_getValue('asterisksCheckbox', false);
    checkbox3.addEventListener('change', () => GM_setValue('asterisksCheckbox', checkbox3.checked));

    checkbox4.checked = GM_getValue('hideNewsCheckbox', false);
    checkbox4.addEventListener('change', () => GM_setValue('hideNewsCheckbox', checkbox4.checked));


    function processTextNode(node) {
        const italicPattern = /\*(\S(.*?\S)?)\*/g;

        const useAsterisks = GM_getValue('asterisksCheckbox', true);
        const italicTextCheckbox = GM_getValue('italicTextCheckbox', false);

        const newHTML = node.textContent.replace(italicPattern, (match, p1) => {
        const italicizedText = italicTextCheckbox ? `<em class="text">${p1}</em>` : `<span class="text">${p1}</span>`;
        return useAsterisks ? `*${italicizedText}*` : italicizedText;
        });        

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
            if (div.getAttribute('type')) {
                const type = div.getAttribute('type');
    
                if (type === 'Nomi') {
                    const childDiv = div.querySelector('div');
                    if (childDiv) {
                        childDiv.style.fontSize = GM_getValue('fontSize') + 'px';
                        div.style.backgroundColor = GM_getValue('nomiBubbleColor');
                    }
                } else if (type === 'User') {
                    const childDiv = div.querySelector('div');
                    if (childDiv) {
                        childDiv.style.fontSize = GM_getValue('fontSize') + 'px';
                        div.style.backgroundColor = GM_getValue('bubbleColor');
                    }
                }
            }
        });
    }

    function hideCallButton() {
        const buttons = document.querySelectorAll('button[title="Call"]');
        buttons.forEach(button => button.style.display = 'none');
    }

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
    if (GM_getValue('hideCallButton', false)) {
        hideCallButton();
    }

    if (GM_getValue('hideNewsCheckbox', false)) {
        hideNews();
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
                }

                if (GM_getValue('hideNewsCheckbox', false)) {
                    hideNews();
                }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
