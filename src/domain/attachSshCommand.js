import SshCommand from './sshCommand';
import SshTerminalSettings from './sshTerminalSettings';

/** The command for attaching to a SSH terminal shell. */
export const SolarSshCommandAttachSsh = 'attach-ssh';

/**
 * SSH command for attaching to a SSH terminal shell.
 */
class AttachSshCommand extends SshCommand {
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
    constructor(authorization, authorizationDate, username, password, terminalSettings) {
        const data = {};
        data['authorization'] = authorization;
        data['authorization-date'] = (authorizationDate instanceof Date ? authorizationDate.getTime() : authorizationDate);
        data['username'] = username;
        data['password'] = password;
        if ( terminalSettings instanceof SshTerminalSettings ) {
            const termOpts = JSON.parse(terminalSettings.toJsonEncoding());
            for ( const prop of Object.keys(termOpts) ) {
                if ( data[prop] === undefined ) {
                    data[prop] = termOpts[prop];
                }
            }
        }
        super(SolarSshCommandAttachSsh, data);
    }
}

export default AttachSshCommand;
