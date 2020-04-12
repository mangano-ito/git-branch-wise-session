import Session from '#/Model/Session';

/** listener called on session updates */
export type OnSessionUpdatedListener = (session: Session) => any;
/** listener called when session save is requested */
export type OnSessionSaveRequestedListener = (session: Session) => any;
/** listener called when session restore is requested */
export type OnSessionRestoreRequestedListener = (nameOfSession: string) => any;
/** listener called on session switches */
export type OnSessionSwitchedListener = (nameOfSession: string) => any;
/** listener called when forget current session is requested */
export type OnSessionClearRequestedListener = (nameOfSession: string) => any;
/** listener called when forget all sessions is requested */
export type OnSessionAllClearRequestedListener = () => any;

/**
 * Session Manager Interface
 */
export default interface SessionManagerDelegate {
    /**
     * set a listener on session updates
     * @param listener listener to attach
     */
    setOnSessionUpdatedListener(listener: OnSessionUpdatedListener): any;

    /**
     * set a listener on session restore requests
     * @param listener listener to attach
     */
    setOnSessionRestoreRequestedListener(listener: OnSessionRestoreRequestedListener): any;

    /**
     * set a listener on session save requests
     * @param listener listener to attach
     */
    setOnSessionSaveRequestedListener(listener: OnSessionSaveRequestedListener): any;

    /**
     * set a listener on session switches
     * @param listener listener to attach
     */
    setOnSessionSwitchedListener(listener: OnSessionSwitchedListener): any;

    /**
     * set a listener on requests to forget current session
     * @param listener listener to attach
     */
    setOnSessionClearRequestedListener(listener: OnSessionClearRequestedListener): any;

    /**
     * set a listener on requests to forget all the saved sessions
     * @param listener listener to attach
     */
    setOnSessionAllClearRequestedListener(listener: OnSessionAllClearRequestedListener): any;

    /**
     * close current opened editors
     */
    clear(): Promise<void>;

    /**
     * restore specified session
     * @param session session to restore
     */
    restore(session: Session): Promise<void>;
}
