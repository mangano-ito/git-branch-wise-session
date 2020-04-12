import * as vscode from 'vscode';

import Config from '#/Model/Config';

/** listener called when configurations get updated */
type OnConfigDirtyListener = (config: Config) => any;

export default class ConfigProvider {
    private onConfigDirtyListener: OnConfigDirtyListener = () => {};
    private config: vscode.WorkspaceConfiguration;

    constructor(context: vscode.ExtensionContext) {
        this.config = vscode.workspace.getConfiguration('git-branch-wise-session');
        context.subscriptions.push(
            vscode.workspace.onDidChangeConfiguration(() => {
                this.onConfigDirtyListener(this.provide());
            }),
        );
    }

    /**
     * provides the saved configuration
     */
    provide(): Config {
        const shouldAutoRestoreOnBranchSwitches = this.config.get<boolean>('should-auto-restore-on-branch-switches') || true;

        return {
            shouldAutoRestoreOnBranchSwitches,
        };
    }

    /**
     * set a listener called when some of configurations get updated
     * @param listener listener to attach
     */
    setOnConfigDirtyListener(listener: OnConfigDirtyListener) {
        this.onConfigDirtyListener = listener;
    }
}
