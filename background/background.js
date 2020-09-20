// chrome.storage.local.clear();  //TODO useful when adding new settings

// initialize default config at the very first run
chrome.storage.local.get('firstRunEver', function (res) {
    if (res['firstRunEver'] === false) {
        console.log('Config already initialized')
    } else {
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


// TODO config to enable/disable this? maybe check in callback and change SETTINGS config to CONTENT_SETTINGS and the other configs just handle manually in popup
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        return {cancel: true};
    },
    {urls: ["https://www.webgame.cz/wg/img/logo.gif", "https://www.webgame.cz/wg/styles/black/leftmenu_logo.png"]},
    ["blocking"]);  // synchronous -> block request until callback result is known
