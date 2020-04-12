import * as vscode from 'vscode';

import KeyValueStorage from './KeyValueStorage';

const MEMENTO_KEY = 'git-branch-wise-session-sessions';

/**
 * VSCode workspace-dependent storage
 */
export default class WorkspaceStorage implements KeyValueStorage {
    private memento: vscode.Memento;
    private map = new Map<string, any>();

    constructor(context: vscode.ExtensionContext) {
        this.memento = context.workspaceState;
        this.restore();
    }

    set<T>(key: string, value: T) {
        this.map.set(key, value);
        this.save();
    }

    get<T>(key: string): T | undefined {
        return this.map.get(key);
    }
    
    delete(key: string) {
        this.map.delete(key);
        this.save();
    }

    clear() {
        this.map.clear();
        this.save();
    }

    values<T>(): IterableIterator<T> {
        return this.map.values();
    }

    /**
     * save all values on workspace-persistent storage
     */
    private save() {
        const mapJson = JSON.stringify([...this.map]);
        this.memento.update(MEMENTO_KEY, mapJson);
    }

    /**
     * restore all values from workspace-persistent storage
     */
    private restore() {
        let map = [];
        try {
            const mapJson = this.memento.get(MEMENTO_KEY, '[]');
            map = JSON.parse(mapJson);
        } catch (e) {}
        this.map = new Map(map);
    }
}
