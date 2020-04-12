/**
 * Key-value Storage Like Object
 */
export default interface KeyValueStorage {
    /**
     * set value at key
     * @param key   key to set
     * @param value value to set
     */
    set<T>(key: string, value: T): any;

    /**
     * get value at key
     * @param key key to get value of
     */
    get<T>(key: string): T | undefined;

    /**
     * delete value at key
     * @param key key to delete
     */
    delete(key: string): any;

    /**
     * clear all values
     */
    clear(): any;

    /**
     * get all values
     */
    values<T>(): IterableIterator<T>;
}
