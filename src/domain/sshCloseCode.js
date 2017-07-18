/** @module domain */

import { ComparableEnum } from 'solarnetwork-api-core';

/**
 * A named socket close code.
 */
class SshCloseCode extends ComparableEnum {

    /**
     * Constructor.
     * 
     * @param {string} name the name
     * @param {value} value the value
     */
    constructor(name, value) {
        super(name, value);
        if ( this.constructor === SshCloseCode ) {
            Object.freeze(this);
        }
    }

    /**
	 * Get the {@link SshCloseCodes} values.
	 * 
	 * @inheritdoc
	 */
	static enumValues() {
		return SshCloseCodeValues;
	}

}

const SshCloseCodeValues = Object.freeze([
	new SshCloseCode('AUTHENTICATION_FAILURE', 4000),
]);

/**
 * The enumeration of supported SshCloseCode values.
 * 
 * @readonly
 * @enum {SshCloseCode}
 * @property {SshCloseCode} AUTHENTICATION_FAILURE an authentication failure
 */
const SshCloseCodes = SshCloseCode.enumsValue(SshCloseCodeValues);

export default SshCloseCodes;
export { SshCloseCode };