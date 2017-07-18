import { Environment } from 'solarnetwork-api-core';

/** The SolarSsh default path. */
export const SolarSshDefaultPath = '';

/** The {@link UrlHelper} parameters key for the SolarSsh path. */
export const SolarSshPathKey = 'solarSshPath';

/** The SolarSsh REST API path. */
export const SolarSshApiPathV1 = '/api/v1';

/** The SolarSsh WebSocket path for a terminal connection. */
export const SolarSshTerminalWebSocketPath = '/ssh';

/** An {@link UrlHelper} parameter key for a {@link SshSession} instance. */
export const SshSessionKey = 'sshSession';

/**
 * Create a SshUrlHelperMixin class.
 *
 * @exports sshUrlHelperMixin
 * @param {UrlHelper} superclass the UrlHelper class to mix onto
 * @return {module:sshUrlHelperMixin~mixin} the mixin class
 */
const SshUrlHelperMixin = (superclass) => 

/**
 * A mixin class that adds SolarSsh specific support to {@link UrlHelper}.
 * 
 * @mixin
 * @alias module:sshUrlHelperMixin~mixin
 */
class extends superclass {

    /**
     * Constructor.
     * 
     * @param {*} args any number of arguments, but the first argument is assumed to be either an {@link Environment}
     *                 instance or a simple object that serves as the SolarSSH environment 
     */
    constructor(...args) {
        const env = (args && args[0] ? (args[0] instanceof Environment ? args[0] : new Environment(args[0])) : new Environment({
			tls: true,
            host: 'ssh.solarnetwork.net',
            port: 8443,
			solarSshPath: '',
        }));
        if ( !args ) {
            args = [];
        }
        args[0] = env;
        super(...args);
    }

    /**
     * A SSH session object.
     * 
     * @type {SshSession}
     */
    get sshSession() {
        return this.parameter(SshSessionKey);
    }

    set sshSession(sshSession) {
        this.parameter(SshSessionKey, sshSession);
    }

    /**
     * Shortcut for getting the SSH session ID from the {@link SshUrlHelperMixin#session} property.
     * 
     * @alias SshSession#sessionId
     * @readonly
     * @type {string}
     */
    get sshSessionId() {
        const session = this.sshSession;
        return (session ? session.sessionId : undefined);
    }

    /**
	 * Get the base URL to the SolarSSH v1 REST API.
	 * 
	 * The returned URL uses the configured environment to resolve
	 * the <code>hostUrl</code>, the <code>solarSshPath</code> context path.
	 * 
	 * @returns {string} the base URL to SolarSSH
	 */
	baseUrl() {
		const path = this.env(SolarSshPathKey) || SolarSshDefaultPath;
		return this.hostUrl() + path + SolarSshApiPathV1;
    }

    /**
     * Get the URL to the SolarSSH WebSocket termainl connection to the configured SolarNode.
     * 
     * @returns {string} the WebSocket terminal URL
     */
    terminalWebSocketUrl() {
		const path = this.env(SolarSshPathKey) || SolarSshDefaultPath;
		return this.hostWebSocketUrl() + path + SolarSshTerminalWebSocketPath;
    }
    
    /**
     * Get the URL to the SolarSSH HTTP proxy to the configured SolarNode.
     * 
     * @param {string} [sessionId] the {@link SshSession} ID to use; if not provided the {@link module:sshUrlHelperMixin~mixin#sshSessionId} value will be used
     * @returns {string} the HTTP proxy URL
     */
    httpProxyUrl(sessionId) {
		const path = this.env(SolarSshPathKey) || SolarSshDefaultPath;
        const sessId = (sessionId || this.sshSessionId);
        return this.hostUrl() + path + '/nodeproxy/' +encodeURIComponent(sessId) + '/';
	}

    /**
     * Generate a URL for creating a new SolarSSH session.
     * 
     * @param {number} [nodeId] the node ID to connect to; if not provided the <code>nodeId</code> property of this object will be used
     * @returns {string} the URL
     */
    createSshSessionUrl(nodeId) {
        const node = (nodeId || this.nodeId);
        return this.baseUrl() + '/ssh/session/new?nodeId=' + node;
    }

    /**
     * Generate a URL for starting a SolarSSH session.
     * 
     * @param {string} [sessionId] the {@link SshSession} ID to use; if not provided the {@link module:sshUrlHelperMixin~mixin#sshSessionId} value will be used
     * @returns {string} the URL
     */
    startSshSessionUrl(sessionId) {
        const sessId = (sessionId || this.sshSessionId);
        return this.baseUrl() + '/ssh/session/' +encodeURIComponent(sessId) +'/start';
    }
};

export default SshUrlHelperMixin;
