/**
 * This script is intended to be loaded after config.js and before background/content/popup JS scripts, so they can use the common functionality.
 * Namespace of all background scripts is shared (same applies for content/popup namespaces), so it works.
 * */

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