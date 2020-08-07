// TODO import CONFIG_KEYS from ./background/background.js; how to import? Why is there error?


let log = chrome.extension.getBackgroundPage().console.log;


document.getElementById('switcherPricePer1Prestige').onclick = updateSettingPricePer1Prestige;


function updateSettingPricePer1Prestige() {
    let checkBox = document.getElementById("switcherPricePer1Prestige");
    chrome.storage.local.get(['extensionActive'], function (value) {
        log('Value currently is ' + JSON.stringify(value));
    });
    // if (checkBox.checked === true) TODO save checkbox.checked to config
}
