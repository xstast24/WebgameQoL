console = chrome.extension.getBackgroundPage().console;


// show switches with actual values (enabled/disabled)
loadAndDisplayCurrentSettings();

// add listeners to all switches (to save new values to storage)
console.log('Adding onClick update listener to all switches...');
document.getElementById(CONFIG_KEYS.extensionActive).addEventListener('click', function () {
    updateSettingOnClick(CONFIG_KEYS.extensionActive)
}); // main switch
for (const setting in SETTINGS) { // all other switches
    document.getElementById(setting).addEventListener('click', function () {
        updateSettingOnClick(setting)
    });
}

/**Load values for all switches and update their states with actual values*/
function loadAndDisplayCurrentSettings() {
    // main switch
    chrome.storage.local.get([CONFIG_KEYS.extensionActive], function (res) {
        console.log(`Preparing popup: Loading "${CONFIG_KEYS.extensionActive}" value: ${res[CONFIG_KEYS.extensionActive]}`);
        document.getElementById(CONFIG_KEYS.extensionActive).checked = res[CONFIG_KEYS.extensionActive];
    });
    // all other switches
    for (const setting in SETTINGS) {
        chrome.storage.local.get([setting], function (res) {
            console.log(`Preparing popup: Loading "${setting}" value: ${res[setting]}`);
            document.getElementById(setting).checked = res[setting];
        });
    }
}

/**Save setting's new value to storage. Shall be used when user clicks any setting switch.*/
function updateSettingOnClick(setting) {
    let checkBox = document.getElementById(setting);
    chrome.storage.local.set({[setting]: checkBox.checked}, function () {
        console.log(`Setting switch: "${setting}" changed to: ${checkBox.checked}`)
    });
}
