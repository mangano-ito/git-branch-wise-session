import StorageBackedSessionRepository from "#/Repository/Session/StorageBackedSessionRepository";
import KeyValueStorage from "#/DataStore/KeyValueStorage/KeyValueStorage";
import Session from "#/Model/Session";

describe('StorageBackedSessionRepository', () => {
    let storage = new class implements KeyValueStorage {
        set = jest.fn();
        get = jest.fn();
        delete = jest.fn();
        clear = jest.fn();
        values = jest.fn();
    };
    let repo = new StorageBackedSessionRepository(storage);

    const expected: Session = {
        name: 'TEST-SESSION-A',
        editors: [
            { uri: 'test-session-editor-a', column: 55, order: 0 },
            { uri: 'test-session-editor-b', column: 55, order: 1 },
        ],
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should set session with key', () => {
        repo.set(expected);
        expect(storage.set).toHaveBeenCalledWith('TEST-SESSION-A', expected);
    });

    it('should get session saved with specified key', () => {
        storage.get = jest.fn((key: string) => {
            return key === 'TEST-SESSION-A' ? expected : undefined;
        });
        expect(repo.get('TEST-SESSION-A')).toBe(expected);
        expect(storage.get).toHaveBeenCalledWith('TEST-SESSION-A');
    });

    // TODO: more tests
});
