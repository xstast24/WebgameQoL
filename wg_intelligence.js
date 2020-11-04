/** WG INFO related to INTELLIGENCE (= ROZVEDKA, the secret service)
 * This script is intended to be loaded after config.js, common.js and wg_common.js and before background/content/popup JS scripts, so they can use the common functionality.
 * Namespace of all background scripts is shared (same applies for content/popup namespaces), so it works.
 * */

const TECH_COVERAGE_MULTIPLIER = 2; // coefficient multiplier of techs covered by 'Sila rozvedky', e.g. 1000 silaRozvedky covers 2000 of any other tech type
const STEAL_TECH_COVERED = 0.002; //steal only 0.2% of tech covered by silaRozvedky
const STEAL_TECH_UNCOVERED = 0.002; //steal 5% of tech NOT covered by silaRozvedky
