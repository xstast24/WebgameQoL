let log = console.log;


const CONFIG_KEYS = {
    extensionActive: 'extensionActive',
    enabledPricePer1Prestige: 'enabledPricePer1Prestige',

    firstRunEver: 'firstRunEver'
};
const DEFAULT_CONFIG = {
    extensionActive: false,
    enabledPricePer1Prestige: false,

    firstRunEver: false  // initialize config at the first run
};


// initialize default config at the very first run
chrome.storage.local.get([CONFIG_KEYS.firstRunEver], function (isFirstRun) {
    if (isFirstRun === true) {
        log('First run ever -> initializing the default config in local storage');
        chrome.storage.local.set(DEFAULT_CONFIG, function () {
            log('Default config initialized in local storage')
        });
    } else {log('Config initialized')}
});
