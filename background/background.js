let log = console.log;


// initialize default config at the very first run
chrome.storage.local.get([CONFIG_KEYS.firstRunEver], function (isFirstRun) {
    if (isFirstRun === true) {
        log('First run ever -> initializing the default config in local storage');
        chrome.storage.local.set(DEFAULT_CONFIG, function () {
            log('Default config initialized in local storage')
        });
    } else {log('Config initialized')}
});
