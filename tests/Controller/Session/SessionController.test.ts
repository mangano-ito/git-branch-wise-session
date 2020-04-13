import SessionController from "#/Controller/Session/SessionController";
import SessionRepository from "#/Repository/Session/SessionRepository";
import SessionManagerDelegate from "#/Delegate/SessionManager/SessionManagerDelegate";
import WindowDelegate from "#/Delegate/Window/WindowDelegate";
import ConfigProvider from "#/Provider/Config/ConfigProvider";

describe('SessionController', () => {
    const repoMock = new class implements SessionRepository {
        get = jest.fn();
        remove = jest.fn();
        removeAll = jest.fn();
        set = jest.fn();
        allSessions = [];
        setOnSessionUpdatedListener = jest.fn();
    };
    const sessionManagerDelegateMock = new class implements SessionManagerDelegate {
        clear = jest.fn();
        restore = jest.fn();
        setOnSessionSwitchedListener = jest.fn();
        setOnSessionAllClearRequestedListener = jest.fn();
        setOnSessionClearRequestedListener = jest.fn();
        setOnSessionRestoreRequestedListener = jest.fn();
        setOnSessionSaveRequestedListener = jest.fn();
        setOnSessionUpdatedListener = jest.fn();
    };
    const windowDelegateMock = new class implements WindowDelegate {
        showMessage = jest.fn();
    };
    const configProviderMock = new class implements ConfigProvider {
        provide = jest.fn();
        setOnConfigDirtyListener = jest.fn();
    };
    let controller = new SessionController(
        repoMock,
        sessionManagerDelegateMock,
        windowDelegateMock,
        configProviderMock,
    );

    const expected = {
        name: 'TEST-SESSION-A',
        editors: [
            { uri: 'TEST-SESSION-EDITOR-A', column: 0, order: 0 },
            { uri: 'TEST-SESSION-EDITOR-B', column: 1, order: 1 },
        ],
    };

    beforeEach(() => jest.resetAllMocks());

    it('should restore saved session', async () => {
        repoMock.get = jest.fn((nameOfSession: string) => {
            return nameOfSession === 'TEST-SESSION-A' ? expected : undefined;
        });
        await controller.onSessionRestoreRequested('TEST-SESSION-A');
        expect(sessionManagerDelegateMock.restore).toHaveBeenCalledWith(expected);
    });

    it('should save current session', async () => {
        await controller.onSessionUpdated(expected);
        expect(repoMock.set).toHaveBeenCalledWith(expected);
    });

    // TODO: more tests
});
