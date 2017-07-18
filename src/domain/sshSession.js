/** @module domain */

/**
 * A SolarSSH session object.
 */
class SshSession {
    
    /**
     * Constructor.
     * 
     * @param {Date} created the creation date
     * @param {string} sessionId the unique session ID
     * @param {number} nodeId the node ID
     * @param {string} sshHost the SSH host name
     * @param {number} sshPort the SSH port
     * @param {number} reverseSshPort the reverse SSH port
     * @param {number} [startInstructionId] the <code>StartRemoteSsh</code> instruction ID
     * @param {number} [stopInstructionId] the <code>StopRemoteSsh</code> instruction ID
     */
    constructor(created, sessionId, nodeId, sshHost, sshPort, reverseSshPort,
            startInstructionId, stopInstructionId) {
        this.created = created;
        this.sessionId = sessionId;
        this.nodeId = nodeId;
        this.sshHost = sshHost;
        this.sshPort = sshPort;
        this.reverseSshPort = reverseSshPort;
        this.startInstructionId = startInstructionId;
        this.stopInstructionId = stopInstructionId;
        if ( this.constructor === SshSession ) {
            Object.freeze(this);
        }
    }

    /**
     * Get this object as a standard JSON encoded string value.
     * 
     * @return {string} the JSON encoded string
     */
    toJsonEncoding() {
        const result = {};
        if ( this.sessionId ) {
            result['sessionId'] = this.sessionId;
        }
        if ( this.created ) {
            result['created'] = this.created.getTime();
        }
        if ( this.nodeId ) {
            result['nodeId'] = this.nodeId;
        }
        if ( this.sshHost ) {
            result['host'] = this.sshHost;
        }
        if ( this.sshPort ) {
            result['port'] = this.sshPort;
        }
        if ( this.reverseSshPort ) {
            result['reversePort'] = this.reverseSshPort;
        }
        if ( this.startInstructionId ) {
            result['startInstructionId'] = this.startInstructionId;
        }
        if ( this.stopInstructionId ) {
            result['stopInstructionId'] = this.stopInstructionId;
        }

		return JSON.stringify(result);
    }

    /**
     * Parse a JSON string into a {@link module:domain~SshSession} instance.
     * 
     * The JSON must be encoded the same way {@link module:domain~SshSession#toJsonEncoding} does.
     * 
     * @param {string} json the JSON to parse
     * @returns {module:domain~SshSession} the session instance 
     */
    static fromJsonEncoding(json) {
        const args = [];
        if ( json ) {
            const obj = JSON.parse(json);
            if ( obj.created ) {
                args.push(new Date(obj.created));
            } else {
                args.push(new Date());
            }
            args.push(obj.sessionId || '');
            args.push(obj.nodeId || null);
            args.push(obj.host || '');
            args.push(obj.port || null);
            args.push(obj.reversePort || null);
            args.push(obj.startInstructionId);
            args.push(obj.stopInstructionId);
        }
        return new SshSession(...args);
    }

}

export default SshSession;
