// https://github.com/SolarNetwork/sn-api-ssh-js Version 0.2.0. Copyright 2017 Matt Magoffin.
import { AuthorizationV2Builder, ComparableEnum, Environment, NodeInstructionUrlHelperMixin, NodeMetadataUrlHelperMixin, NodeUrlHelperMixin, UrlHelper, UserUrlHelperMixin, objectToStringMap, stringMapToObject } from 'solarnetwork-api-core';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * A command with data.
 */
var SshCommand = function () {

    /**
     * Constructor.
     * 
     * @param {string} command the command
     * @param {*} [data] optional data to associate with the command
     */
    function SshCommand(command, data) {
        classCallCheck(this, SshCommand);

        this.command = command;
        this.data = data;
        if (this.constructor === SshCommand) {
            Object.freeze(this);
        }
    }

    /**
     * Get this object as a standard JSON encoded string value.
     * 
     * If <code>data</code> has a <code>toJsonEncoding()</code> function, that will be invoked
     * and used in the result. Otherwise the <code>data</code> object will be serialized to
     * JSON via <code>JSON.stringify()</code>.
     * 
     * @return {string} the JSON encoded string
     */


    createClass(SshCommand, [{
        key: 'toJsonEncoding',
        value: function toJsonEncoding() {
            var result = {};
            if (this.command) {
                result['cmd'] = this.command;
            }
            var data = this.data;
            if (data && data.toJsonEncoding) {
                var dataJson = data.toJsonEncoding();
                result['data'] = JSON.parse(dataJson);
            } else if (data) {
                result['data'] = data;
            }

            return JSON.stringify(result);
        }

        /**
         * Parse a JSON string into a {@link module:domain~SshCommand} instance.
         * 
         * The JSON must be encoded the same way {@link module:domain~SshCommand#toJsonEncoding} does.
         * 
         * @param {string} json the JSON to parse
         * @param {function} [dataParser] if provided, a function that accepts a string of JSON and returns
         *                                an object representation of that data; if not provided then a 
         *                                simple object parsed via <code>JSON.parse()</code> will be used
         * @returns {module:domain~SshCommand} the command instance 
         */

    }], [{
        key: 'fromJsonEncoding',
        value: function fromJsonEncoding(json, dataParser) {
            var command = void 0,
                data = void 0;
            if (json) {
                var obj = JSON.parse(json);
                command = obj['cmd'];
                data = obj['data'];
                if (data && dataParser) {
                    data = dataParser(JSON.stringify(data));
                }
            }
            return new SshCommand(command, data);
        }
    }]);
    return SshCommand;
}();

/** @module domain */

/**
 * Settings for a SSH terminal.
 */

var SshTerminalSettings = function () {

    /**
     * Constructor.
     * 
     * @param {number} [cols=80] the characters width
     * @param {number} [lines=24] the number of lines
     * @param {number} [width=640] the pixel width
     * @param {number} [height=480] the pixel height
     * @param {string} [type=xterm] the terminal type
     * @param {Map<string, string>} [environment] environment properties to pass to the shell
     */
    function SshTerminalSettings(cols, lines, width, height, type, environment) {
        classCallCheck(this, SshTerminalSettings);

        this.cols = cols || 80;
        this.lines = lines || 24;
        this.width = width || 640;
        this.height = height || 480;
        this.type = type || 'xterm';
        this.environment = environment instanceof Map ? environment : objectToStringMap(environment);
    }

    /**
     * Get this object as a standard JSON encoded string value.
     * 
     * @return {string} the JSON encoded string
     */


    createClass(SshTerminalSettings, [{
        key: 'toJsonEncoding',
        value: function toJsonEncoding() {
            var result = {};
            if (this.type) {
                result['term'] = this.type;
            }
            if (this.cols) {
                result['cols'] = this.cols;
            }
            if (this.lines) {
                result['lines'] = this.lines;
            }
            if (this.width) {
                result['width'] = this.width;
            }
            if (this.height) {
                result['height'] = this.height;
            }
            if (this.environment instanceof Map && this.environment.size > 0) {
                result['environment'] = stringMapToObject(this.environment);
            }

            return JSON.stringify(result);
        }

        /**
         * Parse a JSON string into a {@link module:domain~SshTerminalSettings} instance.
         * 
         * The JSON must be encoded the same way {@link module:domain~SshTerminalSettings#toJsonEncoding} does.
         * 
         * @param {string} json the JSON to parse
         * @returns {module:domain~SshTerminalSettings} the session instance 
         */

    }], [{
        key: 'fromJsonEncoding',
        value: function fromJsonEncoding(json) {
            var result = new SshTerminalSettings();
            if (json) {
                var obj = JSON.parse(json);
                if (obj['term']) {
                    result.type = obj['term'];
                }
                if (obj['cols']) {
                    result.cols = obj['cols'];
                }
                if (obj['lines']) {
                    result.lines = obj['lines'];
                }
                if (obj['width']) {
                    result.width = obj['width'];
                }
                if (obj['height']) {
                    result.height = obj['height'];
                }
                if (obj['environment']) {
                    result.environment = objectToStringMap(obj['environment']);
                }
            }
            return result;
        }
    }]);
    return SshTerminalSettings;
}();

