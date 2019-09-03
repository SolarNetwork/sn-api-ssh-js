/**
 * A command with data.
 */
class SshCommand {
  /**
   * Constructor.
   *
   * @param {string} command the command
   * @param {*} [data] optional data to associate with the command
   */
  constructor(command, data) {
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
  toJsonEncoding() {
    const result = {};
    if (this.command) {
      result["cmd"] = this.command;
    }
    const data = this.data;
    if (data && data.toJsonEncoding) {
      const dataJson = data.toJsonEncoding();
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
  static fromJsonEncoding(json, dataParser) {
    let command, data;
    if (json) {
      const obj = JSON.parse(json);
      command = obj["cmd"];
      data = obj["data"];
      if (data && dataParser) {
        data = dataParser(JSON.stringify(data));
      }
    }
    return new SshCommand(command, data);
  }
}

export default SshCommand;
