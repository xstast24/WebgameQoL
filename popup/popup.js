let log = chrome.extension.getBackgroundPage().console.log;

// show switches with actual values (enabled/disabled)
loadAndDisplayCurrentSettings();

// add listener to all switches that will save new value and update switch state
document.getElementById(CONFIG_KEYS.enabledPricePer1Prestige).addEventListener('click', function(){updateSettingPricePer1Prestige()});


function loadAndDisplayCurrentSettings(){
    for (const property in CONFIG_KEYS) {

    }
}

// TODO rework to general settings update with param
function updateSettingPricePer1Prestige() {
    let checkBox = document.getElementById(CONFIG_KEYS.enabledPricePer1Prestige);
    chrome.storage.local.get(CONFIG_KEYS.extensionActive, function (value) {
        log('Value currently is ' + JSON.stringify(value));
    });
    // if (checkBox.checked === true) TODO save checkbox.checked to config
}

//  TODO add config object with callable values? Is it posssible? Or just create getters/setters for cfg values?