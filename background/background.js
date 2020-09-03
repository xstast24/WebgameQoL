// initialize default config at the very first run
chrome.storage.local.get([CONFIG.KEYS.firstRunEver], function (isFirstRun) {
    if (isFirstRun === true) {
        console.log('First run ever -> initializing the default config in local storage');
        chrome.storage.local.set(CONFIG.DEFAULT, function () {
            console.log('Default config initialized in local storage')
        });
        chrome.storage.local.set(SETTINGS.DEFAULT, function () {
            console.log('Default feature settings initialized in local storage')
        });
    } else {console.log('Config already initialized')}
});
