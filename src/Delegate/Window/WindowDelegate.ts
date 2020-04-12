export default interface WindowDelegate {
    /**
     * show information message popup
     * @param text message body text
     */
    showMessage(text: string): Promise<any>;
}
