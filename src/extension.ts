import * as vscode from 'vscode';

import SessionController from './Controller/Session/SessionController';
import VscodeMainWindowDelegate from './Delegate/Window/VscodeMainWindowDelegate';
import StorageBackedSessionRepository from './Repository/Session/StorageBackedSessionRepository';
import WorkspaceStorage from './DataStore/KeyValueStorage/WorkspaceStorage';
import VscodeSessionManagerDelegate from './Delegate/SessionManager/VscodeSessionManagerDelegate';
import DefaultGitDelegate from './Delegate/Git/DefaultGitDelegate';
import VscodeConfigProvider from './Provider/Config/VscodeConfigProvider';

export async function activate(context: vscode.ExtensionContext) {
	const configProvider = new VscodeConfigProvider(context);
    const windowDelegate = new VscodeMainWindowDelegate();
    const sessionManagerDelegate = new VscodeSessionManagerDelegate(context, new DefaultGitDelegate(), configProvider);
    const repo = new StorageBackedSessionRepository(new WorkspaceStorage(context));

	new SessionController(repo, sessionManagerDelegate, windowDelegate, configProvider);
}

export function deactivate() {}
