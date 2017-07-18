import test from 'ava';

import SshSession from 'domain/sshSession';

test('ssh:domain:sshSession:create', t => {
    const now = new Date();
	const obj = new SshSession(now, 'foo', 1, 'host', 2, 3, 4, 5);
    t.truthy(obj);
    t.is(obj.created, now);
    t.is(obj.sessionId, 'foo');
    t.is(obj.nodeId, 1);
    t.is(obj.sshHost, 'host');
    t.is(obj.sshPort, 2);
    t.is(obj.reverseSshPort, 3);
    t.is(obj.startInstructionId, 4);
    t.is(obj.stopInstructionId, 5);
});
