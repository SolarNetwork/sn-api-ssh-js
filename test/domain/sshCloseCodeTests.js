import test from 'ava';

import {default as SshCloseCodes, SshCloseCode } from 'domain/sshCloseCode';

test('core:aggregation:create', t => {
	const obj = new SshCloseCode('foo', 1);
    t.truthy(obj);
    t.is(obj.name, 'foo');
    t.is(obj.value, 1);
});

test('core:aggregation:compare:lt', t => {
	const left = new SshCloseCode('foo', 1);
	const right = new SshCloseCode('bar', 2);
    t.is(left.compareTo(right), -1);
});

test('core:aggregation:compare:lt', t => {
	const left = new SshCloseCode('foo', 2);
	const right = new SshCloseCode('bar', 1);
    t.is(left.compareTo(right), 1);
});

test('core:aggregation:compare:eq', t => {
	const left = new SshCloseCode('foo', 1);
	const right = new SshCloseCode('bar', 1);
    t.is(left.compareTo(right), 0);
});

test('core:aggregation:aggregations', t => {
	t.is(SshCloseCodes.AUTHENTICATION_FAILURE.name, 'AUTHENTICATION_FAILURE');
});
