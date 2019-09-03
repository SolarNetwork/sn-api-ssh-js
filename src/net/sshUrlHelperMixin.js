/** @module net */

import {
  AuthorizationV2Builder,
  Environment,
  NodeInstructionUrlHelperMixin,
  NodeMetadataUrlHelperMixin,
  NodeUrlHelperMixin,
  UrlHelper,
  UserUrlHelperMixin
} from "solarnetwork-api-core";

/** The SolarSsh default path. */
export const SolarSshDefaultPath = "";

/** The {@link UrlHelper} parameters key for the SolarSsh path. */
export const SolarSshPathKey = "solarSshPath";

/** The SolarSsh REST API path. */
export const SolarSshApiPathV1 = "/api/v1";

/** The SolarSsh WebSocket path for a terminal connection. */
export const SolarSshTerminalWebSocketPath = "/ssh";

/** The sub-protocol to use for SolarSSH WebSocket connections. */
export const SolarSshTerminalWebSocketSubProtocol = "solarssh";

/** An {@link UrlHelper} parameter key for a {@link SshSession} instance. */
export const SshSessionKey = "sshSession";

/** The node instruction for initiating a SolarSSH connection. */
export const StartRemoteSshInstructionName = "StartRemoteSsh";

/** The node instruction for closing a SolarSSH connection. */
export const StopRemoteSshInstructionName = "StopRemoteSsh";

/**
 * UrlHelper that supports instructions and node metadata.
 */
class InstructionUrlHelper extends NodeInstructionUrlHelperMixin(
  NodeMetadataUrlHelperMixin(UserUrlHelperMixin(NodeUrlHelperMixin(UrlHelper)))
) {}

/**
 * Create a SshUrlHelperMixin class.
 *
 * @exports net
 * @param {UrlHelper} superclass the UrlHelper class to mix onto
 * @return {module:net~SshUrlHelperMixin} the mixin class
 */
