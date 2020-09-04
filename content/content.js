// Check if extension is active and run active tweaks
chrome.storage.local.get([CONFIG_KEYS.extensionActive], function (res) {
    if (res[CONFIG_KEYS.extensionActive]) {
        console.log('Extension is ON -> running content tweaks');
        runContentTweaks();
    }
    else {console.log('Extension is OFF');}
});

/**TODO*/
function runContentTweaks() {
    for (const tweak in SETTINGS_KEYS) {
        console.log('TODO tweak' + tweak); //TODO
        chrome.storage.local.get(tweak, function (res) {
            if (res[tweak]) {
                console.log(`Running tweak "${tweak}"...`);
                window['tweak_' + tweak](); // run tweak - evaluate dynamically by method name
            }
            else {console.log(`Tweak "${tweak}" is OFF`);}
        });
    }
}

/**TODO*/
function tweak_enablePricePer1Prestige() { // TODO rework
    let itemNodes = document.getElementsByClassName('mactprice');
    if (itemNodes.length === 0) {
        alert("Error: No items with class 'item' found.")
    }
    else {
        for (let i=0; i<itemNodes.length; i++) {
            itemNodes[i].textContent = itemNodes[i].textContent + 'KEK';
        }
    }
}

// TODO handle tweak running only on certain URLs (e.g. only on www.webgame.cz/.../svetovy_trh

//document.addEventListener('click', () => alert('Click occurred!'));