/**
 * Editor Model
 */
export default interface Editor {
    /** URI of opened document */
    uri: string;

    /** Column number where editor resides */
    column: number;

    /** Order of editor */
    order: number;
}
