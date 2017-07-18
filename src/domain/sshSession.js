/** @module domain */

/**
 * A SolarSSH session object.
 */
class SshSession {
    
    /**
     * Constructor.
     * 
     * @param {string} sessionId the unique session ID
     */
    constructor(sessionId) {
        this._sessionId = sessionId;
    }

    /**
     * The session unique ID.
     * 
     * @type {string}
     */
    get sessionId() {
        return this._sessionId;
    }
}

export default SshSession;
