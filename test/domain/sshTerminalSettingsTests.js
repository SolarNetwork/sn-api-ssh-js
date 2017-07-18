import test from 'ava';

import SshTerminalSettings from 'domain/sshTerminalSettings';

test('ssh:domain:sshTerminalSettings:create', t => {
    const env = new Map();
	const obj = new SshTerminalSettings(1, 2, 3, 4, 'foo', env);
    t.truthy(obj);
    t.is(obj.cols, 1);
    t.is(obj.lines, 2);
    t.is(obj.width, 3);
    t.is(obj.height, 4);
    t.is(obj.type, 'foo');
    t.is(obj.environment, env);
});

test('ssh:domain:sshTerminalSettings:fromJsonEncoding', t => {
    const obj = SshTerminalSettings.fromJsonEncoding(
        '{"term":"foo","cols":1,"lines":2,"width":3,"height":4'
        +',"environment":{"bim":"bam"}}');
    t.truthy(obj);
    t.is(obj.cols, 1);
    t.is(obj.lines, 2);
    t.is(obj.width, 3);
    t.is(obj.height, 4);
    t.is(obj.type, 'foo');
    t.deepEqual(obj.environment, new Map([['bim', 'bam']]));
});

test('ssh:domain:sshTerminalSettings:toJsonEncoding', t => {
    const env = new Map([['bim', 'bam']]);
	const obj = new SshTerminalSettings(1, 2, 3, 4, 'foo', env);
    const json = obj.toJsonEncoding();
    t.is(json, '{"term":"foo","cols":1,"lines":2,"width":3,"height":4'
        +',"environment":{"bim":"bam"}}');
});
