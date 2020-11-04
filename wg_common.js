/** COMMON WG-related INFO
 * This script is intended to be loaded after config.js and common.js and before background/content/popup JS scripts, so they can use the common functionality.
 * Namespace of all background scripts is shared (same applies for content/popup namespaces), so it works.
 * */


const UNITS = {
    voja: 'Vojáci',
    tank: 'Tanky',
    stih: 'Stíhačky',
    mech: 'Mechové',
    bunk: 'Bunkry'
};

const COMMODITY = {
    jidl: 'Jídlo',
    ener: 'Energie',
    voja: 'Vojáci',
    tank: 'Tanky',
    stih: 'Stíhačky',
    mech: 'Mechové',
    bunk: 'Bunkry'
};

const TECH = {
    rychlostStavby: 0,
    obchod: 1,
    hustotaZalidneni: 2,
    zemedelstvi: 3,
    automatizaceTovaren: 4,
    energetika: 5,
    silaZbrani: 6,
    cenaNaDomacimTrhu: 7,
    vyvojRaket: 8,
    protiraketovaObrana: 9,
    silaRozvedky: 10,
    vyzkumVesmiru: 11
}

const TECH_NAMES = {
    rychlostStavby: 'Rychlost stavby',
    obchod: 'Obchod',
    hustotaZalidneni: 'Hustota zalidnění',
    zemedelstvi: 'Zemědělství',
    automatizaceTovaren: 'Automatizace továren',
    energetika: 'Energetika',
    silaZbrani: 'Síla zbraní',
    cenaNaDomTrhu: 'Cena na dom. trhu',
    vyvojRaket: 'Vývoj raket',
    protiraketovaObrana: 'Protiraketová obrana',
    silaRozvedky: 'Síla rozvědky',
    vyzkumVesmiru: 'Výzkum vesmíru'
}

const PRESTIGE = {
    'Jídlo': 0.02,
    'Energie': 0.02,
    'Vojáci': 1,
    'Tanky': 5,
    'Stíhačky': 3.5,
    'Mechové': 3.5,
    'Bunkry': 2.7
};

/**Get info bar on top of the page (with info about my country).
 * return: (optional) infobar elem*/
function getTopBar() {
    return document.getElementById('uLista');
}

/**Get side bar (the menu on the left side of the page).
 * return: (optional) sidebar elem*/
function getSideBar() {
    return document.getElementById('left_menu');
}

/**Calculate prestige for given type and amount of units*/
function getPrestige(unit, count = 1) {
    switch (unit) {
        case UNITS.voja:
            return count;
        case UNITS.tank:
            return count * 5;
        case UNITS.stih:
            return count * 3.5;
        case UNITS.bunk:
            return count * 3.5;
        case UNITS.mech:
            return count * 2.7;
        default:
            throw `ERROR: Can't get prestige for unknown unit type: ${unit}`;
    }
}

/**Get current prestige from info bar on top
 * return: prestige of the country (just the number, removed any spaces), e.g. 1200000*/
function myPrestige() {
    let presTitleElem = getElementByText('Presti', getTopBar(), 'strong');
    let presValue = presTitleElem.parentNode.nextElementSibling; //title is not directly in td, but in child <strong> -> parent first, then sibling
    return presValue.textContent.replace(/\s/g, ''); //remove whitespaces (even in the middle of number), g=repeat
}

/**Get current land from info bar on top
 * return: land of the country (just the number without unit), e.g. 6999*/
function myLand() {
    let landTitleElem = getElementByText('Rozloha', getTopBar(), 'strong');
    let landValue = landTitleElem.parentNode.nextElementSibling; //title is not directly in td, but in child <strong> -> parent first, then sibling
    landValue = landValue.textContent.replace(/\s/g, ''); //remove whitespaces (even in the middle of number), g=repeat
    return landValue.slice(0, -3); //remove ending "km2"
}