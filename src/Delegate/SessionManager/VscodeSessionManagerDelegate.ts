import * as vscode from 'vscode';

import Session from '#/Model/Session';
import GitDelegate from '#/Delegate/Git/GitDelegate';
import SessionManagerDelegate, {
    OnSessionRestoreRequestedListener,
    OnSessionSaveRequestedListener,
    OnSessionSwitchedListener,
    OnSessionUpdatedListener,
    OnSessionClearRequestedListener,
    OnSessionAllClearRequestedListener,
} from './SessionManagerDelegate';

const DEFAULT_SESSION_NAME = 'untitled session';

/**
 * VSCode Session Manager Delegate Implementation
 */
export default class VscodeSessionManagerDelegate implements SessionManagerDelegate {
    private onSessionRestoreRequestedListener: OnSessionRestoreRequestedListener = () => {};
    private onSessionSaveRequestedListener: OnSessionSaveRequestedListener = () => {};
    private onSessionClearRequestedListener: OnSessionClearRequestedListener = () => {};
    private onSessionAllClearRequestedListener: OnSessionAllClearRequestedListener = () => {};
    private onSessionUpdatedListener: OnSessionUpdatedListener = () => {};
    private onSessionSwitchedListener: OnSessionSwitchedListener = () => {};

    constructor(
        context: vscode.ExtensionContext,
        private gitDelegate: GitDelegate,
    ) {
        context.subscriptions.push(
            vscode.commands.registerCommand('git-branch-wise-session.saveSession', async () => {
                this.onSessionSaveRequestedListener(await this.getCurrentSession());
            }),
            vscode.commands.registerCommand('git-branch-wise-session.restoreSession', () => {
                this.onSessionRestoreRequestedListener(this.nameOfSession);
            }),
            vscode.commands.registerCommand('git-branch-wise-session.clearSession', () => {
                this.onSessionClearRequestedListener(this.nameOfSession);
            }),
            vscode.commands.registerCommand('git-branch-wise-session.clearAllSessions', () => {
                this.onSessionAllClearRequestedListener();
            }),
            vscode.window.onDidChangeVisibleTextEditors((editors: vscode.TextEditor[]) => {
                this.onSessionUpdatedListener(this.intoSession(editors));
            }),
        );
        this.gitDelegate.setOnBranchSwitchedListener(() => {
            this.onSessionSwitchedListener(this.nameOfSession);
        });
    }

    get nameOfSession(): string {
        return this.gitDelegate.currentBranchName || DEFAULT_SESSION_NAME;
    }

    async getCurrentSession(): Promise<Session> {
        const active = vscode.window.activeTextEditor;
        if (!active) {
            return this.intoSession([]);
        }

        const equals = (lhs: vscode.TextEditor, rhs: vscode.TextEditor) => {
            return lhs.document.uri === rhs.document.uri
                && lhs.viewColumn === rhs.viewColumn;
        };
        const editors = [active, ];
        while (true) {
            await vscode.commands.executeCommand<vscode.TextEditor>('workbench.action.nextEditor');
            const editor = vscode.window.activeTextEditor;
            if (!editor || equals(active, editor)) {
                break;
            }
            editors.push(editor);
        }

        return this.intoSession(editors);
    }

    private intoSession(vscodeEditors: vscode.TextEditor[]): Session {
        const name = this.nameOfSession;
        const editors = vscodeEditors.map((editor: vscode.TextEditor, order: number) => {
            return {
                uri:    editor.document.uri.path,
                column: editor.viewColumn || 0,
                order
            };
        });

        return {name, editors, };
    }

    setOnSessionUpdatedListener(listener: OnSessionUpdatedListener) {
        this.onSessionUpdatedListener = listener;
    }

    setOnSessionRestoreRequestedListener(listener: OnSessionRestoreRequestedListener) {
        this.onSessionRestoreRequestedListener = listener;
    }

    setOnSessionSaveRequestedListener(listener: OnSessionSaveRequestedListener) {
        this.onSessionSaveRequestedListener = listener;
    }

    setOnSessionSwitchedListener(listener: OnSessionSwitchedListener) {
        this.onSessionSwitchedListener = listener;
    }

    setOnSessionClearRequestedListener(listener: OnSessionClearRequestedListener) {
        this.onSessionClearRequestedListener = listener;
    }

    setOnSessionAllClearRequestedListener(listener: OnSessionAllClearRequestedListener) {
        this.onSessionAllClearRequestedListener = listener;
    }

    async clear(): Promise<void> {
        await vscode.commands.executeCommand('workbench.action.closeAllEditors');
    }

    async restore(session: Session): Promise<void> {
        // we simply await each promises instead of Promise.all
        // because we want to open editors in the saved order.
        for (const editor of session.editors) {
            const document = await vscode.workspace.openTextDocument(editor.uri);
            const viewColumn = editor.column >= 0 ? editor.column : undefined;
            await vscode.window.showTextDocument(document, {viewColumn: viewColumn, preview: false});
        };
    }
}
