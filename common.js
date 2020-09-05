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

function exitScriptExecution() {
    throw new Error('NOT ERROR: Just intentionally stopping script execution.');
}

// TODO save to storage not working? key was not passed aas string value, but as variable name to chrome storage - needs brackets {[key]: value}, TODO write to tips
// function saveToStorage(key, value) {
//     // Save given value (e.g. bool, dict) under given key (e.g. string) to a local Chrome storage
//     chrome.storage.local.set({key: value}, function () {
//         console.log(`Storage: Set key "${key}" to value: ${JSON.stringify(value)}`);
//     });
// }

// FIXME async storage loading cant return value directly, need callback. Maybe fix with PROMISE lib? https://github.com/kriskowal/q
// function loadFromStorage(key) {
//     // Load value of given key (e.g. string) from a local Chrome storage
//     chrome.storage.local.get(key, function (resultDict) {
//         console.log(`Storage: Loaded key "${key}" with value: ${JSON.stringify(resultDict.key)}`); // stringify displays object details and doesn't affect simple numbers/bool
//     });
//     return resultDict.key; // THIS DOES NOT WORK, async loading from storage cant return value
// }