/** The command for attaching to a SSH terminal shell. */
var SolarSshCommandAttachSsh = 'attach-ssh';

/**
 * SSH command for attaching to a SSH terminal shell.
 */

var AttachSshCommand = function (_SshCommand) {
    inherits(AttachSshCommand, _SshCommand);

    /**
     * Constructor.
     * 
     * @param {string} authorization a pre-computed SNWS2 authorization header, which must match
     *        exactly a `GET` request to the `/solaruser/api/v1/sec/nodes/meta/:nodeId`
     *        path using the provided authorization date and, node ID.
     * @param {Date|number} authorizationDate the date used in the `authorization` value
     * @param {string} username the SSH username to use
     * @param {string} password the SSH password to use
     * @param {SshTerminalSettings} [terminalSettings] optional terminal settings to use
     */
    function AttachSshCommand(authorization, authorizationDate, username, password, terminalSettings) {
        classCallCheck(this, AttachSshCommand);

        var data = {};
        data['authorization'] = authorization;
        data['authorization-date'] = authorizationDate instanceof Date ? authorizationDate.getTime() : authorizationDate;
        data['username'] = username;
        data['password'] = password;
        if (terminalSettings instanceof SshTerminalSettings) {
            var termOpts = JSON.parse(terminalSettings.toJsonEncoding());
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(termOpts)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var prop = _step.value;

                    if (data[prop] === undefined) {
                        data[prop] = termOpts[prop];
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
        return possibleConstructorReturn(this, (AttachSshCommand.__proto__ || Object.getPrototypeOf(AttachSshCommand)).call(this, SolarSshCommandAttachSsh, data));
    }

    return AttachSshCommand;
}(SshCommand);

/** @module domain */

/**
 * A named socket close code.
 */

var SshCloseCode = function (_ComparableEnum) {
  inherits(SshCloseCode, _ComparableEnum);

  /**
   * Constructor.
   * 
   * @param {string} name the name
   * @param {value} value the value
   */
  function SshCloseCode(name, value) {
    classCallCheck(this, SshCloseCode);

    var _this = possibleConstructorReturn(this, (SshCloseCode.__proto__ || Object.getPrototypeOf(SshCloseCode)).call(this, name, value));

    if (_this.constructor === SshCloseCode) {
      Object.freeze(_this);
    }
    return _this;
  }

  /**
  * Get the {@link SshCloseCodes} values.
  * 
  * @inheritdoc
  */


  createClass(SshCloseCode, null, [{
    key: 'enumValues',
    value: function enumValues() {
      return SshCloseCodeValues;
    }
  }]);
  return SshCloseCode;
}(ComparableEnum);

var SshCloseCodeValues = Object.freeze([new SshCloseCode('AUTHENTICATION_FAILURE', 4000)]);

/**
 * The enumeration of supported SshCloseCode values.
 * 
 * @readonly
 * @enum {SshCloseCode}
 * @property {SshCloseCode} AUTHENTICATION_FAILURE an authentication failure
 */
var SshCloseCodes = SshCloseCode.enumsValue(SshCloseCodeValues);

/** @module domain */

/**
 * A SolarSSH session object.
 */
var SshSession = function () {

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
    function SshSession(created, sessionId, nodeId, sshHost, sshPort, reverseSshPort, startInstructionId, stopInstructionId) {
        classCallCheck(this, SshSession);

        this.created = created;
        this.sessionId = sessionId;
        this.nodeId = nodeId;
        this.sshHost = sshHost;
        this.sshPort = sshPort;
        this.reverseSshPort = reverseSshPort;
        this.startInstructionId = startInstructionId;
        this.stopInstructionId = stopInstructionId;
        if (this.constructor === SshSession) {
            Object.freeze(this);
        }
    }

    /**
     * Get this object as a standard JSON encoded string value.
     * 
     * @return {string} the JSON encoded string
     */


    createClass(SshSession, [{
        key: 'toJsonEncoding',
        value: function toJsonEncoding() {
            var result = {};
            if (this.sessionId) {
                result['sessionId'] = this.sessionId;
            }
            if (this.created) {
                result['created'] = this.created.getTime();
            }
            if (this.nodeId) {
                result['nodeId'] = this.nodeId;
            }
            if (this.sshHost) {
                result['host'] = this.sshHost;
            }
            if (this.sshPort) {
                result['port'] = this.sshPort;
            }
            if (this.reverseSshPort) {
                result['reversePort'] = this.reverseSshPort;
            }
            if (this.startInstructionId) {
                result['startInstructionId'] = this.startInstructionId;
            }
            if (this.stopInstructionId) {
                result['stopInstructionId'] = this.stopInstructionId;
            }

            return JSON.stringify(result);
        }

        /**
         * Parse a JSON string into a {@link module:domain~SshSession} instance.
         * 
         * The JSON must be encoded the same way {@link module:domain~SshSession#toJsonEncoding} does.
         * 
         * @param {string|Object} json the JSON to parse, or a parsed JSON object
         * @returns {module:domain~SshSession} the session instance 
         */

    }], [{
        key: 'fromJsonEncoding',
        value: function fromJsonEncoding(json) {
            var args = [];
            if (json) {
                var obj = typeof json === 'string' ? JSON.parse(json) : json;
                if (obj.created) {
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
            return new (Function.prototype.bind.apply(SshSession, [null].concat(args)))();
        }
    }]);
    return SshSession;
}();

/** @module net */

/** The SolarSsh default path. */
var SolarSshDefaultPath = '';

/** The {@link UrlHelper} parameters key for the SolarSsh path. */
var SolarSshPathKey = 'solarSshPath';

/** The SolarSsh REST API path. */
var SolarSshApiPathV1 = '/api/v1';

/** The SolarSsh WebSocket path for a terminal connection. */
var SolarSshTerminalWebSocketPath = '/ssh';

/** The sub-protocol to use for SolarSSH WebSocket connections. */
var SolarSshTerminalWebSocketSubProtocol = 'solarssh';

/** An {@link UrlHelper} parameter key for a {@link SshSession} instance. */
var SshSessionKey = 'sshSession';

/** The node instruction for initiating a SolarSSH connection. */
var StartRemoteSshInstructionName = 'StartRemoteSsh';

/** The node instruction for closing a SolarSSH connection. */
var StopRemoteSshInstructionName = 'StopRemoteSsh';

/**
 * UrlHelper that supports instructions and node metadata.
 */

var InstructionUrlHelper = function (_NodeInstructionUrlHe) {
  inherits(InstructionUrlHelper, _NodeInstructionUrlHe);

  function InstructionUrlHelper() {
    classCallCheck(this, InstructionUrlHelper);
    return possibleConstructorReturn(this, (InstructionUrlHelper.__proto__ || Object.getPrototypeOf(InstructionUrlHelper)).apply(this, arguments));
  }

  return InstructionUrlHelper;
}(NodeInstructionUrlHelperMixin(NodeMetadataUrlHelperMixin(UserUrlHelperMixin(NodeUrlHelperMixin(UrlHelper)))));

/**
 * Create a SshUrlHelperMixin class.
 *
 * @exports net
 * @param {UrlHelper} superclass the UrlHelper class to mix onto
 * @return {module:net~SshUrlHelperMixin} the mixin class
 */


var SshUrlHelperMixin = function SshUrlHelperMixin(superclass) {
  return (

    /**
     * A mixin class that adds SolarSsh specific support to {@link UrlHelper}.
     * 
     * @mixin
     * @alias module:net~SshUrlHelperMixin
     */
    function (_superclass) {
      inherits(_class, _superclass);

      /**
       * Constructor.
       * 
       * @param {*} args any number of arguments, but the first argument is assumed to be either an {@link Environment}
       *                 instance or a simple object that serves as the SolarSSH environment 
       */
      function _class() {
        var _ref;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        classCallCheck(this, _class);

        var env = args && args[0] ? args[0] instanceof Environment ? args[0] : new Environment(args[0]) : new Environment({
          tls: true,
          host: 'ssh.solarnetwork.net',
          port: 8443,
          solarSshPath: ''
        });
        if (!args) {
          args = [];
        }
        args[0] = env;

        var _this2 = possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(toConsumableArray(args))));

        _this2._instructionUrlHelper = new InstructionUrlHelper();
        _this2._instructionAuthBuilder = new AuthorizationV2Builder(null, _this2._instructionUrlHelper);
        return _this2;
      }

      /**
       * A SSH session object.
       * 
       * @type {SshSession}
       */


      createClass(_class, [{
        key: 'baseUrl',


        /**
        * Get the base URL to the SolarSSH v1 REST API.
        * 
        * The returned URL uses the configured environment to resolve
        * the <code>hostUrl</code>, the <code>solarSshPath</code> context path.
        * 
        * @returns {string} the base URL to SolarSSH
        */
        value: function baseUrl() {
          var path = this.env(SolarSshPathKey) || SolarSshDefaultPath;
          return this.hostUrl() + path + SolarSshApiPathV1;
        }

        /**
         * Get the URL to the SolarSSH WebSocket termainl connection to the configured SolarNode.
         * 
         * @param {string} [sessionId] the {@link SshSession} ID to use; if not provided the {@link module:net~SshUrlHelperMixin#sshSessionId} value will be used
         * @returns {string} the WebSocket terminal URL
         */

      }, {
        key: 'terminalWebSocketUrl',
        value: function terminalWebSocketUrl(sessionId) {
          var path = this.env(SolarSshPathKey) || SolarSshDefaultPath;
          var sessId = sessionId || this.sshSessionId;
          return this.hostWebSocketUrl() + path + SolarSshTerminalWebSocketPath + '?sessionId=' + encodeURIComponent(sessId);
        }

        /**
         * Get the URL to the SolarSSH HTTP proxy to the configured SolarNode.
         * 
         * @param {string} [sessionId] the {@link SshSession} ID to use; if not provided the {@link module:net~SshUrlHelperMixin#sshSessionId} value will be used
         * @returns {string} the HTTP proxy URL
         */

      }, {
        key: 'httpProxyUrl',
        value: function httpProxyUrl(sessionId) {
          var path = this.env(SolarSshPathKey) || SolarSshDefaultPath;
          var sessId = sessionId || this.sshSessionId;
          return this.hostUrl() + path + '/nodeproxy/' + encodeURIComponent(sessId) + '/';
        }

        /**
         * Generate a URL for creating a new SolarSSH session.
         * 
         * @param {number} [nodeId] the node ID to connect to; if not provided the <code>nodeId</code> property of this object will be used
         * @returns {string} the URL
         */

      }, {
        key: 'createSshSessionUrl',
        value: function createSshSessionUrl(nodeId) {
          var node = nodeId || this.nodeId;
          return this.baseUrl() + '/ssh/session/new?nodeId=' + node;
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

      }, {
        key: 'createSshSessionAuthBuilder',
        value: function createSshSessionAuthBuilder(nodeId) {
          return this._instructionAuthBuilder.reset().snDate(true).method('GET').url(this._instructionUrlHelper.viewPendingInstructionsUrl(nodeId));
        }

        /**
         * Generate a URL for starting a SolarSSH session.
         * 
         * @param {string} [sessionId] the {@link SshSession} ID to use; if not provided the {@link module:net~SshUrlHelperMixin#sshSessionId} value will be used
         * @returns {string} the URL
         */

      }, {
        key: 'startSshSessionUrl',
        value: function startSshSessionUrl(sessionId) {
          var sessId = sessionId || this.sshSessionId;
          return this.baseUrl() + '/ssh/session/' + encodeURIComponent(sessId) + '/start';
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

      }, {
        key: 'startSshSessionAuthBuilder',
        value: function startSshSessionAuthBuilder(sshSession, nodeId) {
          var session = sshSession || this.sshSession || {};
          return this._instructionAuthBuilder.reset().snDate(true).method('POST').contentType('application/x-www-form-urlencoded').url(this._instructionUrlHelper.queueInstructionUrl(StartRemoteSshInstructionName, [{ name: 'host', value: session.sshHost }, { name: 'user', value: session.sessionId }, { name: 'port', value: session.sshPort }, { name: 'rport', value: session.reverseSshPort }], nodeId));
        }

        /**
         * Generate a URL for stopping a SolarSSH session.
         * 
         * @param {string} [sessionId] the {@link module:domain/sshSession~SshSession} ID to use; if not provided the {@link module:net~SshUrlHelperMixin#sshSessionId} value will be used
         * @returns {string} the URL
         */

      }, {
        key: 'stopSshSessionUrl',
        value: function stopSshSessionUrl(sessionId) {
          var sessId = sessionId || this.sshSessionId;
          return this.baseUrl() + '/ssh/session/' + encodeURIComponent(sessId) + '/stop';
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

      }, {
        key: 'stopSshSessionAuthBuilder',
        value: function stopSshSessionAuthBuilder(sshSession, nodeId) {
          var session = sshSession || this.sshSession || {};
          var node = nodeId || this.nodeId;
          return this._instructionAuthBuilder.reset().snDate(true).method('POST').contentType('application/x-www-form-urlencoded').url(this._instructionUrlHelper.queueInstructionUrl(StopRemoteSshInstructionName, [{ name: 'host', value: session.sshHost }, { name: 'user', value: session.sessionId }, { name: 'port', value: session.sshPort }, { name: 'rport', value: session.reverseSshPort }], node));
        }

        /**
         * Generate a URL for viewing the <code>StartRemoteSsh</code> instruction.
         * 
         * @param {number} [instructionId] the instruction ID to view; if not provided the <code>startInstructionId</code> property of the session will be used
         * @returns {string} the URL
         */

      }, {
        key: 'viewStartRemoteSshInstructionUrl',
        value: function viewStartRemoteSshInstructionUrl(instructionId) {
          var session = this.sshSession || {};
          var instrId = instructionId || session.startInstructionId;
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

      }, {
        key: 'viewStartRemoteSshInstructionAuthBuilder',
        value: function viewStartRemoteSshInstructionAuthBuilder(instructionId) {
          return this._instructionAuthBuilder.reset().snDate(true).url(this.viewStartRemoteSshInstructionUrl(instructionId));
        }

        /**
         * Generate a URL for viewing the <code>StopRemoteSsh</code> instruction.
         * 
         * @param {number} [instructionId] the instruction ID to view; if not provided the <code>startInstructionId</code> property of the session will be used
         * @returns {string} the URL
         */

      }, {
        key: 'viewStopRemoteSshInstructionUrl',
        value: function viewStopRemoteSshInstructionUrl(instructionId) {
          var session = this.sshSession || {};
          var instrId = instructionId || session.stopInstructionId;
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

      }, {
        key: 'viewStopRemoteSshInstructionAuthBuilder',
        value: function viewStopRemoteSshInstructionAuthBuilder(instructionId) {
          return this._instructionAuthBuilder.reset().snDate(true).url(this.viewStopRemoteSshInstructionUrl(instructionId));
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

      }, {
        key: 'connectTerminalWebSocketAuthBuilder',
        value: function connectTerminalWebSocketAuthBuilder(nodeId) {
          var node = nodeId || this.nodeId;
          return this._instructionAuthBuilder.reset().snDate(true).method('GET').url(this._instructionUrlHelper.viewNodeMetadataUrl(node));
        }
      }, {
        key: 'sshSession',
        get: function get$$1() {
          return this.parameter(SshSessionKey);
        },
        set: function set$$1(sshSession) {
          this.parameter(SshSessionKey, sshSession);
        }

        /**
         * Set the node ID.
         * @override
         * @inheritdoc
         */

      }, {
        key: 'nodeId',
        set: function set$$1(nodeId) {
          set(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'nodeId', nodeId, this);
          this._instructionUrlHelper.nodeId = nodeId;
        }

        /**
         * Get the node ID.
         * @override
         * @inheritdoc
         */
        ,
        get: function get$$1() {
          return get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'nodeId', this);
        }

        /**
         * Get the environment used for instruction URL pre-authorization values.
         * 
         * @type {Environment}
         */

      }, {
        key: 'nodeUrlHelperEnvironment',
        get: function get$$1() {
          return this._instructionUrlHelper.environment;
        },
        set: function set$$1(environment) {
          this._instructionUrlHelper.environment = environment;
          this._instructionAuthBuilder.environment = environment;
        }

        /**
         * Get the auth builder used for instruction URL pre-authorization values.
         * 
         * @type {AuthorizationV2Builder}
         */

      }, {
        key: 'nodeInstructionAuthBuilder',
        get: function get$$1() {
          return this._instructionAuthBuilder;
        }

        /**
         * Shortcut for getting the SSH session ID from the {@link module:domain~SshSession#session} property.
         * 
         * @alias SshSession#sessionId
         * @readonly
         * @type {string}
         */

      }, {
        key: 'sshSessionId',
        get: function get$$1() {
          var session = this.sshSession;
          return session ? session.sessionId : undefined;
        }
      }]);
      return _class;
    }(superclass)
  );
};

/**
 * A concrete {@link UrlHelper} with the {@link module:net~SshUrlHelperMixin} and
 * {@link NodeUrlHelperMixin} mixins.
 * 
 * @mixes SshUrlHelperMixin
 * @mixes NodeUrlHelperMixin
 * @extends UrlHelper
 */

var SshUrlHelper = function (_SshUrlHelperMixin) {
  inherits(SshUrlHelper, _SshUrlHelperMixin);

  function SshUrlHelper() {
    classCallCheck(this, SshUrlHelper);
    return possibleConstructorReturn(this, (SshUrlHelper.__proto__ || Object.getPrototypeOf(SshUrlHelper)).apply(this, arguments));
  }

  return SshUrlHelper;
}(SshUrlHelperMixin(NodeUrlHelperMixin(UrlHelper)));

export { AttachSshCommand, SshCloseCodes, SshCloseCode, SshCommand, SshSession, SshTerminalSettings, SshUrlHelperMixin, SolarSshDefaultPath, SolarSshPathKey, SolarSshApiPathV1, SolarSshTerminalWebSocketPath, SolarSshTerminalWebSocketSubProtocol, StartRemoteSshInstructionName, StopRemoteSshInstructionName, SshSessionKey, SshUrlHelper };
//# sourceMappingURL=solarnetwork-api-ssh.es.js.map
