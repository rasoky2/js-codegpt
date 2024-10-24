// ==UserScript==
// @name         Generate CSS for Specific Div with One Dark Pro Theme and Google Font
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Creates a CSS file for the div with specific classes and styles, using One Dark Pro theme colors and Google Font 'Source Code Pro'. Allows importing JSON configuration files for customization and importing local fonts or color schemes. Adds buttons for font and theme customization with dropdown menus and dark theme styling. Fixes event handlers for cloned buttons in dropdown menu.
// @author       Rasoky
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Add Google Fonts link to the head
    const googleFontsLink = document.createElement('link');
    googleFontsLink.rel = 'stylesheet';
    googleFontsLink.href = 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap';
    document.head.appendChild(googleFontsLink);

    // Create a style element
    const style = document.createElement('style');
    style.type = 'text/css';

    // Define the CSS for the specified div with One Dark Pro theme and Google Font
    const css = `
        .overflow-y-auto.p-4 {
            position: relative;
            display: flex;
            align-items: flex-start;
            padding: 0px;
            margin: 0px;
            overflow: auto hidden;
            background: #282c34;
            color: #abb2bf;
            font-family: 'Source Code Pro', monospace;
        }

        code.hljs {
            color: #abb2bf;
            background: #282c34;
            font-family: 'Source Code Pro', monospace;
        }

        code.hljs .hljs-comment,
        code.hljs .hljs-quote {
            color: #5c6370;
            font-style: italic;
        }

        code.hljs .hljs-keyword,
        code.hljs .hljs-selector-tag,
        code.hljs .hljs-literal,
        code.hljs .hljs-section,
        code.hljs .hljs-link {
            color: #c678dd;
            font-weight: bold;
        }

        code.hljs .hljs-string,
        code.hljs .hljs-title,
        code.hljs .hljs-name,
        code.hljs .hljs-type,
        code.hljs .hljs-attribute,
        code.hljs .hljs-symbol,
        code.hljs .hljs-bullet,
        code.hljs .hljs-addition {
            color: #98c379;
            font-weight: bold;
        }

        code.hljs .hljs-deletion,
        code.hljs .hljs-selector-attr,
        code.hljs .hljs-selector-pseudo,
        code.hljs .hljs-meta {
            color: #e06c75;
        }

        code.hljs .hljs-attribute {
            color: #d19a66;
        }

        code.hljs .hljs-symbol,
        code.hljs .hljs-number {
            color: #d19a66;
        }

        code.hljs .hljs-meta .hljs-string {
            color: #56b6c2;
        }

        code.hljs .hljs-emphasis {
            font-style: italic;
        }

        code.hljs .hljs-strong {
            font-weight: bold;
        }

        /* Contextual Categorization */
        code.hljs .hljs-variable {
            color: #e06c75;
            font-weight: bold;
        }

        code.hljs .hljs-parameter {
            color: #d19a66;
            font-style: italic;
        }

        code.hljs .hljs-function {
            color: #61afef;
            font-weight: bold;
        }

        /* Dynamic Conditional Highlighting */
        .hljs-variable.readwrite {
            color: #e5c07b;
        }

        .hljs-function.declaration {
            color: #c678dd;
        }

        /* Dropdown menu styling */
        .dropdown-button {
            background-color: #282c34;
            color: #abb2bf;
            border: 1px solid #4d4d4d;
            padding: 5px;
            border-radius: 5px;
            cursor: pointer;
            height: 35px;
        }

        .dropdown-button:hover {
            background-color: #3c3f47;
        }

        .dropdown-menu {
            background-color: #333;
            color: #fff;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
        }

        .dropdown-menu button {
            background: none;
            border: none;
            color: #fff;
            cursor: pointer;
            padding: 5px;
            width: 100%;
            text-align: left;
        }

        .dropdown-menu button:hover {
            background-color: #444;
        }
    `;

    // Append the CSS to the style element
    style.appendChild(document.createTextNode(css));

    // Append the style element to the head of the document
    document.head.appendChild(style);

    // Add a new button for theme customization with a dropdown menu
    const optionsButtonContainer = document.createElement('div');
    optionsButtonContainer.className = 'dropdown-container';
    optionsButtonContainer.style.position = 'fixed';
    optionsButtonContainer.style.top = '60px';
    optionsButtonContainer.style.right = '15px';
    optionsButtonContainer.style.zIndex = '9999';

    const optionsButton = document.createElement('button');
    optionsButton.innerText = 'Options';
    optionsButton.className = 'dropdown-button';

    const optionsDropdownMenu = document.createElement('div');
    optionsDropdownMenu.className = 'dropdown-menu';
    optionsDropdownMenu.style.display = 'none';
    optionsDropdownMenu.style.position = 'absolute';
    optionsDropdownMenu.style.top = '100%';
    optionsDropdownMenu.style.right = '0';

    optionsButton.onclick = () => {
        optionsDropdownMenu.style.display = optionsDropdownMenu.style.display === 'none' ? 'block' : 'none';
    };

    // Add import options to dropdown menu
    const codeCategory = document.createElement('div');
    codeCategory.innerText = 'Code:';
    codeCategory.style.fontWeight = 'bold';
    codeCategory.style.marginBottom = '5px';
    optionsDropdownMenu.appendChild(codeCategory);

    const importJSONOption = document.createElement('button');
    importJSONOption.innerText = 'Import .json';
    optionsDropdownMenu.appendChild(importJSONOption);

    const importCSSOption = document.createElement('button');
    importCSSOption.innerText = 'Import CSS';
    optionsDropdownMenu.appendChild(importCSSOption);

    const importCodeFontOption = document.createElement('button');
    importCodeFontOption.innerText = 'Import Code Font';
    optionsDropdownMenu.appendChild(importCodeFontOption);

    const mainCategory = document.createElement('div');
    mainCategory.innerText = 'Main:';
    mainCategory.style.fontWeight = 'bold';
    mainCategory.style.marginTop = '10px';
    mainCategory.style.marginBottom = '5px';
    optionsDropdownMenu.appendChild(mainCategory);

    const mainImportFontOption = document.createElement('button');
    mainImportFontOption.innerText = 'Import Font';
    optionsDropdownMenu.appendChild(mainImportFontOption);

    optionsButtonContainer.appendChild(optionsButton);
    optionsButtonContainer.appendChild(optionsDropdownMenu);

    document.body.appendChild(optionsButtonContainer);

    // Function for importing Code Font
    importCodeFontOption.onclick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.ttf,.otf,.woff,.woff2';
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const fontFace = new FontFace('CodeImportedFont', `url(${e.target.result})`);
                        document.fonts.add(fontFace);
                        const codeElements = document.querySelectorAll('.overflow-y-auto.p-4, code.hljs');
                        codeElements.forEach(el => {
                            el.style.fontFamily = 'CodeImportedFont, monospace';
                        });
                    } catch (error) {
                        console.error('Error loading font:', error);
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    // Function for importing Main Font
    mainImportFontOption.onclick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.ttf,.otf,.woff,.woff2';
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const fontFace = new FontFace('MainImportedFont', `url(${e.target.result})`);
                        document.fonts.add(fontFace);
                        document.body.style.fontFamily = 'MainImportedFont, monospace';
                    } catch (error) {
                        console.error('Error loading font:', error);
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };
})();
