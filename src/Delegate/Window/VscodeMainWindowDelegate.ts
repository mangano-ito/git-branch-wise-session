import * as vscode from 'vscode';

import WindowDelegate from './WindowDelegate';

/**
 * VSCode Main Window Delegate Implementation
 */
export default class VscodeMainWindowDelegate implements WindowDelegate {
    async showMessage(text: string): Promise<void> {
        await vscode.window.showInformationMessage(text);
    }
}
