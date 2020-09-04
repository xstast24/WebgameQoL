// initialize default config at the very first run
chrome.storage.local.get('firstRunEver', function (res) {
    if (res['firstRunEver'] === false) {
        console.log('Config already initialized')}
    else {
        console.log('First run ever -> initializing defaults...');
        chrome.storage.local.set({'firstRunEver': false}, null);  // first run mark save -> next run not re-initialized

        chrome.storage.local.set(CONFIG, function () {
            console.log('Default config initialized in local storage')
        });
        chrome.storage.local.set(SETTINGS, function () {
            console.log('Default feature settings initialized in local storage')
        });
    }
});

// chrome.storage.local.clear();