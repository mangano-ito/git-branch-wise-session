/**
 * Extension configurations
 */
export default interface Config {
    /** On branch switches, whether the extension should also switch sessions automatically. */
    shouldAutoRestoreOnBranchSwitches: boolean;
    /** Whether the current session should be saved upon branches switching. */
    autoSaveBranchOnSwitch: boolean;
}
