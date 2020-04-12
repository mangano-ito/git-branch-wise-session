import Session from '#/Model/Session';
import SessionRepository, { OnSessionUpdatedListener } from './SessionRepository';
import KeyValueStorage from '#/DataStore/KeyValueStorage/KeyValueStorage';

/**
 * Session Repository using Provided Storage
 */
export default class StorageBackedSessionRepository implements SessionRepository {
    private onSessionUpdatedListener: OnSessionUpdatedListener = () => {};

    constructor(private storage: KeyValueStorage) {}

    get(name: string): Session | undefined {
        return this.storage.get(name);
    }

    set(session: Session) {
        this.storage.set(session.name, session);
        this.onSessionUpdatedListener();
    }

    remove(name: string) {
        this.storage.delete(name);
        this.onSessionUpdatedListener();
    }

    get allSessions(): Session[] {
        return [...this.storage.values<Session>()];
    }

    setOnSessionUpdatedListener(listener: OnSessionUpdatedListener) {
        this.onSessionUpdatedListener = listener;
    }
}
