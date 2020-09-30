// initialize default config at the very first run
chrome.storage.local.get(CONFIG_KEYS.firstRunEver, function (res) {
    if (res[CONFIG_KEYS.firstRunEver] === false) {
        console.log('Config already initialized')
    } else {
        console.log('First run ever -> initializing defaults...');
        saveDefaultConfigToChromeStorage(true);
    }
});

// reload config on update
chrome.storage.local.get(CONFIG_KEYS.lastRunningVersion, function (res) {
    const previous_version = res[CONFIG_KEYS.lastRunningVersion];
    const this_version = chrome.runtime.getManifest().version;
    if (previous_version === this_version) {
        console.log(`No update. Current version matches the last running version: ${this_version}`)
    } else {
        console.log(`Extension updated. New version: ${this_version}. Previous version: ${previous_version}. Reloading config...`);
        saveDefaultConfigToChromeStorage(true);
        chrome.storage.local.set({[CONFIG_KEYS.lastRunningVersion]: this_version}, function () {
            console.debug(`Saving current version ${this_version} as last running version`)
        });
    }
});


// block loading of some images on the sidebar - is here (not in content scripts) to prevent even requesting of the images, so no data are transferred
chrome.storage.local.get(SETTINGS_KEYS.disableSidebarImages, function (res) { //FIXME document somwhere - can't change while running, needs extension reload
    if (res[SETTINGS_KEYS.disableSidebarImages]) {

        console.log(`Tweaks "${SETTINGS_KEYS.disableSidebarImages}" is ON. Disabled requests for images (may save some data and offload the server).`);
        chrome.webRequest.onBeforeRequest.addListener(
            function (details) {
                return {cancel: true};
            },
            {urls: ["https://www.webgame.cz/wg/img/logo.gif", "https://www.webgame.cz/wg/styles/black/leftmenu_logo.png"]},
            ["blocking"]);  // synchronous -> block request until callback result is known
    }
});
