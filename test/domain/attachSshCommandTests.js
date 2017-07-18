import test from 'ava';

import AttachSshCommand from 'domain/attachSshCommand';
import SshTerminalSettings from 'domain/sshTerminalSettings';

test('ssh:domain:attachSshCommand:create', t => {
    const now = new Date();
    const termOpts = new SshTerminalSettings(100, 48);
	const obj = new AttachSshCommand('foo', now, 'user', 'pass', termOpts);
    t.truthy(obj);
    t.is(obj.command, 'attach-ssh');
    t.deepEqual(obj.data, {
        authorization: 'foo',
        'authorization-date': now.getTime(),
        username: 'user',
        password: 'pass',
        cols: termOpts.cols,
        lines: termOpts.lines,
        term: termOpts.type,
        width: termOpts.width,
        height: termOpts.height,
    });
});
