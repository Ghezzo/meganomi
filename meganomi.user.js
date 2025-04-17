// ==UserScript==
// @name         Mega Nomi Script beta
// @namespace    https://gzo.sh
// @version      0.9.7.1
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

    console.log('Mega Nomi Script loaded!');
  
    var version = '0.9.7.1';
    GM_setValue('defaultAsteriskColor', '');
    GM_setValue('defaultAsteriskShadow1', '');
    GM_setValue('defaultAsteriskShadow2', '');
    GM_setValue('defaultBubbleColor', '');
    GM_setValue('defaultNomiBubbleColor', '');
    GM_setValue('defaultFontSize', '');

    function addGlobalStyle(css) {
        if (css === undefined) {
            css = '';
        }
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css.replace(/;/g, ' !important;');
        head.appendChild(style);
    }

    addGlobalStyle('#saveSettingsButton,#settingsButton{background-color:#9610ff;padding:10px;cursor:pointer;color:#fff}#settingsButton{border-radius:5px;border:none;z-index:9999}#saveSettingsButton:hover,#settingsButton:hover{background-color:#fc03e3}#settingsPanel{min-width:300px;min-height:100px;max-width:400px;background:#181a20;border:1px solid #44495a;border-radius:5px;color:white;padding:10px;box-shadow:0 0 20px -7px #3f424d}#saveSettingsButton{border-radius:5px;border:none;margin-top:10px}.textbox{background-color:#2b2f3a;color:#fff;border:1px solid black;border-radius:5px;padding:5px;width:100%}.textbox:focus{background-color:#363b49;outline:none;border:1px solid #ccc}.changelogLink{color:#fff;text-decoration:none}.hr{border:0;height:1px;min-width:300px;background:#333;background-image:linear-gradient(to right, #ccc, #333, #ccc)}.cb{accent-color:#9610ff;width:16px;height:16px;margin-bottom:-3px}');
    
    // Create the settings panel
    var settingsPanel = document.createElement('div');
    settingsPanel.style.position = 'fixed';
    settingsPanel.style.top = '90px'; // 175
    settingsPanel.style.left = '10px'; // 55
    settingsPanel.style.display = 'none';
    settingsPanel.id = 'settingsPanel'; 
    settingsPanel.innerHTML = `
    <span>Version ${version} | <a href="https://raw.githubusercontent.com/Ghezzo/meganomi/refs/heads/main/changelog.txt" target="_blank" class="changelogLink">Changelog (GitHub)</a></span>
    <h2>Settings</h2>
    <label>
        Asterisk Color <input type="text" id="asteriskColor" class="textbox" value="${GM_getValue('asteriskColor') ?? ''}" placeholder="#ffffff">
        <hr class="hr">
        <span>Shadow (Optional)</span><br><br>
        Color 1 <input type="text" id="asteriskShadow1" class="textbox" value="${GM_getValue('asteriskShadow1') ?? ''}" placeholder="#ffffff">
        Color 2 <input type="text" id="asteriskShadow2" class="textbox" value="${GM_getValue('asteriskShadow2') ?? ''}" placeholder="#ffffff">
    </label>
    <br><hr class="hr">
    <label>
        User Bubble Color<br>
        <input type="text" id="bubbleStyle" class="textbox" value="${GM_getValue('bubbleColor') ?? ''}" placeholder="#ffffff">
    </label>
    <br><hr class="hr">
    <label>
        Nomi Bubble Color<br>
        <input type="text" id="nomiBubbleStyle" class="textbox" value="${GM_getValue('nomiBubbleColor') ?? ''}" placeholder="#000000">
    </label>
    <br><hr class="hr">
    <label>
        Font Size<br>
        <input type="text" id="fontSize" class="textbox" value="${GM_getValue('fontSize') ?? ''}" placeholder="20">
    </label>
    <br><hr class="hr">
    `;
    //color:#fff;text-shadow:1px 1px 10px #fc03e3,1px 1px 10px #ccc
    var br = document.createElement('br');

    function createCheckbox(id, label) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = id;
        checkbox.className = 'cb';
      
        const labelElement = document.createElement('label');
        labelElement.textContent = label;
        labelElement.htmlFor = id;
      
        return [checkbox, labelElement];
    }
      
    const createcheckboxes = [
        createCheckbox('hideCallBtn', 'Hide Call Button'),
        createCheckbox('italicTextCheckbox', 'Italic Asterisk Text'),
        createCheckbox('asterisksCheckbox', 'Enable Asterisks'),
        createCheckbox('hideNewsCheckbox', 'Hide News Bubbles'),
    ];


    // Create a save button
    var saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.id = 'saveSettingsButton';

    var saveInfo = document.createElement('span');
    saveInfo.textContent = 'Saved! Please refresh the page.';
    saveInfo.style.display = 'none';
    //saveButton.id = 'saveSettingsButton';

    // Create the settings button
    var settingsButton = document.createElement('button');
    //settingsButton.textContent = 'MNS Settings';
    settingsButton.innerHTML = '<img src="https://raw.githubusercontent.com/Ghezzo/meganomi/refs/heads/main/assets/settings.svg" style="height: 17px; margin-bottom: -3px; filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(82deg) brightness(105%) contrast(105%);"> MNS';
    settingsButton.style.position = 'fixed';
    settingsButton.style.top = '42px';
    settingsButton.style.left = '10px';
    settingsButton.id = 'settingsButton';

    // Add the checkboxes and labels to the settings panel
    // Append the checkboxes to the settings panel
    createcheckboxes.forEach(([checkbox, label]) => {
        settingsPanel.appendChild(checkbox);
        settingsPanel.appendChild(label);
        settingsPanel.appendChild(br.cloneNode());
    });
    settingsPanel.appendChild(saveButton);
    settingsPanel.appendChild(saveInfo);

    // Add the settings button and panel to the page
    document.body.appendChild(settingsButton);
    document.body.appendChild(settingsPanel);

    // Add an event listener to the settings button
    settingsButton.addEventListener('click', function() {
    if (settingsPanel.style.display === 'none') {
        settingsPanel.style.display = 'block';
    } else {
        settingsPanel.style.display = 'none';
    }
    });

    // Add an event listener to the saveSettingsButton element
    document.getElementById('saveSettingsButton').addEventListener('click', function() {
        saveInfo.style.display = 'inline-block';
        var astColor = document.getElementById('asteriskColor').value;
        var astShadow1 = document.getElementById('asteriskShadow1').value;
        var astShadow2 = document.getElementById('asteriskShadow2').value;
        var bubColor = document.getElementById('bubbleStyle').value;
        var nomiBubColor = document.getElementById('nomiBubbleStyle').value;
        var fontSize = document.getElementById('fontSize').value;
        GM_setValue('asteriskColor', astColor);
        GM_setValue('asteriskShadow1', astShadow1);
        GM_setValue('asteriskShadow2', astShadow2);
        GM_setValue('bubbleColor', bubColor);
        GM_setValue('nomiBubbleColor', nomiBubColor);
        GM_setValue('fontSize', fontSize);

        console.log('Settings saved!');
    });

    GM_config.init();

    ;['asteriskColor', 'asteriskShadow1', 'asteriskShadow2'].forEach(key => {
        if (GM_getValue(key) === "") GM_setValue(key, GM_getValue(`default${key}`));
    });

    var style = '';

    if (await GM_getValue('asteriskColor') === "" || !(await GM_getValue('asteriskColor'))) {
        style = '';
    } else if ((await GM_getValue('asteriskShadow1')) !== "" && (await GM_getValue('asteriskShadow1')) !== undefined && (await GM_getValue('asteriskShadow2')) !== "" && (await GM_getValue('asteriskShadow2')) !== undefined) {
        style = '.text{color: '+GM_getValue('asteriskColor', '')+';text-shadow:1px 1px 10px '+GM_getValue('asteriskShadow1', '')+',1px 1px 10px '+GM_getValue('asteriskShadow2', '')+';}'
    } else {
        style = '.text{color: '+GM_getValue('asteriskColor', '')+';}'
    }

    addGlobalStyle(style);

    ['bubbleColor', 'nomiBubbleColor', 'fontSize'].forEach(async (key) => {
        if (await GM_getValue(key) === "") {
            GM_setValue(key, GM_getValue(`default${key.charAt(0).toUpperCase() + key.slice(1)}`));
        }
        addGlobalStyle(GM_getValue(key, ''));
    });

    const checkboxElements = createcheckboxes.map(([checkbox]) => checkbox);

    const checkboxesData = [
        { id: 'hideCallButton', element: checkboxElements[0], default: false },
        { id: 'italicTextCheckbox', element: checkboxElements[1], default: false },
        { id: 'asterisksCheckbox', element: checkboxElements[2], default: true },
        { id: 'hideNewsCheckbox', element: checkboxElements[3], default: false }
    ];

    checkboxesData.forEach(({ id, element, default: defaultValue }) => {
        element.checked = GM_getValue(id, defaultValue);
        element.addEventListener('change', () => {
            GM_setValue(id, element.checked);
        });
        if (element.checked) {
            element.dispatchEvent(new Event('change'));
        }
    });

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

    /* function checkVersion() {
        var settingsButton = document.getElementById('settingsButton');
        var originalText = settingsButton.textContent;
        fetch('https://raw.githubusercontent.com/Ghezzo/meganomi/refs/heads/main/version.txt')
            .then(response => response.text())
            .then(data => {
                if (data !== version) {
                    console.log('New version available!');
                    //var settingsButton = document.getElementById('settingsButton');
                    //var originalText = settingsButton.textContent;
                    settingsButton.innerHTML = originalText + ' <span style="color: #6cff00;"><b>&#129145;</b></span>';
                } else {
                    console.log('Version is up to date.');
                    //var settingsButton = document.getElementById('settingsButton');
                    //var originalText = settingsButton.textContent;
                    settingsButton.textContent = originalText;
                }
            });
    }
    checkVersion(); */
    /* var buttonAdded = false;
    function addSettingsButton() {
        setTimeout(function() {
            if (!buttonAdded) {
                console.log('Adding settings button...');
                var div = document.querySelector('nav[aria-label="Chats"] > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)');
                if (div) {
                    var button = document.createElement('button');
                    button.id = 'settingsButton2';
                    button.innerHTML = '<img src="https://raw.githubusercontent.com/Ghezzo/meganomi/refs/heads/main/assets/settings.svg" style="height: 17px; margin-bottom: -3px; filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(82deg) brightness(105%) contrast(105%);"> MNS';
                    addGlobalStyle('#settingsButton2{background-color:#9610ff;cursor:pointer;color:#fff}#settingsButton2{border-radius:5px;border:none;z-index:9999},#settingsButtons2:hover{background-color:#fc03e3}');
                    div.appendChild(button);
                    buttonAdded = true;
                    button.addEventListener('click', function() {
                    console.log('Settings button clicked!');
                    if (settingsPanel.style.display === 'none') {
                        settingsPanel.style.display = 'block';
                    } else {
                        settingsPanel.style.display = 'none';
                    }
                    });
                    
                }
            }
        }, 500);
    } */
    

    const observer = new MutationObserver(mutations => {
        /* if (!document.getElementById('settingsButton2')) {
            addSettingsButton();
        } */
        for (const mutation of mutations) {
            //addSettingsButton();
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
    //addSettingsButton();
})();
