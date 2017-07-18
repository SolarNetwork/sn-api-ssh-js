/** @module domain */

import { stringMapToObject, objectToStringMap } from 'solarnetwork-api-core';

/**
 * Settings for a SSH terminal.
 */
class SshTerminalSettings {

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
    constructor(cols, lines, width, height, type, environment) {
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
    toJsonEncoding() {
        const result = {};
        if ( this.type ) {
            result['term'] = this.type;
        }
        if ( this.cols ) {
            result['cols'] = this.cols;
        }
        if ( this.lines ) {
            result['lines'] = this.lines;
        }
        if ( this.width ) {
            result['width'] = this.width;
        }
        if ( this.height ) {
            result['height'] = this.height;
        }
        if ( this.environment instanceof Map && this.environment.size > 0 ) {
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
    static fromJsonEncoding(json) {
        const result = new SshTerminalSettings();
        if ( json ) {
            const obj = JSON.parse(json);
            if ( obj['term'] ) {
                result.type = obj['term'];
            }
            if ( obj['cols'] ) {
                result.cols = obj['cols'];
            }
            if ( obj['lines'] ) {
                result.lines = obj['lines'];
            }
            if ( obj['width'] ) {
                result.width = obj['width'];
            }
            if ( obj['height'] ) {
                result.height = obj['height'];
            }
            if ( obj['environment'] ) {
                result.environment = objectToStringMap(obj['environment']);
            }
        }
        return result;
    }

}

export default SshTerminalSettings;
