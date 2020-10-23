/**
 * This script is intended to be loaded before all JS scripts, so they can use the config constants.
 * NOTE: Every new config must be added to background.js to FIRST RUN INITIALIZATION to work.
 * */


// Configuration related to program in general // TODO is needed? Probably in future there will be more configs, we'll see
const CONFIG = {
    firstRunEver: false, //to initialize on the very first run
    extensionActive: false, //general on/off switch
    lastRunningVersion: '0.0', //used to detect updates
};

const CONFIG_KEYS = {
    firstRunEver: 'firstRunEver',
    extensionActive: 'extensionActive',
    lastRunningVersion: 'lastRunningVersion',
};

// Settings that can be enabled by user via UI (webgame tweaks)
const SETTINGS = {
    enablePricePer1Prestige: false,
    attacksTweaks: false,
    quickSpecialInfiltrations: false,
    disableSidebarImages: false, //prevent some images from loading
    sidebarDirectLinks: false, //some sidebar links will directly open common sub-pages etc.
};

const SETTINGS_KEYS = {
    enablePricePer1Prestige: 'enablePricePer1Prestige',
    attacksTweaks: 'attacksTweaks',
    quickSpecialInfiltrations: 'quickSpecialInfiltrations',
    disableSidebarImages: 'disableSidebarImages',
    sidebarDirectLinks: 'sidebarDirectLinks',
};