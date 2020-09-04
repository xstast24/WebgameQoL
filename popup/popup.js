console = chrome.extension.getBackgroundPage().console;


// show switches with actual values (enabled/disabled)
loadAndDisplayCurrentSettings();

// add listener to all switches that will save new value and update switch state
for (const setting in SETTINGS) {
    console.log('Adding onClick listener to all setting switches...');
    document.getElementById(setting).addEventListener('click', function(){updateSettingOnClick(setting)});
}


function loadAndDisplayCurrentSettings(){
    // load values for all setting-switches and update their states with actual values
    for (const setting in SETTINGS) {
        chrome.storage.local.get([setting], function (res) {
            console.log(`Preparing popup: Loading "${setting}" value: ${res[setting]}`);
            document.getElementById(setting).checked = res[setting];
        });
    }
}

function updateSettingOnClick(setting) {
    // Save setting's new value to storage. Shall be used when user clicks any setting switch.
    let checkBox = document.getElementById(setting);
    chrome.storage.local.set({[setting]: checkBox.checked}, function () {
            console.log(`Setting switch: "${setting}" changed to: ${checkBox.checked}`)
        });
}
