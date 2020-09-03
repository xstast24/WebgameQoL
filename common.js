/**
 * This script is intended to be loaded before background/content/popup JS scripts, so they can use the common functionality.
 * Namespace of all background scripts is shared (same applies for content/popup namespaces), so it works.
 * */
let log = chrome.extension.getBackgroundPage().console.log;


// Configuration related to program in general
const CONFIG = {
    KEYS: {
        firstRunEver: 'firstRunEver'
    },
    DEFAULT: {
            firstRunEver: false  // initialize config at the first run
    }
};

// Settings that can be enabled by user via UI (webgame tweaks)
const SETTINGS = {
    KEYS: {
        extensionActive: 'extensionActive',
        enabledPricePer1Prestige: 'enabledPricePer1Prestige'
    },
    DEFAULT: {
        extensionActive: false,
        enabledPricePer1Prestige: false
    }
};


function saveToStorage(key, value) {
    // Save given value (e.g. bool, dict) under given key (e.g. string) to a local Chrome storage
    chrome.storage.local.set({key: value}, function () {
        console.log(`Storage: Set key "${key}" to value: ${value}`);
    });
}

function loadFromStorage(key) {
    // Load value of given key (e.g. string) from a local Chrome storage
    chrome.storage.local.get(key, function (value) {
        console.log(`Storage: Loaded key "${key}" with value: ${value}`);
    });
    console.log('VALUE: ' + value); //TODO remove tmp
    return value;
}