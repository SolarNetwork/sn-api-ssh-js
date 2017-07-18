import test from 'ava';

import SshCommand from 'domain/sshCommand';

test('ssh:domain:sshCommand:create', t => {
	const obj = new SshCommand('foo', {a:1});
    t.truthy(obj);
    t.is(obj.command, 'foo');
    t.deepEqual(obj.data, {a:1});
});

test('ssh:domain:sshCommand:fromJsonEncoding', t => {
    const obj = SshCommand.fromJsonEncoding(
        '{"cmd":"foo","data":{"bim":"bam"}}');
    t.truthy(obj);
    t.is(obj.command, 'foo');
    t.deepEqual(obj.data, {bim:'bam'});
});

test('ssh:domain:sshCommand:fromJsonEncoding:parseFn', t => {
    const obj = SshCommand.fromJsonEncoding(
        '{"cmd":"foo","data":{"bim":"bam"}}', json => {
            const inv = {};
            const obj = JSON.parse(json);
            for ( const k of Object.keys(obj) ) {
                inv[obj[k]] = k;
            }
            return inv;
        });
    t.truthy(obj);
    t.is(obj.command, 'foo');
    t.deepEqual(obj.data, {bam:'bim'});
});

test('ssh:domain:sshCommand:toJsonEncoding', t => {
	const obj = new SshCommand('foo', {bim:'bam'});
    const json = obj.toJsonEncoding();
    t.is(json, '{"cmd":"foo","data":{"bim":"bam"}}');
});

class Foo {
    constructor(bim) {
        this.bim = bim;
    }

    toJsonEncoding() {
        const res = {};
        res[this.bim] = 'bim';
        return JSON.stringify(res);
    }
}

test('ssh:domain:sshCommand:toJsonEncoding:encodingFn', t => {
	const obj = new SshCommand('foo', new Foo('bam'));
    const json = obj.toJsonEncoding();
    t.is(json, '{"cmd":"foo","data":{"bam":"bim"}}');
});
