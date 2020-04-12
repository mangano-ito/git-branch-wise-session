import Session from '#/Model/Session';

/** listener called on session updates */
export type OnSessionUpdatedListener = () => any;

/**
 * Session Repository Interface
 */
export default interface SessionRepository {
    /**
     * get saved session by name
     * @param name name of session to get
     * @returns {Session | undefined} session found, otherwise undefined
     */
    get(name: string): Session | undefined;

    /**
     * removed specified saved session
     * @param name name of session to remove
     */
    remove(name: string): any;

    /**
     * removed all saved sessions
     */
    removeAll(): any;

    /**
     * update given session
     * @param session session to update
     */
    set(session: Session): any;

    /** enumerated all saved sessions */
    allSessions: Session[];

    /**
     * attach a listener called on updates
     * @param listener listener to attach
     */
    setOnSessionUpdatedListener(listener: OnSessionUpdatedListener): any;
}
