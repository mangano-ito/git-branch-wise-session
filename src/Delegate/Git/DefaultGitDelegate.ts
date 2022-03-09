import * as vscode from 'vscode';
import * as vscodeGit from 'git';

import GitDelegate, { OnBranchSwitchedListener } from './GitDelegate';

/**
 * Default Git Controller Delegate Implementation
 * using vscode.git (default git extension)
 */
export default class DefaultGitDelegate implements GitDelegate {
    /** Git extension delegated to */
    private git: vscodeGit.API;

    private lastCurrentBranchName: string | undefined;

    /** a listener called when current branch is switched */
    private onBranchSwitchedListener: OnBranchSwitchedListener = () => {};

    constructor() {
        const git = vscode.extensions.getExtension<vscodeGit.GitExtension>('vscode.git')?.exports?.getAPI(1);
        if (!git) {
            throw new Error('You must enable *vscode.git extension* first.');
        }
        this.git = git;

        // FIXME
        this.lastCurrentBranchName = this.currentBranchName;

        const initializer = this.git.onDidChangeState((e) => {
            if (e === "initialized") {
                this.currentRepository?.state?.onDidChange(async () => {
                    // emit only when current branch is switched
                    if (this.lastCurrentBranchName !== this.currentBranchName) {
                        const tempLastBranchName = this.lastCurrentBranchName;
                        this.lastCurrentBranchName = this.currentBranchName;
                        this.onBranchSwitchedListener(this.currentBranchName, tempLastBranchName);
                    }
                });
                initializer.dispose();
            }
        }, this);
    }

    /** @inheritdoc */
    get currentBranchName(): string | undefined {
        return this.currentRepository?.state?.HEAD?.name;
    }

    /** @inheritdoc */
    setOnBranchSwitchedListener(listener: OnBranchSwitchedListener) {
        this.onBranchSwitchedListener = listener;
    }

    /**
     * get VSCode workspace URI object
     */
    private get workspaceUri(): vscode.Uri | undefined {
        return vscode.workspace.workspaceFolders?.[0].uri;
    }

    /**
     * get current Git repository
     */
    private get currentRepository(): vscodeGit.Repository | undefined {
        const workspaceUri = this.workspaceUri;

        return workspaceUri
            ? this.git.getRepository(workspaceUri) || undefined
            : undefined;
    }
}
