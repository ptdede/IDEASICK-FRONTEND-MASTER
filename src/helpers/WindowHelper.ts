class WindowHelper {

    static checkIfIframe(): boolean {
        if (typeof window === "undefined") { return false; }
        try {
            if (window.self !== window.top) { return true; }
        } catch (e) {
            return false;
        }
    }
}

export default WindowHelper;
