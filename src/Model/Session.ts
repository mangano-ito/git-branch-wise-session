import Editor from './Editor';

/**
 * Session Model
 */
export default interface Session {
    /** name of session */
    name: string;

    /** opened editors */
    editors: Editor[];
}
