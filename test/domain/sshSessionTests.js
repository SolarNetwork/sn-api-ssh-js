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

test('ssh:domain:sshSession:fromJsonEncoding', t => {
    const now = new Date();
    const obj = SshSession.fromJsonEncoding(
        '{"sessionId":"foo","created":' +now.getTime()
        +',"nodeId":1,"host":"host","port":2,"reversePort":3'
        +',"startInstructionId":4,"stopInstructionId":5}');
    t.truthy(obj);
    t.is(obj.created.getTime(), now.getTime());
    t.is(obj.sessionId, 'foo');
    t.is(obj.nodeId, 1);
    t.is(obj.sshHost, 'host');
    t.is(obj.sshPort, 2);
    t.is(obj.reverseSshPort, 3);
    t.is(obj.startInstructionId, 4);
    t.is(obj.stopInstructionId, 5);
});

test('ssh:domain:sshSession:toJsonEncoding', t => {
    const now = new Date();
	const obj = new SshSession(now, 'foo', 1, 'host', 2, 3, 4, 5);
    const json = obj.toJsonEncoding();
    t.is(json, '{"sessionId":"foo","created":' +now.getTime()
        +',"nodeId":1,"host":"host","port":2,"reversePort":3'
        +',"startInstructionId":4,"stopInstructionId":5}');
});
