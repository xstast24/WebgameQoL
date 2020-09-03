// show switches with actual values (enabled/disabled)
loadAndDisplayCurrentSettings();

// add listener to all switches that will save new value and update switch state
document.getElementById(SETTINGS.KEYS.enabledPricePer1Prestige).addEventListener('click', function(){updateSettingPricePer1Prestige()});


function loadAndDisplayCurrentSettings(){
    for (const property in SETTINGS.KEYS) {

    }
}

// TODO rework to general settings update with param
function updateSettingPricePer1Prestige() {
    let checkBox = document.getElementById(SETTINGS.KEYS.enabledPricePer1Prestige);
    chrome.storage.local.get(SETTINGS.KEYS.extensionActive, function (value) {
        console.log('Value currently is ' + JSON.stringify(value));
    });
    // if (checkBox.checked === true) TODO save checkbox.checked to config
}

//  TODO add config object with callable values? Is it posssible? Or just create getters/setters for cfg values?