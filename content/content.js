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
        console.debug(`Tweak "${tweak}": Checking...`);
        chrome.storage.local.get(tweak, function (res) {
            if (res[tweak]) {
                window['tweak_' + tweak](); // run tweak - evaluate dynamically by method name
            } else {
                console.debug(`Tweak "${tweak}": OFF`);
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
        console.debug(`Tweak "${SETTINGS_KEYS.enablePricePer1Prestige}": Ignored (conditions not met)`)
    }
}

/**TODO*/
function tweak_attacksTweaks() {
    if (window.location.search === '?p=valka' || window.location.search === '?p=valka&s=utok') {
        //TODO
        let infoBar = document.getElementById('uLista');
        let landInfo = infoBar.getElementsByClassName('rdata')[3].getElementsByTagName('tr')[1];
        let myLandRatio = myLand() / myPrestige() * 1000;
        myLandRatio = document.createTextNode(' ' + myLandRatio.toFixed(1) + 'km/p');
        landInfo.append(myLandRatio);


        let targetsTable = document.getElementById('war-alliance-members');
        let targetsTableLines = targetsTable.getElementsByTagName('tr');
        let targetLineCells, land, prestige, ratio;
        for (let i = 0; i < targetsTableLines.length; i++) {
            targetLineCells = targetsTableLines[i].getElementsByTagName('td');
            if (targetLineCells.length < 7) {
                continue
            } //we want only lines with target info (7 attributes - name, land, prestige etc.), not ali names
            land = targetLineCells[2].textContent.slice(0, -3); //remove ending "km2"
            prestige = targetLineCells[3].textContent;
            ratio = land / prestige * 1000; //land per 1000 prestige (more => easier target)
            ratio = document.createTextNode(' ' + ratio.toFixed(1) + 'km/p');
            targetLineCells[2].append(ratio);
        }
        console.log(`Tweak "${SETTINGS_KEYS.attacksTweaks}": Activated`);
    } else {
        console.debug(`Tweak "${SETTINGS_KEYS.attacksTweaks}": Ignored (conditions not met)`)
    }
}

/**TODO*/
function tweak_quickSpecialInfiltrations() {
    // Opening of detailed inf goes through 4 screens, but URL changes only on the 1st one. However, once a document is reloaded, script stops execution, so we
    // can't do everything in linear steps, we have to make if-branches and apply the specific one that is needed.
    if (window.location.search.startsWith('?p=rozvedka&s=viewspye&msgid=')) {
        console.debug('User opened infiltration details');
        let infTable = document.getElementById('spy-message-summary');
        let specialInfButton = getElementByText('Speciální infiltrace', infTable, 'a');
        specialInfButton.click();
    } else if (window.location.search.startsWith('?p=rozvedka&s=wgtabs_infiltration&selected_country=')) {
        // Buttons stay on the screen, URL doesn't change, elements are added incrementally through 3 screens. We can't simply click the first button, then
        // another etc. It would always click the first button and reload page in infinite loop. So we need to first check if elements of 3rd screen are
        // present, then if 2nd are present, then if the first one.
        let contentWindow = document.getElementById('icontent');
        let confirmCountryButton = getElementByAttributeValue('value', 'Zvolit zemi', contentWindow, 'input'); //in the first confirmation screen
        let selectInfiltrationButton = getElementByAttributeValue('value', 'Vybrat infiltrace', contentWindow, 'input'); //in the second confirmation screen
        let chosenInfiltrationHeader = getElementByText('Zvolené infiltrace', contentWindow, 'h1'); //in the final screen
        if (chosenInfiltrationHeader) {
            console.debug('Final detailed inf - moving important tables to top');
            let chosenInfiltrationBonusesHeader = getElementByText('Zjištěné bonusy', contentWindow, 'h1');
            let infiltrationBonuses = chosenInfiltrationBonusesHeader.nextElementSibling;
            let infiltrationDetails = chosenInfiltrationHeader.nextElementSibling;
            contentWindow.prepend(infiltrationBonuses, infiltrationDetails);
        } else if (selectInfiltrationButton) {
            console.debug('Selecting inf');
            getElementByAttributeValue('type', 'radio', document, 'input').click(); //pick the very first inf from the top
            selectInfiltrationButton.click()
        } else {
            console.debug('Confirming country');
            confirmCountryButton.click()
        }
    }
}

function tweak_disableSidebarImages() {
    // Does nothing. This is handled in background script, but due to dynamical evaluation of tweaks we need this function to exist, so exception is not raised.
    // It could be solved by exception handling, but that should be reserved for real exceptions, this is known state, so it is easier to fully ignore it.
}

// alert("Error: No items with class 'mactprice' found.")
// document.addEventListener('click', () => alert('Click occurred!'));