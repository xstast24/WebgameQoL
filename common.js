/**
 * This script is intended to be loaded after config.js and before background/content/popup JS scripts, so they can use the common functionality.
 * Namespace of all background scripts is shared (same applies for content/popup namespaces), so it works.
 * */

const UNITS = {
    voja: 'Vojáci',
    tank: 'Tanky',
    stih: 'Stíhačky',
    mech: 'Mechové',
    bunk: 'Bunkry'
};

const COMMODITY = {
    jidl: 'Jídlo',
    ener: 'Energie',
    voja: 'Vojáci',
    tank: 'Tanky',
    stih: 'Stíhačky',
    mech: 'Mechové',
    bunk: 'Bunkry'
};

const PRESTIGE = {
    'Jídlo': 0.02,
    'Energie': 0.02,
    'Vojáci': 1,
    'Tanky': 5,
    'Stíhačky': 3.5,
    'Mechové': 3.5,
    'Bunkry': 2.7
};

/**Calculate prestige for given type and amount of units*/
function getPrestige(unit, count = 1) {
    switch (unit) {
        case UNITS.voja:
            return count;
        case UNITS.tank:
            return count * 5;
        case UNITS.stih:
            return count * 3.5;
        case UNITS.bunk:
            return count * 3.5;
        case UNITS.mech:
            return count * 2.7;
        default:
            throw `ERROR: Can't get prestige for unknown unit type: ${unit}`;
    }
}

/**Save default configs to chrome storage. Use param 'clearOldStorage' to delete old storage data before saving the new data.*/
function saveDefaultConfigToChromeStorage(clearOldStorage = false) {
    if (clearOldStorage) {
        chrome.storage.local.clear();
        console.log('Cleared Chrome storage')
    }

    chrome.storage.local.set(CONFIG, function () {
        console.log('Default config initialized in local storage')
    });
    chrome.storage.local.set(SETTINGS, function () {
        console.log('Default feature settings initialized in local storage')
    });
}

/**Get info bar on top of the page (with info about my country).
 * return: (optional) infobar elem*/
function getTopBar() {
    return document.getElementById('uLista');
}

/**Get side bar (the menu on the left side of the page).
 * return: (optional) sidebar elem*/
function getSideBar() {
    return document.getElementById('left_menu');
}

/**Get current prestige from info bar on top
 * return: prestige of the country (just the number, removed any spaces), e.g. 1200000*/
function myPrestige() {
    let presTitleElem = getElementByText('Presti', getTopBar(), 'strong');
    let presValue = presTitleElem.parentNode.nextElementSibling; //title is not directly in td, but in child <strong> -> parent first, then sibling
    return presValue.textContent.replace(/\s/g, ''); //remove whitespaces (even in the middle of number), g=repeat
}

/**Get current land from info bar on top
 * return: land of the country (just the number without unit), e.g. 6999*/
function myLand() {
    let landTitleElem = getElementByText('Rozloha', getTopBar(), 'strong');
    let landValue = landTitleElem.parentNode.nextElementSibling; //title is not directly in td, but in child <strong> -> parent first, then sibling
    landValue = landValue.textContent.replace(/\s/g, ''); //remove whitespaces (even in the middle of number), g=repeat
    return landValue.slice(0, -3); //remove ending "km2"
}

/**Get just the direct text of given element, not of its children. E.g. <div>directText<red>childText</red></div> returns only "directText"*/
function getTextExcludingChildren(element) {
    return element.childNodes[0].nodeValue
}

/**Get element by xpath. Search only in given context (element).
 * return: (optional) matching element* */
function getElementByXpath(xpath, contextElement = document) {
    return document.evaluate(xpath, contextElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

/**Get first element with given text. Searches in children of given context element, based on element type.
 * text: text that must be in the element (either contained or exactly matched - set via exactMatch param)
 * contextElement: search only in a context of this element (and its children recursively)
 * elementType: final element must be of this type, e.g. div/tr/a/td, or asterisk to for any type
 * exactMatch: if disabled, element must contain the text and possibly anything else, e.g. searching for 'bar' will return element with 'foobarbaz',
 *      if enabled, search only for exact text match (not recommended)
 * return: (optional) element containing the given text*/
function getElementByText(text, contextElement = document, elementType = '*', exactMatch = false) {
    let query = exactMatch ? `//${elementType}[text()='${text}')]` : `//${elementType}[contains(text(), '${text}')]`;
    return getElementByXpath(query, contextElement)
}

/**Get first element matching given attribute's value. Searches in children of given context element, based on element type.
 * attribute: attribute of the element
 * value: value of the attribute
 * contextElement: search only in a context of this element (and its children recursively)
 * elementType: final element must be of this type, e.g. div/tr/a/td, or asterisk to for any type
 * return: (optional) matching element*/
function getElementByAttributeValue(attribute, value, contextElement = document, elementType = '*') {
    let query = `//${elementType}[@${attribute}="${value}"]`;
    return getElementByXpath(query, contextElement)
}

/** Async sleep method. Can be only used in "async function", pauses only execution of that function, nothing else.
 * Example usage: while(x==y){await sleep(1000); console.log(do something every second);} */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function exitScriptExecution() {
    throw new Error('NOT ERROR: Just intentionally stopping script execution.');
}
