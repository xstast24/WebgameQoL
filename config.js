/**
 * This script is intended to be loaded before all JS scripts, so they can use the config constants.
 * NOTE: Every new config must be added to background.js to FIRST RUN INITIALIZATION to work.
 * */


// Configuration related to program in general // TODO is needed? Probably in future there will be more configs, we'll see
const CONFIG = {
    extensionActive: false
};

const CONFIG_KEYS = {
    extensionActive: 'extensionActive'
};

// Settings that can be enabled by user via UI (webgame tweaks)
const SETTINGS = {
    enablePricePer1Prestige: false,
    attacksTweaks: false
};

const SETTINGS_KEYS = {  // FIXME may be not needed in future? Let's see after some content job is done
    enablePricePer1Prestige: 'enablePricePer1Prestige',
    attacksTweaks: 'attacksTweaks'
};