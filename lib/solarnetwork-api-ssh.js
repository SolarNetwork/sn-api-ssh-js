// https://github.com/SolarNetwork/sn-api-ssh-js Version 0.2.3-dev.0. Copyright 2019 SolarNetwork Foundation.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('solarnetwork-api-core')) :
  typeof define === 'function' && define.amd ? define(['exports', 'solarnetwork-api-core'], factory) :
  (global = global || self, factory(global.sn = {}, global.sn));
}(this, function (exports, solarnetworkApiCore) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function set(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
      set = Reflect.set;
    } else {
      set = function set(target, property, value, receiver) {
        var base = _superPropBase(target, property);

        var desc;

        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);

          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            return false;
          }
        }

        desc = Object.getOwnPropertyDescriptor(receiver, property);

        if (desc) {
          if (!desc.writable) {
            return false;
          }

          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          _defineProperty(receiver, property, value);
        }

        return true;
      };
    }

    return set(target, property, value, receiver);
  }

  function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);

    if (!s && isStrict) {
      throw new Error('failed to set property');
    }

    return value;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  /**
   * A command with data.
   */
  var SshCommand =
  /*#__PURE__*/
  function () {
    /**
     * Constructor.
     *
     * @param {string} command the command
     * @param {*} [data] optional data to associate with the command
     */
    function SshCommand(command, data) {
      _classCallCheck(this, SshCommand);

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


    _createClass(SshCommand, [{
      key: "toJsonEncoding",
      value: function toJsonEncoding() {
        var result = {};

        if (this.command) {
          result["cmd"] = this.command;
        }

        var data = this.data;

        if (data && data.toJsonEncoding) {
          var dataJson = data.toJsonEncoding();
          result["data"] = JSON.parse(dataJson);
        } else if (data) {
          result["data"] = data;
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
      key: "fromJsonEncoding",
      value: function fromJsonEncoding(json, dataParser) {
        var command, data;

        if (json) {
          var obj = JSON.parse(json);
          command = obj["cmd"];
          data = obj["data"];

          if (data && dataParser) {
            data = dataParser(JSON.stringify(data));
          }
        }

        return new SshCommand(command, data);
      }
    }]);

    return SshCommand;
  }();

  /**
   * Settings for a SSH terminal.
   */

  var SshTerminalSettings =
  /*#__PURE__*/
  function () {
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
      _classCallCheck(this, SshTerminalSettings);

      this.cols = cols || 80;
      this.lines = lines || 24;
      this.width = width || 640;
      this.height = height || 480;
      this.type = type || "xterm";
      this.environment = environment instanceof Map ? environment : solarnetworkApiCore.objectToStringMap(environment);
    }
    /**
     * Get this object as a standard JSON encoded string value.
     *
     * @return {string} the JSON encoded string
     */


    _createClass(SshTerminalSettings, [{
      key: "toJsonEncoding",
      value: function toJsonEncoding() {
        var result = {};

        if (this.type) {
          result["term"] = this.type;
        }

        if (this.cols) {
          result["cols"] = this.cols;
        }

        if (this.lines) {
          result["lines"] = this.lines;
        }

        if (this.width) {
          result["width"] = this.width;
        }

        if (this.height) {
          result["height"] = this.height;
        }

        if (this.environment instanceof Map && this.environment.size > 0) {
          result["environment"] = solarnetworkApiCore.stringMapToObject(this.environment);
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
      key: "fromJsonEncoding",
      value: function fromJsonEncoding(json) {
        var result = new SshTerminalSettings();

        if (json) {
          var obj = JSON.parse(json);

          if (obj["term"]) {
            result.type = obj["term"];
          }

          if (obj["cols"]) {
            result.cols = obj["cols"];
          }

          if (obj["lines"]) {
            result.lines = obj["lines"];
          }

          if (obj["width"]) {
            result.width = obj["width"];
          }

          if (obj["height"]) {
            result.height = obj["height"];
          }

          if (obj["environment"]) {
            result.environment = solarnetworkApiCore.objectToStringMap(obj["environment"]);
          }
        }

        return result;
      }
    }]);

    return SshTerminalSettings;
  }();

  /** The command for attaching to a SSH terminal shell. */

  var SolarSshCommandAttachSsh = "attach-ssh";
  /**
   * SSH command for attaching to a SSH terminal shell.
   */

  var AttachSshCommand =
  /*#__PURE__*/
  function (_SshCommand) {
    _inherits(AttachSshCommand, _SshCommand);

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
      _classCallCheck(this, AttachSshCommand);

      var data = {};
      data["authorization"] = authorization;
      data["authorization-date"] = authorizationDate instanceof Date ? authorizationDate.getTime() : authorizationDate;
      data["username"] = username;
      data["password"] = password;

      if (terminalSettings instanceof SshTerminalSettings) {
        var termOpts = JSON.parse(terminalSettings.toJsonEncoding());

        for (var _i = 0, _Object$keys = Object.keys(termOpts); _i < _Object$keys.length; _i++) {
          var prop = _Object$keys[_i];

          if (data[prop] === undefined) {
            data[prop] = termOpts[prop];
          }
        }
      }

      return _possibleConstructorReturn(this, _getPrototypeOf(AttachSshCommand).call(this, SolarSshCommandAttachSsh, data));
    }

    return AttachSshCommand;
  }(SshCommand);

  /**
   * A named socket close code.
   */

  var SshCloseCode =
  /*#__PURE__*/
  function (_ComparableEnum) {
    _inherits(SshCloseCode, _ComparableEnum);

    /**
     * Constructor.
     *
     * @param {string} name the name
     * @param {value} value the value
     */
    function SshCloseCode(name, value) {
      var _this;

      _classCallCheck(this, SshCloseCode);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(SshCloseCode).call(this, name, value));

      if (_this.constructor === SshCloseCode) {
        Object.freeze(_assertThisInitialized(_this));
      }

      return _this;
    }
    /**
     * Get the {@link SshCloseCodes} values.
     *
     * @inheritdoc
     */


    _createClass(SshCloseCode, null, [{
      key: "enumValues",
      value: function enumValues() {
        return SshCloseCodeValues;
      }
    }]);

    return SshCloseCode;
  }(solarnetworkApiCore.ComparableEnum);

  var SshCloseCodeValues = Object.freeze([new SshCloseCode("AUTHENTICATION_FAILURE", 4000)]);
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
  var SshSession =
  /*#__PURE__*/
  function () {
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
      _classCallCheck(this, SshSession);

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


    _createClass(SshSession, [{
      key: "toJsonEncoding",
      value: function toJsonEncoding() {
        var result = {};

        if (this.sessionId) {
          result["sessionId"] = this.sessionId;
        }

        if (this.created) {
          result["created"] = this.created.getTime();
        }

        if (this.nodeId) {
          result["nodeId"] = this.nodeId;
        }

        if (this.sshHost) {
          result["host"] = this.sshHost;
        }

        if (this.sshPort) {
          result["port"] = this.sshPort;
        }

        if (this.reverseSshPort) {
          result["reversePort"] = this.reverseSshPort;
        }

        if (this.startInstructionId) {
          result["startInstructionId"] = this.startInstructionId;
        }

        if (this.stopInstructionId) {
          result["stopInstructionId"] = this.stopInstructionId;
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
      key: "fromJsonEncoding",
      value: function fromJsonEncoding(json) {
        var args = [];

        if (json) {
          var obj = typeof json === "string" ? JSON.parse(json) : json;

          if (obj.created) {
            args.push(new Date(obj.created));
          } else {
            args.push(new Date());
          }

          args.push(obj.sessionId || "");
          args.push(obj.nodeId || null);
          args.push(obj.host || "");
          args.push(obj.port || null);
          args.push(obj.reversePort || null);
          args.push(obj.startInstructionId);
          args.push(obj.stopInstructionId);
        }

        return _construct(SshSession, args);
      }
    }]);

    return SshSession;
  }();

  /** The SolarSsh default path. */

  var SolarSshDefaultPath = "";
  /** The {@link UrlHelper} parameters key for the SolarSsh path. */

  var SolarSshPathKey = "solarSshPath";
  /** The SolarSsh REST API path. */

  var SolarSshApiPathV1 = "/api/v1";
  /** The SolarSsh WebSocket path for a terminal connection. */

  var SolarSshTerminalWebSocketPath = "/ssh";
  /** The sub-protocol to use for SolarSSH WebSocket connections. */

  var SolarSshTerminalWebSocketSubProtocol = "solarssh";
  /** An {@link UrlHelper} parameter key for a {@link SshSession} instance. */

  var SshSessionKey = "sshSession";
  /** The node instruction for initiating a SolarSSH connection. */

  var StartRemoteSshInstructionName = "StartRemoteSsh";
  /** The node instruction for closing a SolarSSH connection. */

  var StopRemoteSshInstructionName = "StopRemoteSsh";
  /**
   * UrlHelper that supports instructions and node metadata.
   */

  var InstructionUrlHelper =
  /*#__PURE__*/
  function (_NodeInstructionUrlHe) {
    _inherits(InstructionUrlHelper, _NodeInstructionUrlHe);

    function InstructionUrlHelper() {
      _classCallCheck(this, InstructionUrlHelper);

      return _possibleConstructorReturn(this, _getPrototypeOf(InstructionUrlHelper).apply(this, arguments));
    }

    return InstructionUrlHelper;
  }(solarnetworkApiCore.NodeInstructionUrlHelperMixin(solarnetworkApiCore.NodeMetadataUrlHelperMixin(solarnetworkApiCore.UserUrlHelperMixin(solarnetworkApiCore.NodeUrlHelperMixin(solarnetworkApiCore.UrlHelper)))));
  /**
   * Create a SshUrlHelperMixin class.
   *
   * @exports net
   * @param {UrlHelper} superclass the UrlHelper class to mix onto
   * @return {module:net~SshUrlHelperMixin} the mixin class
   */


  var SshUrlHelperMixin = function SshUrlHelperMixin(superclass) {
    return (
      /*#__PURE__*/

      /**
       * A mixin class that adds SolarSsh specific support to {@link UrlHelper}.
       *
       * @mixin
       * @alias module:net~SshUrlHelperMixin
       */
      function (_superclass) {
        _inherits(_class, _superclass);

        /**
         * Constructor.
         *
         * @param {*} args any number of arguments, but the first argument is assumed to be either an {@link Environment}
         *                 instance or a simple object that serves as the SolarSSH environment
         */
        function _class() {
          var _getPrototypeOf2;

          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _classCallCheck(this, _class);

          var env = args && args[0] ? args[0] instanceof solarnetworkApiCore.Environment ? args[0] : new solarnetworkApiCore.Environment(args[0]) : new solarnetworkApiCore.Environment({
            tls: true,
            host: "ssh.solarnetwork.net",
            port: 8443,
            solarSshPath: ""
          });

          if (!args) {
            args = [];
          }

          args[0] = env;
          _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_class)).call.apply(_getPrototypeOf2, [this].concat(_toConsumableArray(args))));
          _this._instructionUrlHelper = new InstructionUrlHelper();
          _this._instructionAuthBuilder = new solarnetworkApiCore.AuthorizationV2Builder(null, _this._instructionUrlHelper);
          return _this;
        }
        /**
         * A SSH session object.
         *
         * @type {SshSession}
         */


        _createClass(_class, [{
          key: "baseUrl",

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
          key: "terminalWebSocketUrl",
          value: function terminalWebSocketUrl(sessionId) {
            var path = this.env(SolarSshPathKey) || SolarSshDefaultPath;
            var sessId = sessionId || this.sshSessionId;
            return this.hostWebSocketUrl() + path + SolarSshTerminalWebSocketPath + "?sessionId=" + encodeURIComponent(sessId);
          }
          /**
           * Get the URL to the SolarSSH HTTP proxy to the configured SolarNode.
           *
           * @param {string} [sessionId] the {@link SshSession} ID to use; if not provided the {@link module:net~SshUrlHelperMixin#sshSessionId} value will be used
           * @returns {string} the HTTP proxy URL
           */

        }, {
          key: "httpProxyUrl",
          value: function httpProxyUrl(sessionId) {
            var path = this.env(SolarSshPathKey) || SolarSshDefaultPath;
            var sessId = sessionId || this.sshSessionId;
            return this.hostUrl() + path + "/nodeproxy/" + encodeURIComponent(sessId) + "/";
          }
          /**
           * Generate a URL for creating a new SolarSSH session.
           *
           * @param {number} [nodeId] the node ID to connect to; if not provided the <code>nodeId</code> property of this object will be used
           * @returns {string} the URL
           */

        }, {
          key: "createSshSessionUrl",
          value: function createSshSessionUrl(nodeId) {
            var node = nodeId || this.nodeId;
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

        }, {
          key: "createSshSessionAuthBuilder",
          value: function createSshSessionAuthBuilder(nodeId) {
            return this._instructionAuthBuilder.reset().snDate(true).method("GET").url(this._instructionUrlHelper.viewPendingInstructionsUrl(nodeId));
          }
          /**
           * Generate a URL for starting a SolarSSH session.
           *
           * @param {string} [sessionId] the {@link SshSession} ID to use; if not provided the {@link module:net~SshUrlHelperMixin#sshSessionId} value will be used
           * @returns {string} the URL
           */

        }, {
          key: "startSshSessionUrl",
          value: function startSshSessionUrl(sessionId) {
            var sessId = sessionId || this.sshSessionId;
            return this.baseUrl() + "/ssh/session/" + encodeURIComponent(sessId) + "/start";
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
          key: "startSshSessionAuthBuilder",
          value: function startSshSessionAuthBuilder(sshSession, nodeId) {
            var session = sshSession || this.sshSession || {};
            return this._instructionAuthBuilder.reset().snDate(true).method("POST").contentType("application/x-www-form-urlencoded").url(this._instructionUrlHelper.queueInstructionUrl(StartRemoteSshInstructionName, [{
              name: "host",
              value: session.sshHost
            }, {
              name: "user",
              value: session.sessionId
            }, {
              name: "port",
              value: session.sshPort
            }, {
              name: "rport",
              value: session.reverseSshPort
            }], nodeId));
          }
          /**
           * Generate a URL for stopping a SolarSSH session.
           *
           * @param {string} [sessionId] the {@link module:domain/sshSession~SshSession} ID to use; if not provided the {@link module:net~SshUrlHelperMixin#sshSessionId} value will be used
           * @returns {string} the URL
           */

        }, {
          key: "stopSshSessionUrl",
          value: function stopSshSessionUrl(sessionId) {
            var sessId = sessionId || this.sshSessionId;
            return this.baseUrl() + "/ssh/session/" + encodeURIComponent(sessId) + "/stop";
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
          key: "stopSshSessionAuthBuilder",
          value: function stopSshSessionAuthBuilder(sshSession, nodeId) {
            var session = sshSession || this.sshSession || {};
            var node = nodeId || this.nodeId;
            return this._instructionAuthBuilder.reset().snDate(true).method("POST").contentType("application/x-www-form-urlencoded").url(this._instructionUrlHelper.queueInstructionUrl(StopRemoteSshInstructionName, [{
              name: "host",
              value: session.sshHost
            }, {
              name: "user",
              value: session.sessionId
            }, {
              name: "port",
              value: session.sshPort
            }, {
              name: "rport",
              value: session.reverseSshPort
            }], node));
          }
          /**
           * Generate a URL for viewing the <code>StartRemoteSsh</code> instruction.
           *
           * @param {number} [instructionId] the instruction ID to view; if not provided the <code>startInstructionId</code> property of the session will be used
           * @returns {string} the URL
           */

        }, {
          key: "viewStartRemoteSshInstructionUrl",
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
          key: "viewStartRemoteSshInstructionAuthBuilder",
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
          key: "viewStopRemoteSshInstructionUrl",
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
          key: "viewStopRemoteSshInstructionAuthBuilder",
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
          key: "connectTerminalWebSocketAuthBuilder",
          value: function connectTerminalWebSocketAuthBuilder(nodeId) {
            var node = nodeId || this.nodeId;
            return this._instructionAuthBuilder.reset().snDate(true).method("GET").url(this._instructionUrlHelper.viewNodeMetadataUrl(node));
          }
        }, {
          key: "sshSession",
          get: function get() {
            return this.parameter(SshSessionKey);
          },
          set: function set(sshSession) {
            this.parameter(SshSessionKey, sshSession);
          }
          /**
           * Set the node ID.
           * @override
           * @inheritdoc
           */

        }, {
          key: "nodeId",
          set: function set(nodeId) {
            _set(_getPrototypeOf(_class.prototype), "nodeId", nodeId, this, true);

            this._instructionUrlHelper.nodeId = nodeId;
          }
          /**
           * Get the node ID.
           * @override
           * @inheritdoc
           */
          ,
          get: function get() {
            return _get(_getPrototypeOf(_class.prototype), "nodeId", this);
          }
          /**
           * Get the environment used for instruction URL pre-authorization values.
           *
           * @type {Environment}
           */

        }, {
          key: "nodeUrlHelperEnvironment",
          get: function get() {
            return this._instructionUrlHelper.environment;
          },
          set: function set(environment) {
            this._instructionUrlHelper.environment = environment;
            this._instructionAuthBuilder.environment = environment;
          }
          /**
           * Get the auth builder used for instruction URL pre-authorization values.
           *
           * @type {AuthorizationV2Builder}
           */

        }, {
          key: "nodeInstructionAuthBuilder",
          get: function get() {
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
          key: "sshSessionId",
          get: function get() {
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


  var SshUrlHelper =
  /*#__PURE__*/
  function (_SshUrlHelperMixin) {
    _inherits(SshUrlHelper, _SshUrlHelperMixin);

    function SshUrlHelper() {
      _classCallCheck(this, SshUrlHelper);

      return _possibleConstructorReturn(this, _getPrototypeOf(SshUrlHelper).apply(this, arguments));
    }

    return SshUrlHelper;
  }(SshUrlHelperMixin(solarnetworkApiCore.NodeUrlHelperMixin(solarnetworkApiCore.UrlHelper)));

  exports.AttachSshCommand = AttachSshCommand;
  exports.SolarSshApiPathV1 = SolarSshApiPathV1;
  exports.SolarSshDefaultPath = SolarSshDefaultPath;
  exports.SolarSshPathKey = SolarSshPathKey;
  exports.SolarSshTerminalWebSocketPath = SolarSshTerminalWebSocketPath;
  exports.SolarSshTerminalWebSocketSubProtocol = SolarSshTerminalWebSocketSubProtocol;
  exports.SshCloseCode = SshCloseCode;
  exports.SshCloseCodes = SshCloseCodes;
  exports.SshCommand = SshCommand;
  exports.SshSession = SshSession;
  exports.SshSessionKey = SshSessionKey;
  exports.SshTerminalSettings = SshTerminalSettings;
  exports.SshUrlHelper = SshUrlHelper;
  exports.SshUrlHelperMixin = SshUrlHelperMixin;
  exports.StartRemoteSshInstructionName = StartRemoteSshInstructionName;
  exports.StopRemoteSshInstructionName = StopRemoteSshInstructionName;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=solarnetwork-api-ssh.js.map
