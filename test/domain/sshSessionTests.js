import test from 'ava';

import SshSession from 'domain/sshSession';

test('ssh:domain:sshSession:create', t => {
	const obj = new SshSession('foo');
    t.truthy(obj);
    t.is(obj.sessionId, 'foo');
});
