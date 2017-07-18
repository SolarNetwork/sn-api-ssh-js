import test from 'ava';

import { UrlHelper, NodeUrlHelperMixin } from 'solarnetwork-api-core';
import SshSession from 'domain/sshSession';
import { default as SshUrlHelperMixin, 
    SolarSshPathKey } from 'net/sshUrlHelperMixin';

class SshUrlHelper extends SshUrlHelperMixin(NodeUrlHelperMixin(UrlHelper)) {

}

test('ssh:net:sshUrlHelperMixin:create', t => {
	const helper = new SshUrlHelper();
	t.truthy(helper);
});

test('ssh:net:sshUrlHelperMixin:baseUrl', t => {
	const helper = new SshUrlHelper();
	t.is(helper.baseUrl(), 'https://ssh.solarnetwork.net:8443/api/v1');
});

test('ssh:net:sshUrlHelperMixin:baseUrl:customEnvironment', t => {
    const env = {};
    env[SolarSshPathKey] = '/foossh';
    env['host'] = 'ssh.example.com';
    env['port'] = 443;
	const helper = new SshUrlHelper(env);
	t.is(helper.baseUrl(), 'https://ssh.example.com/foossh/api/v1');
});

test('ssh:net:sshUrlHelperMixin:createSshSessionUrl:empty', t => {
	const helper = new SshUrlHelper();
	t.is(helper.createSshSessionUrl(), 
		'https://ssh.solarnetwork.net:8443/api/v1/ssh/session/new?nodeId=null');
});

test('ssh:net:sshUrlHelperMixin:createSshSessionUrl:arg', t => {
	const helper = new SshUrlHelper();
	t.is(helper.createSshSessionUrl(123), 
		'https://ssh.solarnetwork.net:8443/api/v1/ssh/session/new?nodeId=123');
});

test('ssh:net:sshUrlHelperMixin:createSshSessionUrl:prop', t => {
	const helper = new SshUrlHelper();
	helper.nodeId = 123;
	t.is(helper.createSshSessionUrl(), 
		'https://ssh.solarnetwork.net:8443/api/v1/ssh/session/new?nodeId=123');
});

test('ssh:net:sshUrlHelperMixin:createSshSessionUrl:argOverridesProp', t => {
	const helper = new SshUrlHelper();
	helper.nodeId = 123;
	t.is(helper.createSshSessionUrl(234), 
		'https://ssh.solarnetwork.net:8443/api/v1/ssh/session/new?nodeId=234');
});

test('ssh:net:sshUrlHelperMixin:startSshSessionUrl:empty', t => {
	const helper = new SshUrlHelper();
	t.is(helper.startSshSessionUrl(), 
		'https://ssh.solarnetwork.net:8443/api/v1/ssh/session/undefined/start');
});

test('ssh:net:sshUrlHelperMixin:startSshSessionUrl:arg', t => {
	const helper = new SshUrlHelper();
	t.is(helper.startSshSessionUrl('abc'), 
		'https://ssh.solarnetwork.net:8443/api/v1/ssh/session/abc/start');
});

test('ssh:net:sshUrlHelperMixin:startSshSessionUrl:prop', t => {
	const helper = new SshUrlHelper();
	helper.sshSession = new SshSession(new Date(), 'abc');
	t.is(helper.startSshSessionUrl(), 
		'https://ssh.solarnetwork.net:8443/api/v1/ssh/session/abc/start');
});

test('ssh:net:sshUrlHelperMixin:startSshSessionUrl:argOverridesProp', t => {
	const helper = new SshUrlHelper();
	helper.sshSession = new SshSession(new Date(), 'abc');
	t.is(helper.startSshSessionUrl('def'), 
		'https://ssh.solarnetwork.net:8443/api/v1/ssh/session/def/start');
});

test('ssh:net:sshUrlHelperMixin:terminalWebSocketUrl', t => {
	const helper = new SshUrlHelper();
	t.is(helper.terminalWebSocketUrl(), 'wss://ssh.solarnetwork.net:8443/ssh');
});

test('ssh:net:sshUrlHelperMixin:terminalWebSocketUrl:customEnvironment', t => {
    const env = {};
	env[SolarSshPathKey] = '/foossh';
	env['protocol'] = 'http';
    env['host'] = 'ssh.example.com';
	const helper = new SshUrlHelper(env);
	t.is(helper.terminalWebSocketUrl(), 'ws://ssh.example.com/foossh/ssh');
});

test('ssh:net:sshUrlHelperMixin:httpProxyUrl:empty', t => {
	const helper = new SshUrlHelper();
	t.is(helper.httpProxyUrl(), 
		'https://ssh.solarnetwork.net:8443/nodeproxy/undefined/');
});

test('ssh:net:sshUrlHelperMixin:httpProxyUrl:arg', t => {
	const helper = new SshUrlHelper();
	t.is(helper.httpProxyUrl('abc'), 
		'https://ssh.solarnetwork.net:8443/nodeproxy/abc/');
});

test('ssh:net:sshUrlHelperMixin:httpProxyUrl:prop', t => {
	const helper = new SshUrlHelper();
	helper.sshSession = new SshSession(new Date(), 'abc');
	t.is(helper.httpProxyUrl(), 
		'https://ssh.solarnetwork.net:8443/nodeproxy/abc/');
});

test('ssh:net:sshUrlHelperMixin:httpProxyUrl:argOverridesProp', t => {
	const helper = new SshUrlHelper();
	helper.sshSession = new SshSession(new Date(), 'abc');
	t.is(helper.httpProxyUrl('def'), 
		'https://ssh.solarnetwork.net:8443/nodeproxy/def/');
});

test('ssh:net:sshUrlHelperMixin:stopSshSessionUrl:empty', t => {
	const helper = new SshUrlHelper();
	t.is(helper.stopSshSessionUrl(), 
		'https://ssh.solarnetwork.net:8443/api/v1/ssh/session/undefined/stop');
});

test('ssh:net:sshUrlHelperMixin:stopSshSessionUrl:arg', t => {
	const helper = new SshUrlHelper();
	t.is(helper.stopSshSessionUrl('abc'), 
		'https://ssh.solarnetwork.net:8443/api/v1/ssh/session/abc/stop');
});

test('ssh:net:sshUrlHelperMixin:stopSshSessionUrl:prop', t => {
	const helper = new SshUrlHelper();
	helper.sshSession = new SshSession(new Date(), 'abc');
	t.is(helper.stopSshSessionUrl(), 
		'https://ssh.solarnetwork.net:8443/api/v1/ssh/session/abc/stop');
});

test('ssh:net:sshUrlHelperMixin:stopSshSessionUrl:argOverridesProp', t => {
	const helper = new SshUrlHelper();
	helper.sshSession = new SshSession(new Date(), 'abc');
	t.is(helper.stopSshSessionUrl('def'), 
		'https://ssh.solarnetwork.net:8443/api/v1/ssh/session/def/stop');
});
