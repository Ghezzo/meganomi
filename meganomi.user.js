// ==UserScript==
// @name         Mega Nomi Script beta
// @namespace    https://gzo.sh
// @version      0.9.9.1
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
// @grant        GM_addValueChangeListener
// @downloadURL  https://github.com/Ghezzo/meganomi/raw/refs/heads/main/meganomi.user.js
// @updateURL    https://github.com/Ghezzo/meganomi/raw/refs/heads/main/meganomi.user.js
// ==/UserScript==

(async function() {
    'use strict';

    console.log('Mega Nomi Script loaded!');

    /* const styleElement = document.createElement('style'); */
    const dynamicStyle = document.createElement('style');
    /* document.head.appendChild(styleElement); */
    document.head.appendChild(dynamicStyle);
  
    var version = '0.9.9.1';
    GM_setValue('defaultAsteriskColor', '');
    GM_setValue('defaultAsteriskColor2', '');
    GM_setValue('defaultAsteriskShadow1', '');
    GM_setValue('defaultAsteriskShadow2', '');
    GM_setValue('defaultAsteriskShadow3', '');
    GM_setValue('defaultAsteriskShadow4', '');
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
    // Create the settings panel
    var settingsPanel = document.createElement('div');
    settingsPanel.style.position = 'fixed';
    settingsPanel.style.display = 'none';
    settingsPanel.id = 'settingsPanel';
    settingsPanel.innerHTML = `
    <span class="info">Version ${version} | <a href="https://raw.githubusercontent.com/Ghezzo/meganomi/refs/heads/main/changelog.txt" target="_blank" class="changelogLink">Changelog (GitHub)</a></span>
    <h2>Settings</h2>
    <label>
        User Action Text Color <input type="text" id="asteriskColor" class="textbox" value="${GM_getValue('asteriskColor') ?? ''}" placeholder="#ffffff">
    </label>
    <label>
        Nomi Action Text Color <input type="text" id="asteriskColor2" class="textbox" value="${GM_getValue('asteriskColor2') ?? ''}" placeholder="#ffffff">
    </label>
    <br><hr class="hr">
    Action Text Glow<br><br>
    <table>
        <tr>
            <th>User</th>
            <th>Nomi</th>
        </tr>
        <tr>
            <td><input type="text" id="asteriskShadow1" class="textbox" value="${GM_getValue('asteriskShadow1') ?? ''}" placeholder="#ffffff"></td>
            <td><input type="text" id="asteriskShadow3" class="textbox" value="${GM_getValue('asteriskShadow3') ?? ''}" placeholder="#ffffff"></td>
        </tr>
        <tr>
            <td><input type="text" id="asteriskShadow2" class="textbox" value="${GM_getValue('asteriskShadow2') ?? ''}" placeholder="#ffffff"></td>
            <td><input type="text" id="asteriskShadow4" class="textbox" value="${GM_getValue('asteriskShadow4') ?? ''}" placeholder="#ffffff"></td>
            <td></td>
        </tr>
    </table>
    <hr class="hr">
    Bubble Color<br><br>
    <table>
        <tr>
            <th>User</th>
            <th>Nomi</th>
        </tr>
        <tr>
            <td><input type="text" id="bubbleStyle" class="textbox" value="${GM_getValue('bubbleColor') ?? ''}" placeholder="#ffffff"></td>
            <td><input type="text" id="nomiBubbleStyle" class="textbox" value="${GM_getValue('nomiBubbleColor') ?? ''}" placeholder="#000000"></td>
        </tr>
    </table>
    <hr class="hr">
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
        createCheckbox('italicTextCheckbox', 'Italic Action Text'),
        createCheckbox('boldActionText', 'Bold Action Text'),
        createCheckbox('asterisksCheckbox', 'Enable Asterisks (Refresh to apply)'),
        createCheckbox('hideNewsCheckbox', 'Hide News Bubbles'),
        
        /* createCheckbox('settingsLightMode', 'Settings Light Mode (Experimental)'), */
    ];

    // Create a save button
    var saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.id = 'saveSettingsButton';

    var settingsButtonNew = document.createElement('button');
    settingsButtonNew.innerHTML = '<img src="https://raw.githubusercontent.com/Ghezzo/meganomi/refs/heads/main/assets/settings.svg" style="height: 17px; margin-bottom: -3px; filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(82deg) brightness(105%) contrast(105%);" class="cogIcon">';
    settingsButtonNew.style.position = 'fixed';
    settingsButtonNew.style.top = '0px';
    settingsButtonNew.style.left = '100px';
    settingsButtonNew.id = 'settingsButtonNew';

    // Add the checkboxes and labels to the settings panel
    // Append the checkboxes to the settings panel
    createcheckboxes.forEach(([checkbox, label]) => {
        settingsPanel.appendChild(checkbox);
        settingsPanel.appendChild(label);
        settingsPanel.appendChild(br.cloneNode());
    });
    settingsPanel.appendChild(saveButton);

    // Add the settings button and panel to the page
    document.body.appendChild(settingsButtonNew);
    document.body.appendChild(settingsPanel);

    // Add an event listener to the settings button
    settingsButtonNew.addEventListener('click', function() {
        if (settingsPanel.style.display === 'none') {
            settingsPanel.style.display = 'block';
        } else {
            settingsPanel.style.display = 'none';
        }
    });

    // Add an event listener to the saveSettingsButton element
    document.getElementById('saveSettingsButton').addEventListener('click', function() {
        var astColor = document.getElementById('asteriskColor').value;
        var astColor2 = document.getElementById('asteriskColor2').value;
        var astShadow1 = document.getElementById('asteriskShadow1').value;
        var astShadow2 = document.getElementById('asteriskShadow2').value;
        var astShadow3 = document.getElementById('asteriskShadow3').value;
        var astShadow4 = document.getElementById('asteriskShadow4').value;
        var bubColor = document.getElementById('bubbleStyle').value;
        var nomiBubColor = document.getElementById('nomiBubbleStyle').value;
        var fontSize = document.getElementById('fontSize').value;
        GM_setValue('asteriskColor', astColor);
        GM_setValue('asteriskColor2', astColor2);
        GM_setValue('asteriskShadow1', astShadow1);
        GM_setValue('asteriskShadow2', astShadow2);
        GM_setValue('asteriskShadow3', astShadow3);
        GM_setValue('asteriskShadow4', astShadow4);
        GM_setValue('bubbleColor', bubColor);
        GM_setValue('nomiBubbleColor', nomiBubColor);
        GM_setValue('fontSize', fontSize);

        const saveButton = document.getElementById('saveSettingsButton');
        const originalText = saveButton.textContent;
        saveButton.textContent = 'Saved!';
        //saveButton.style.backgroundColor = 'green !important';
        saveButton.style.setProperty('background-color', 'green', 'important');
        setTimeout(() => {
            saveButton.textContent = originalText;
            saveButton.style.removeProperty('background-color');
        }, 500);
        
        console.log('Settings saved!');
    });

    GM_config.init();

    ;['asteriskColor', 'asteriskShadow1', 'asteriskShadow2'].forEach(key => {
        if (GM_getValue(key) === "") GM_setValue(key, GM_getValue(`default${key}`));
    });

    function debounce(func, delay = 100) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    async function updateAllStyles() {
        const asteriskColor = await GM_getValue('asteriskColor', '');
        const asteriskColor2 = await GM_getValue('asteriskColor2', '');
        const shadow1 = await GM_getValue('asteriskShadow1', '');
        const shadow2 = await GM_getValue('asteriskShadow2', '');
        const shadow3 = await GM_getValue('asteriskShadow3', '');
        const shadow4 = await GM_getValue('asteriskShadow4', '');
        const fontSize = await GM_getValue('fontSize', '16px');
        const bubbleColor = await GM_getValue('bubbleColor', '#ffffff');
        const nomiBubbleColor = await GM_getValue('nomiBubbleColor', '#eeeeee');
        const italicTextCheckbox = await GM_getValue('italicTextCheckbox', false);
        const boldActionText = await GM_getValue('boldActionText', false);
        const hideCallButton = await GM_getValue('hideCallButton', false);
        const asterisksCheckbox = await GM_getValue('asterisksCheckbox', true);
    
        let css = '';
    
        // Build .user styles
        css += `.user { 
            ${asteriskColor ? `color: ${asteriskColor};` : ''}
            background-color: ${bubbleColor};
            font-size: ${fontSize};
            transition: color 0.5s ease, text-shadow 0.5s ease, background-color 0.5s ease, font-size 0.3s ease;
            ${shadow1 && shadow2 ? `text-shadow: 1px 1px 10px ${shadow1}, 1px 1px 10px ${shadow2};` : ''}
        }`;

        // Build .nomi styles
        css += `.nomi { 
            ${asteriskColor2 ? `color: ${asteriskColor2};` : ''}
            background-color: ${nomiBubbleColor};
            font-size: ${fontSize};
            transition: color 0.5s ease, text-shadow 0.5s ease, background-color 0.5s ease, font-size 0.3s ease;
            ${shadow3 && shadow4 ? `text-shadow: 1px 1px 10px ${shadow3}, 1px 1px 10px ${shadow4};` : ''}
        }`;

    
        // Update the <style> content
        dynamicStyle.textContent = css;
        updateTextClasses(italicTextCheckbox, boldActionText);
        updateCallButtonVisibility(hideCallButton);
        reprocessTextNodes();
        console.log('Updating styles...');
    }

    function reprocessTextNodes() {
        const textElements = document.querySelectorAll('.text');
    
        textElements.forEach(el => {
            const originalText = el.dataset.original;
            if (!originalText) return; // Skip if no original text
    
            const tempNode = document.createTextNode(originalText);
            processTextNode(tempNode);
    
            el.replaceWith(tempNode.parentNode || tempNode);
        });
    }

    function updateTextClasses(italicEnabled, boldEnabled) {
        const textElements = document.querySelectorAll('.text');
    
        textElements.forEach(el => {
            el.classList.toggle('italic', italicEnabled);
            el.classList.toggle('bold', boldEnabled);
        });
    }

    function updateCallButtonVisibility(hide) {
        const buttons = document.querySelectorAll('button[title="Call"]');
        if (!buttons) return;
    
        buttons.forEach(button => button.style.display = hide ? 'none' : '');
    }

    const debouncedUpdateAllStyles = debounce(updateAllStyles, 100);

    updateAllStyles();

    if (typeof GM_addValueChangeListener === 'function') {
        const settingsToWatch = [
            'asteriskColor', 'asteriskColor2',
            'asteriskShadow1', 'asteriskShadow2',
            'asteriskShadow3', 'asteriskShadow4',
            'fontSize', 'bubbleColor', 'nomiBubbleColor',
            'italicTextCheckbox', 'boldActionText',
            'hideCallButton', 'asterisksCheckbox'
        ];
    
        for (const setting of settingsToWatch) {
            GM_addValueChangeListener(setting, debouncedUpdateAllStyles);
        }
    }

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
        { id: 'boldActionText', element: checkboxElements[2], default: false },
        { id: 'asterisksCheckbox', element: checkboxElements[3], default: true },
        { id: 'hideNewsCheckbox', element: checkboxElements[4], default: false },
        /* { id: 'settingsLightMode', element: checkboxElements[4], default: false }, */
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

    const isLightMode = GM_getValue('settingsLightMode', false);

    /* if (isLightMode) {
        addGlobalStyle('#settingsButtonNew{background-color:#6200ea;cursor:pointer;color:#fff;border-radius:0px 0px 5px 5px;border:none;z-index:9999;padding:5px;width:50px}#settingsButtonNew:hover{background-color:#7c1eff}#settingsButtonNew:hover .cogIcon{animation:rotate 2s linear infinite}#saveSettingsButton,#settingsButton{background-color:#6200ea;transition:background-color .2s ease-out;padding:10px;cursor:pointer;color:#fff}#settingsButton{border-radius:5px;border:none;z-index:9999}#saveSettingsButton:hover,#settingsButton:hover{background-color:#7c1eff !important}#settingsButton:hover .cogIcon{animation:rotate 2s linear infinite}@keyframes rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}#settingsPanel{min-width:300px;min-height:100px;max-width:400px;background:#ffffff;border:1px solid #d7d7d7;border-radius:5px;color:black;padding:10px;box-shadow:0 0 20px -7px #6200ea}#saveSettingsButton{border-radius:5px;border:none;margin-top:10px;color:white}.textbox{background-color:#fafafa;transition:background-color .2s ease-out;color:#000;border:1px solid #ccc;border-radius:5px;padding:5px;width:100%}.textbox:focus{background-color:#f2f2f2;outline:none;border:1px solid #666}.textbox:hover{background-color:#f2f2f2;outline:none;border:1px solid #666}.changelogLink{color:#6200ea;text-decoration:none;transition:color .2s ease-out}.changelogLink:hover{color:#7c1eff !important}.hr{border:0;height:1px;min-width:300px;background:#ccc;background-image:linear-gradient(to right, #333, #ccc, #333)}.cb{accent-color:#6200ea;width:16px;height:16px;margin-bottom:-3px}.info{font-size:13px}');
    } else { */
        addGlobalStyle('#settingsButtonNew{background-color:#9610ff;cursor:pointer;color:#fff;border-radius:0px 0px 5px 5px;border:none;z-index:9999;padding:5px;width:50px}#settingsButtonNew:hover{background-color:#ac43ff}#settingsButtonNew:hover .cogIcon{animation:rotate 2s linear infinite}#saveSettingsButton,#settingsButton{background-color:#9610ff;transition:background-color .2s ease-out;padding:10px;cursor:pointer;color:#fff}#settingsButton{border-radius:5px;border:none;z-index:9999}#saveSettingsButton:hover,#settingsButton:hover{background-color:#a12aff !important}#settingsButton:hover .cogIcon{animation:rotate 2s linear infinite}@keyframes rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}#settingsPanel{min-width:200px;height:720px;max-height:calc(100% - 35px);max-width:300px;background:#181a20;border:1px solid #44495a;border-radius:5px;color:white;padding:10px;box-shadow:0 0 20px -7px #9610ff;top:35px;left:10px;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;touch-action:pan-y;scrollbar-width:none}#saveSettingsButton{border-radius:5px;border:none;margin-top:10px}.textbox{background-color:#2b2f3a;transition:background-color .2s ease-out;color:#fff;border:1px solid black;border-radius:5px;padding:5px;width:100%}.textbox:focus{background-color:#363b49;outline:none;border:1px solid #ccc}.textbox:hover{background-color:#363b49;outline:none;border:1px solid #ccc}.changelogLink{color:#9610ff;text-decoration:none;transition:color .2s ease-out}.changelogLink:hover{color:#a12aff !important}.hr{border:0;height:1px;min-width:300px;background:#333;background-image:linear-gradient(to right, #ccc, #333, #ccc)}.cb{accent-color:#9610ff;width:16px;height:16px;margin-bottom:-3px}.info{font-size:13px}.bold{font-weight:bold}.italic{font-style:italic}');
    /* } */


    //function processTextNode(node) {
        //const italicPattern = /\*(\S(.*?\S)?)\*/g;

        /* const useAsterisks = GM_getValue('asterisksCheckbox', true);
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
    } */

    async function processTextNode(node) {
        const italicPattern = /\*(\S(.*?\S)?)\*/g;
    
        const useAsterisks = await GM_getValue('asterisksCheckbox', true);
        const italicTextCheckbox = await GM_getValue('italicTextCheckbox', false);
        const boldActionText = await GM_getValue('boldActionText', false);
    
        const originalText = node.textContent;
    
        const newHTML = originalText.replace(italicPattern, (match, p1) => {
            const classes = ['text'];
            if (italicTextCheckbox) classes.push('italic');
            if (boldActionText) classes.push('bold');
    
            const formattedText = `<span class="${classes.join(' ')}">${p1}</span>`;
            return useAsterisks ? `*${formattedText}*` : formattedText;
        });
    
        if (newHTML !== originalText) {
            const span = document.createElement('span');
            span.innerHTML = newHTML;
            span.dataset.original = originalText; // <-- Save original text
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
    
                        const textSpans = div.querySelectorAll('span.text'); // <-- FIXED
                        textSpans.forEach(span => {
                            span.classList.add('nomi');
                        });
                    }
                } else if (type === 'User') {
                    const childDiv = div.querySelector('div');
                    if (childDiv) {
                        childDiv.style.fontSize = GM_getValue('fontSize') + 'px';
                        div.style.backgroundColor = GM_getValue('bubbleColor');
    
                        const textSpans = div.querySelectorAll('span.text'); // <-- FIXED
                        textSpans.forEach(span => {
                            span.classList.add('user');
                        });
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

    function scrollBars() {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
            ::-webkit-scrollbar {
                width: 10px;
                height: 10px;
            }
            ::-webkit-scrollbar-thumb {
                background-color: #757575;
                border-radius: 5px;
            }
            ::-webkit-scrollbar-thumb:hover {
                background-color: #838383;
            }
            ::-webkit-scrollbar-track {
                background-color: #2e2e2e;
                border-radius: 5px;
                box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            }
        `;
        document.head.appendChild(style);
    }

    scrollBars();
    chatBubbleColor();
    if (GM_getValue('hideCallButton', false)) {
        hideCallButton();
    }

    if (GM_getValue('hideNewsCheckbox', false)) {
        hideNews();
    }
    
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
