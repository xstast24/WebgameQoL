// Check if extension is active and run active tweaks
chrome.storage.local.get([CONFIG_KEYS.extensionActive], function (res) {
    if (res[CONFIG_KEYS.extensionActive]) {
        console.log('Extension is ON -> running content tweaks');
        runContentTweaks();
    } else {
        console.log('Extension is OFF');
    }
});


/**Check all content tweaks. If turned ON -> apply it. If turned OFF -> ignore it.*/
function runContentTweaks() {
    for (const tweak in SETTINGS_KEYS) {
        console.log(`Tweak "${tweak}": Checking...`);
        chrome.storage.local.get(tweak, function (res) {
            if (res[tweak]) {
                window['tweak_' + tweak](); // run tweak - evaluate dynamically by method name
            } else {
                console.log(`Tweak "${tweak}": OFF`);
            }
        });
    }
}

/**Display price per 1 prestige in world market.*/
function tweak_enablePricePer1Prestige() {
    if (window.location.search === '?p=svetovy_trh' || window.location.search === '?p=svetovy_trh&s=trhkoupit') {
        let marketRow, unit, priceCell, pricePerPrestige;
        for (let i = 3; i <= 7; i++) {  // row3 = voja ... row7 = mech
            marketRow = document.getElementById('wt_row_' + i);
            priceCell = marketRow.getElementsByClassName('mactprice')[0];
            unit = marketRow.getElementsByClassName('rname')[0].textContent;
            pricePerPrestige = priceCell.textContent / getPrestige(unit);
            priceCell.textContent = priceCell.textContent + ' ppp' + pricePerPrestige.toFixed(0);
        }
        console.log(`Tweak "${SETTINGS_KEYS.enablePricePer1Prestige}": Activated`);
    } else {
        console.log(`Tweak "${SETTINGS_KEYS.enablePricePer1Prestige}": Ignored (conditions not met)`)
    }
}

/**TODO*/
function tweak_attacksTweaks() {
    if (window.location.search === '?p=valka' || window.location.search === '?p=valka&s=utok') {
        let targetsTable = document.getElementById('war-alliance-members');
        let targetsTableLines = targetsTable.getElementsByTagName('tr');
        let targetLineCells, land, prestige, ratio;
        for (let i = 0; i < targetsTableLines.length; i++) {
            targetLineCells = targetsTableLines[i].getElementsByTagName('td');
            if (targetLineCells.length < 7) {continue} //we want only lines with target info (7 attributes - name, land, prestige etc.), not ali names
            land = targetLineCells[2].textContent.slice(0, -3); //remove ending "km2"
            prestige = targetLineCells[3].textContent;
            ratio = land / prestige * 1000; //land per 1000 prestige (more => easier target)
            ratio = document.createTextNode(' ' + ratio.toFixed(1) + 'km/p');
            targetLineCells[2].append(ratio);
        }
        console.log(`Tweak "${SETTINGS_KEYS.attacksTweaks}": Activated`);
    } else {
        console.log(`Tweak "${SETTINGS_KEYS.attacksTweaks}": Ignored (conditions not met)`)
    }
}

function tweak_TODO() {
    console.log('TODO');
}

// alert("Error: No items with class 'mactprice' found.")
// document.addEventListener('click', () => alert('Click occurred!'));