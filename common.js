/**
 * This script is intended to be loaded before background/content/popup JS scripts, so they can use the common functionality.
 * Namespace of all background scripts is shared (same applies for content/popup namespaces), so it works.
 * */


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
        console.log(`Storage: Set key "${key}" to value: ${JSON.stringify(value)}`);
    });
}

// FIXME async storage loading cant return value directly, need callback. Maybe fix with PROMISE lib? https://github.com/kriskowal/q
// function loadFromStorage(key) {
//     // Load value of given key (e.g. string) from a local Chrome storage
//     chrome.storage.local.get(key, function (value) {
//         console.log(`Storage: Loaded key "${key}" with value: ${JSON.stringify(value)}`);
//     });
//     return value; // THIS DOES NOT WORK, async loading from storage cant return value
// }