/** listener called when branch is switched */
export type OnBranchSwitchedListener = (nameOfBranch: string | undefined) => any;

/**
 * Git-based Controller Delegate
 */
export default interface GitDelegate {
    /** the name of current branch (HEAD) */
    currentBranchName: string | undefined;

    /**
     * set listener on branch switches
     * note that this replace the current listener if set
     * @param listener a listener to attach
     */
    setOnBranchSwitchedListener(listener: OnBranchSwitchedListener): any;
}
