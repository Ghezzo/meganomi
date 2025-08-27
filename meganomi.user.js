// ==UserScript==
// @name         Mega Nomi Script beta
// @namespace    https://gzo.sh
// @version      1.0.7
// @description  Everything in one :)
// @author       Ghezzo
// @match        https://beta.nomi.ai/nomis*
// @match        https://beta.nomi.ai/group-chats*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nomi.ai
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @resource     REMOTE_CSS2 https://raw.githubusercontent.com/Ghezzo/meganomi/refs/heads/main/style.css
// @resource     REMOTE_CSS https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.css
// @require      https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_addValueChangeListener
// @downloadURL  https://github.com/Ghezzo/meganomi/raw/refs/heads/main/meganomi.user.js
// @updateURL    https://github.com/Ghezzo/meganomi/raw/refs/heads/main/meganomi.user.js
// ==/UserScript==
//alert('Mega Nomi Script is most likely dead. Please disable it.');
(async function() {
    
    'use strict';

    console.log('MNS loaded!');

    /* const styleElement = document.createElement('style'); */
    const dynamicStyle = document.createElement('style');
    /* document.head.appendChild(styleElement); */
    document.head.appendChild(dynamicStyle);
    const myCss = GM_getResourceText("REMOTE_CSS");
    const myCss2 = GM_getResourceText("REMOTE_CSS2");
    GM_addStyle(myCss);
    GM_addStyle(myCss2);
    Coloris({
        el: '.clr',
        themeMode: 'dark',
        alpha: false,
        closeButton: true,
        clearButton: true,
        wrap: true,
      });
    
  
    var version = '1.0.7';
    GM_setValue('defaultAsteriskColor', '');
    GM_setValue('defaultAsteriskColor2', '');
    GM_setValue('defaultAsteriskShadow1', '');
    GM_setValue('defaultAsteriskShadow2', '');
    GM_setValue('defaultAsteriskShadow3', '');
    GM_setValue('defaultAsteriskShadow4', '');
    GM_setValue('defaultBubbleColor', '');
    GM_setValue('defaultNomiBubbleColor', '');
    GM_setValue('defaultFontSize', '');

    // Create the settings panel
    var settingsPanel = document.createElement('div');
    settingsPanel.style.position = 'fixed';
    settingsPanel.style.display = 'none';
    settingsPanel.id = 'settingsPanel';
    settingsPanel.innerHTML = `
    <h2 class="settingstitle">Settings</h2><span class="info">${version}</span>
    <details>
        <summary style="cursor:pointer;text-align:center;display:inline-block;width:100%;" class="h4"><img class="arrow" src="https://raw.githubusercontent.com/Ghezzo/meganomi/refs/heads/main/assets/arrowright.svg" alt="arrow"> Action Text Color</summary>
        <div class="section">
            <!--<h3 class="h4">Action Text Color</h3>-->
            <table>
                <tr>
                    <th><label for="asteriskColor">User</label></th>
                    <th><label for="asteriskColor2">Nomi</label></th>
                </tr>
                <tr>
                    <td><input type="text" id="asteriskColor" class="textbox clr" value="${GM_getValue('asteriskColor') ?? ''}" placeholder="#ffffff" data-coloris></td>
                    <td><input type="text" id="asteriskColor2" class="textbox clr" value="${GM_getValue('asteriskColor2') ?? ''}" placeholder="#ffffff" data-coloris></td>
                </tr>
            </table>
        </div>
    </details>

    <details>
        <summary style="cursor:pointer;text-align:center;display:inline-block;width:100%;" class="h4"><img class="arrow" src="https://raw.githubusercontent.com/Ghezzo/meganomi/refs/heads/main/assets/arrowright.svg" alt="arrow"> Action Text Glow</summary>
        <div class="section">
            <!--<h3 class="h4">Action Text Glow</h3>-->
            <table>
                <tr>
                    <th>User</th>
                    <th>Nomi</th>
                </tr>
                <tr>
                    <td><input type="text" id="asteriskShadow1" class="textbox clr" value="${GM_getValue('asteriskShadow1') ?? ''}" placeholder="#ffffff" data-coloris></td>
                    <td><input type="text" id="asteriskShadow3" class="textbox clr" value="${GM_getValue('asteriskShadow3') ?? ''}" placeholder="#ffffff" data-coloris></td>
                </tr>
                <tr>
                    <td><input type="text" id="asteriskShadow2" class="textbox clr" value="${GM_getValue('asteriskShadow2') ?? ''}" placeholder="#ffffff" data-coloris></td>
                    <td><input type="text" id="asteriskShadow4" class="textbox clr" value="${GM_getValue('asteriskShadow4') ?? ''}" placeholder="#ffffff" data-coloris></td>
                </tr>
            </table>
        </div>
    </details>

    <details>
        <summary style="cursor:pointer;text-align:center;display:inline-block;width:100%;" class="h4"><img class="arrow" src="https://raw.githubusercontent.com/Ghezzo/meganomi/refs/heads/main/assets/arrowright.svg" alt="arrow"> Bubble Color</summary>
        <div class="section">
            <!--<h3 class="h4">Bubble Color</h3>-->
            <table>
                <tr>
                    <th><label for="bubbleStyle">User</label></th>
                    <th><label for="nomiBubbleStyle">Nomi</label></th>
                </tr>
                <tr>
                    <td><input type="text" id="bubbleStyle" class="textbox clr" value="${GM_getValue('bubbleColor') ?? ''}" placeholder="#ffffff" data-coloris></td>
                    <td><input type="text" id="nomiBubbleStyle" class="textbox clr" value="${GM_getValue('nomiBubbleColor') ?? ''}" placeholder="#000000" data-coloris></td>
                </tr>
            </table>
        </div>
    </details>

    <details>
        <summary style="cursor:pointer;text-align:center;display:inline-block;width:100%;" class="h4"><img class="arrow" src="https://raw.githubusercontent.com/Ghezzo/meganomi/refs/heads/main/assets/arrowright.svg" alt="arrow"> Font Size</summary>
        <div class="section">
            <label>
                <!--<h3 class="h4">Font Size</h3>-->
                <input type="text" id="fontSize" class="textbox" value="${GM_getValue('fontSize') ?? ''}" placeholder="20">
            </label>
        </div>
    </details>
    `;

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
        createCheckbox('birthdayCheckbox', 'Show Nomi Birthday (experimental)'),
        
        /* createCheckbox('settingsLightMode', 'Settings Light Mode (Experimental)'), */
    ];

    var versionText = document.createElement('span');
    versionText.textContent = 'Version ' + version;
    versionText.className = 'info';

    // Create a save button
    var saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.id = 'saveSettingsButton';

    var closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.id = 'closeSettingsButton';

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
    const buttonWrapper = document.createElement('div');
    buttonWrapper.appendChild(saveButton);
    buttonWrapper.appendChild(closeButton);
    buttonWrapper.className = "buttonWrapper";
    settingsPanel.appendChild(buttonWrapper);

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

    closeButton.addEventListener('click', function() {
        if (settingsPanel.style.display === 'block') {
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
        const bubbleColor = await GM_getValue('bubbleColor', '');
        const nomiBubbleColor = await GM_getValue('nomiBubbleColor', '');
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
        console.log('Applying changes!');
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
            'hideCallButton', 'asterisksCheckbox',
            'birthDayCheckbox'
        ];
    
        for (const setting of settingsToWatch) {
            GM_addValueChangeListener(setting, debouncedUpdateAllStyles);
        }
    }

    ['bubbleColor', 'nomiBubbleColor', 'fontSize'].forEach(async (key) => {
        if (await GM_getValue(key) === "") {
            GM_setValue(key, GM_getValue(`default${key.charAt(0).toUpperCase() + key.slice(1)}`));
        }
        //addGlobalStyle(GM_getValue(key, ''));
        GM_addStyle(GM_getValue(key, ''));
    });

    const checkboxElements = createcheckboxes.map(([checkbox]) => checkbox);

    const checkboxesData = [
        { id: 'hideCallButton', element: checkboxElements[0], default: false },
        { id: 'italicTextCheckbox', element: checkboxElements[1], default: false },
        { id: 'boldActionText', element: checkboxElements[2], default: false },
        { id: 'asterisksCheckbox', element: checkboxElements[3], default: true },
        { id: 'hideNewsCheckbox', element: checkboxElements[4], default: false },
        { id: 'birthdayCheckbox', element: checkboxElements[5], default: false },
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

    //GM_addStyle('#settingsButtonNew{background-color:#484848;cursor:pointer;color:#fff;border-radius:0px 0px 5px 5px;border:none;z-index:9999;padding:5px;width:50px}#settingsButtonNew:hover{background-color:#545454}#settingsButtonNew:hover .cogIcon{animation:rotate 2s linear infinite}#saveSettingsButton,#settingsButton,#closeSettingsButton{background-color:#545454;transition:background-color .2s ease-out;padding:10px;cursor:pointer;color:#fff}#settingsButton{border-radius:5px;border:none;z-index:9999}#saveSettingsButton:hover,#settingsButton:hover,#closeSettingsButton:hover{background-color:#616161 !important}#settingsButton:hover .cogIcon{animation:rotate 2s linear infinite}@keyframes rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}#settingsPanel{width:335px;max-height:calc(100% - 40px);background:#2e2e2e;border-radius:5px;color:white;padding:10px;top:40px;left:10px;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;touch-action:pan-y;scrollbar-width:none}#saveSettingsButton{border-radius:5px;border:none;margin-top:10px;width:100%;float:left;margin-right:10px}#closeSettingsButton{border-radius:5px;border:none;margin-top:10px;width:65px;float:left}.buttonWrapper{display:flex}.textbox{background-color:#35383f;transition:background-color .2s ease-out;color:#fff;border:1px solid #545963;border-radius:5px;padding:5px;width:100%;font-size:16px}.textbox::placeholder{color:#bbb}.textbox:focus{background-color:#292c31;outline:none}.textbox:hover{background-color:#292c31;outline:none}.changelogLink{color:#9610ff;text-decoration:none;transition:color .2s ease-out}.changelogLink:hover{color:#a12aff !important}.hr{border:0;height:1px;background:#44495a}.cb{accent-color:#545454;width:16px;height:16px;margin-bottom:-3px}.info{font-size:13px;color:#777;float:right;margin-top:-30px}.bold{font-weight:bold}.italic{font-style:italic}.h4{margin-top:0px;margin-bottom:10px;text-align:center;color:#fff}.settingstitle{text-align:center;margin-top:0px;margin-bottom:5px}.clr-field button{width:22px;height:22px;left:5px;right:auto;border-radius:5px;border:1px solid black}.clr-field input{padding-left:36px}#clr-color-value{font-size:16px}.nomi-birthday{margin-left:8px;font-weight:bold;background:#2e2e2e;border-radius:15px;padding-left:10px;padding-right:10px}.section{padding-left:7px;padding-right:7px;border-radius:5px;margin-top:7px;margin-bottom:7px}summary{border-radius:5px;font-weight:bold;margin:-0.5em -0.5em 0;padding:.5em;display:flex;align-items:center}details{padding:.5em .5em 0;background-color:#262626;border:1px solid #404040;margin-bottom:5px}summary img.arrow{width:14px;height:14px;margin-right:3px;margin-bottom:-1px;transition:transform .2s ease;filter:invert(100%) sepia(100%) saturate(0%) hue-rotate(211deg) brightness(107%) contrast(101%)}details[open] summary img.arrow{transform:rotate(90deg)}');

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
        const buttons = document.querySelectorAll('button[aria-label="Call"]');
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
    Coloris.wrap('.clr');


    (async () => {
        const enabled = GM_getValue('birthdayCheckbox', false); // default: true
        if (!enabled) return;

        const formatDate = iso => {
            const d = new Date(iso);
            return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
        };
        /* const formatDate = iso => {
            const d = new Date(iso);
            return `${d.getUTCFullYear()}-${(d.getUTCMonth()+1).toString().padStart(2,'0')}-${d.getUTCDate().toString().padStart(2,'0')} ${d.getUTCHours().toString().padStart(2,'0')}:${d.getUTCMinutes().toString().padStart(2,'0')}`;
        }; */


        const getId = () => {
            const parts = location.pathname.split('/');
            return parts.pop() || parts.pop();
        };

        const waitFor = (sel, timeout = 10000) => new Promise((res, rej) => {
            const el = document.querySelector(sel);
            if (el) return res(el);
            const obs = new MutationObserver(() => {
                const el = document.querySelector(sel);
                if (el) {
                    obs.disconnect();
                    res(el);
                }
            });
            obs.observe(document.body, { childList: true, subtree: true });
            setTimeout(() => { obs.disconnect(); rej(); }, timeout);
        });

        const insert = async () => {
            const id = getId();
            if (!id) return;
            try {
                const res = await fetch(`https://beta.nomi.ai/api/nomis/${id}`);
                const data = await res.json();
                if (!data?.created) return;
                const btn = await waitFor('button[aria-label="Memory Indicator"]');
                const parent = btn.parentElement;
                if (!parent.querySelector('.nomi-birthday')) {
                    const span = document.createElement('span');
                    span.className = 'nomi-birthday';
                    span.textContent = formatDate(data.created);
                    parent.appendChild(span);
                }
            } catch (e) {
                console.error('Nomi script error:', e);
            }
        };

        const observeUrl = () => {
            ['pushState', 'replaceState'].forEach(fn => {
                const orig = history[fn];
                history[fn] = function (...args) {
                    orig.apply(this, args);
                    setTimeout(insert, 0);
                };
            });
            window.addEventListener('popstate', insert);
        };

        insert();
        observeUrl();
    })();


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