const SshUrlHelperMixin = superclass =>
  /**
   * A mixin class that adds SolarSsh specific support to {@link UrlHelper}.
   *
   * @mixin
   * @alias module:net~SshUrlHelperMixin
   */
  class extends superclass {
    /**
     * Constructor.
     *
     * @param {*} args any number of arguments, but the first argument is assumed to be either an {@link Environment}
     *                 instance or a simple object that serves as the SolarSSH environment
     */
    constructor(...args) {
      const env =
        args && args[0]
          ? args[0] instanceof Environment
            ? args[0]
            : new Environment(args[0])
          : new Environment({
              tls: true,
              host: "ssh.solarnetwork.net",
              port: 8443,
              solarSshPath: ""
            });
      if (!args) {
        args = [];
      }
      args[0] = env;
      super(...args);
      this._instructionUrlHelper = new InstructionUrlHelper();
      this._instructionAuthBuilder = new AuthorizationV2Builder(
        null,
        this._instructionUrlHelper
      );
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
     * Set the node ID.
     * @override
     * @inheritdoc
     */
    set nodeId(nodeId) {
      super.nodeId = nodeId;
      this._instructionUrlHelper.nodeId = nodeId;
    }

    /**
     * Get the node ID.
     * @override
     * @inheritdoc
     */
    get nodeId() {
      return super.nodeId;
    }

    /**
     * Get the environment used for instruction URL pre-authorization values.
     *
     * @type {Environment}
     */
    get nodeUrlHelperEnvironment() {
      return this._instructionUrlHelper.environment;
    }

    set nodeUrlHelperEnvironment(environment) {
      this._instructionUrlHelper.environment = environment;
      this._instructionAuthBuilder.environment = environment;
    }

    /**
     * Get the auth builder used for instruction URL pre-authorization values.
     *
     * @type {AuthorizationV2Builder}
     */
    get nodeInstructionAuthBuilder() {
      return this._instructionAuthBuilder;
    }

    /**
     * Shortcut for getting the SSH session ID from the {@link module:domain~SshSession#session} property.
     *
     * @alias SshSession#sessionId
     * @readonly
     * @type {string}
     */
    get sshSessionId() {
      const session = this.sshSession;
      return session ? session.sessionId : undefined;
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
     * @param {string} [sessionId] the {@link SshSession} ID to use; if not provided the {@link module:net~SshUrlHelperMixin#sshSessionId} value will be used
     * @returns {string} the WebSocket terminal URL
     */
    terminalWebSocketUrl(sessionId) {
      const path = this.env(SolarSshPathKey) || SolarSshDefaultPath;
      const sessId = sessionId || this.sshSessionId;
      return (
        this.hostWebSocketUrl() +
        path +
        SolarSshTerminalWebSocketPath +
        "?sessionId=" +
        encodeURIComponent(sessId)
      );
    }

    /**
     * Get the URL to the SolarSSH HTTP proxy to the configured SolarNode.
     *
     * @param {string} [sessionId] the {@link SshSession} ID to use; if not provided the {@link module:net~SshUrlHelperMixin#sshSessionId} value will be used
     * @returns {string} the HTTP proxy URL
     */
    httpProxyUrl(sessionId) {
      const path = this.env(SolarSshPathKey) || SolarSshDefaultPath;
      const sessId = sessionId || this.sshSessionId;
      return (
        this.hostUrl() + path + "/nodeproxy/" + encodeURIComponent(sessId) + "/"
      );
    }

    /**
     * Generate a URL for creating a new SolarSSH session.
     *
     * @param {number} [nodeId] the node ID to connect to; if not provided the <code>nodeId</code> property of this object will be used
     * @returns {string} the URL
     */
    createSshSessionUrl(nodeId) {
      const node = nodeId || this.nodeId;
      return this.baseUrl() + "/ssh/session/new?nodeId=" + node;
    }

    /**
     * Configure the instruction auth builder for pre-signing the create session request.
     *
     * <p>The returned builder will be configured for a <code>GET</code> request using the
     * <code>viewPendingInstructionsUrl()</code> URL.
     *
     * @param {number} [nodeId] the node ID to instruct; if not provided the <code>nodeId</code> property of this object will be used
     * @returns {AuthorizationV2Builder} the builder
     */
    createSshSessionAuthBuilder(nodeId) {
      return this._instructionAuthBuilder
        .reset()
        .snDate(true)
        .method("GET")
        .url(this._instructionUrlHelper.viewPendingInstructionsUrl(nodeId));
    }

    /**
     * Generate a URL for starting a SolarSSH session.
     *
     * @param {string} [sessionId] the {@link SshSession} ID to use; if not provided the {@link module:net~SshUrlHelperMixin#sshSessionId} value will be used
     * @returns {string} the URL
     */
    startSshSessionUrl(sessionId) {
      const sessId = sessionId || this.sshSessionId;
      return (
        this.baseUrl() + "/ssh/session/" + encodeURIComponent(sessId) + "/start"
      );
    }

    /**
     * Configure the instruction auth builder for pre-signing the start session request.
     *
     * <p>The returned builder will be configured for a <code>POST</code> request using the
     * <code>queueInstructionUrl()</code> URL  with the <code>StartRemoteSsh</code> instruction.
     *
     * @param {SshSession} [sshSession] the session to use; if not provided the <code>sshSession</code> property of this object will be used
     * @param {number} [nodeId] the node ID to instruct; if not provided the <code>nodeId</code> property of this object will be used
     * @returns {AuthorizationV2Builder} the builder
     */
    startSshSessionAuthBuilder(sshSession, nodeId) {
      const session = sshSession || this.sshSession || {};
      return this._instructionAuthBuilder
        .reset()
        .snDate(true)
        .method("POST")
        .contentType("application/x-www-form-urlencoded")
        .url(
          this._instructionUrlHelper.queueInstructionUrl(
            StartRemoteSshInstructionName,
            [
              { name: "host", value: session.sshHost },
              { name: "user", value: session.sessionId },
              { name: "port", value: session.sshPort },
              { name: "rport", value: session.reverseSshPort }
            ],
            nodeId
          )
        );
    }

    /**
     * Generate a URL for stopping a SolarSSH session.
     *
     * @param {string} [sessionId] the {@link module:domain/sshSession~SshSession} ID to use; if not provided the {@link module:net~SshUrlHelperMixin#sshSessionId} value will be used
     * @returns {string} the URL
     */
    stopSshSessionUrl(sessionId) {
      const sessId = sessionId || this.sshSessionId;
      return (
        this.baseUrl() + "/ssh/session/" + encodeURIComponent(sessId) + "/stop"
      );
    }

    /**
     * Configure the instruction auth builder for pre-signing the stop session request.
     *
     * <p>The returned builder will be configured for a <code>POST</code> request using the
     * <code>queueInstructionUrl()</code> URL with the <code>StopRemoteSsh</code> instruction.
     *
     * @param {SshSession} [sshSession] the session to use; if not provided the <code>sshSession</code> property of this object will be used
     * @param {number} [nodeId] the node ID to instruct; if not provided the <code>nodeId</code> property of this object will be used
     * @returns {AuthorizationV2Builder} the builder
     */
    stopSshSessionAuthBuilder(sshSession, nodeId) {
      const session = sshSession || this.sshSession || {};
      const node = nodeId || this.nodeId;
      return this._instructionAuthBuilder
        .reset()
        .snDate(true)
        .method("POST")
        .contentType("application/x-www-form-urlencoded")
        .url(
          this._instructionUrlHelper.queueInstructionUrl(
            StopRemoteSshInstructionName,
            [
              { name: "host", value: session.sshHost },
              { name: "user", value: session.sessionId },
              { name: "port", value: session.sshPort },
              { name: "rport", value: session.reverseSshPort }
            ],
            node
          )
        );
    }

    /**
     * Generate a URL for viewing the <code>StartRemoteSsh</code> instruction.
     *
     * @param {number} [instructionId] the instruction ID to view; if not provided the <code>startInstructionId</code> property of the session will be used
     * @returns {string} the URL
     */
    viewStartRemoteSshInstructionUrl(instructionId) {
      const session = this.sshSession || {};
      const instrId = instructionId || session.startInstructionId;
      return this._instructionUrlHelper.viewInstructionUrl(instrId);
    }

    /**
     * Configure the instruction auth builder for signing the request to view the
     * <code>StartRemoteSsh</code> instruction.
     *
     * <p>The returned builder will be configured with the same URL returned from
     * {@link module:net~SshUrlHelperMixin#viewStartRemoteSshInstructionUrl}.
     *
     * @param {number} [instructionId] the instruction ID to view; if not provided the <code>startInstructionId</code> property of the session will be used
     * @returns {AuthorizationV2Builder} the builder
     */
    viewStartRemoteSshInstructionAuthBuilder(instructionId) {
      return this._instructionAuthBuilder
        .reset()
        .snDate(true)
        .url(this.viewStartRemoteSshInstructionUrl(instructionId));
    }

    /**
     * Generate a URL for viewing the <code>StopRemoteSsh</code> instruction.
     *
     * @param {number} [instructionId] the instruction ID to view; if not provided the <code>startInstructionId</code> property of the session will be used
     * @returns {string} the URL
     */
    viewStopRemoteSshInstructionUrl(instructionId) {
      const session = this.sshSession || {};
      const instrId = instructionId || session.stopInstructionId;
      return this._instructionUrlHelper.viewInstructionUrl(instrId);
    }

    /**
     * Configure the instruction auth builder for signing the request to view the
     * <code>StopRemoteSsh</code> instruction.
     *
     * <p>The returned builder will be configured with the same URL returned from
     * {@link module:net~SshUrlHelperMixin#viewStopRemoteSshInstructionUrl}.
     *
     * @param {number} [instructionId] the instruction ID to view; if not provided the <code>stopInstructionId</code> property of the session will be used
     * @returns {AuthorizationV2Builder} the builder
     */
    viewStopRemoteSshInstructionAuthBuilder(instructionId) {
      return this._instructionAuthBuilder
        .reset()
        .snDate(true)
        .url(this.viewStopRemoteSshInstructionUrl(instructionId));
    }

    /**
     * Configure the instruction auth builder for pre-signing the create session request.
     *
     * <p>The returned builder will be configured for a <code>GET</code> request using the
     * <code>viewPendingInstructionsUrl()</code> URL.
     *
     * @param {number} [nodeId] the node ID to instruct; if not provided the <code>nodeId</code> property of this object will be used
     * @returns {AuthorizationV2Builder} the builder
     */
    connectTerminalWebSocketAuthBuilder(nodeId) {
      const node = nodeId || this.nodeId;
      return this._instructionAuthBuilder
        .reset()
        .snDate(true)
        .method("GET")
        .url(this._instructionUrlHelper.viewNodeMetadataUrl(node));
    }
  };

/**
 * A concrete {@link UrlHelper} with the {@link module:net~SshUrlHelperMixin} and
 * {@link NodeUrlHelperMixin} mixins.
 *
 * @mixes SshUrlHelperMixin
 * @mixes NodeUrlHelperMixin
 * @extends UrlHelper
 */
class SshUrlHelper extends SshUrlHelperMixin(NodeUrlHelperMixin(UrlHelper)) {}

export default SshUrlHelperMixin;
export { SshUrlHelper };
