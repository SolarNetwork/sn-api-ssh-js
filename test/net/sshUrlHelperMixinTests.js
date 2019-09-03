import test from "ava";

import SshSession from "domain/sshSession";
import { SshUrlHelper, SolarSshPathKey } from "net/sshUrlHelperMixin";

const TEST_TOKEN_ID = "test-token-id";
const TEST_TOKEN_SECRET = "test-token-secret";
const TEST_DATE = new Date("Tue, 25 Apr 2017 14:30:00 GMT");

test("ssh:net:sshUrlHelperMixin:create", t => {
  const helper = new SshUrlHelper();
  t.truthy(helper);
  t.truthy(helper.nodeInstructionAuthBuilder, "auth builder created");
});

test("ssh:net:sshUrlHelperMixin:baseUrl", t => {
  const helper = new SshUrlHelper();
  t.is(helper.baseUrl(), "https://ssh.solarnetwork.net:8443/api/v1");
});

test("ssh:net:sshUrlHelperMixin:baseUrl:customEnvironment", t => {
  const env = {};
  env[SolarSshPathKey] = "/foossh";
  env["host"] = "ssh.example.com";
  env["port"] = 443;
  const helper = new SshUrlHelper(env);
  t.is(helper.baseUrl(), "https://ssh.example.com/foossh/api/v1");
});

test("ssh:net:sshUrlHelperMixin:createSshSessionUrl:empty", t => {
  const helper = new SshUrlHelper();
  t.is(
    helper.createSshSessionUrl(),
    "https://ssh.solarnetwork.net:8443/api/v1/ssh/session/new?nodeId=null"
  );
});

test("ssh:net:sshUrlHelperMixin:createSshSessionUrl:arg", t => {
  const helper = new SshUrlHelper();
  t.is(
    helper.createSshSessionUrl(123),
    "https://ssh.solarnetwork.net:8443/api/v1/ssh/session/new?nodeId=123"
  );
});

test("ssh:net:sshUrlHelperMixin:createSshSessionUrl:prop", t => {
  const helper = new SshUrlHelper();
  helper.nodeId = 123;
  t.is(
    helper.createSshSessionUrl(),
    "https://ssh.solarnetwork.net:8443/api/v1/ssh/session/new?nodeId=123"
  );
});

test("ssh:net:sshUrlHelperMixin:createSshSessionUrl:argOverridesProp", t => {
  const helper = new SshUrlHelper();
  helper.nodeId = 123;
  t.is(
    helper.createSshSessionUrl(234),
    "https://ssh.solarnetwork.net:8443/api/v1/ssh/session/new?nodeId=234"
  );
});

test("ssh:net:sshUrlHelperMixin:createSshSessionAuthBuilder:arg", t => {
  const helper = new SshUrlHelper();
  helper.nodeInstructionAuthBuilder.tokenId = TEST_TOKEN_ID;
  t.is(
    helper
      .createSshSessionAuthBuilder(123)
      .date(TEST_DATE)
      .build(TEST_TOKEN_SECRET),
    "SNWS2 Credential=test-token-id,SignedHeaders=host;x-sn-date,Signature=6b69e6cdeafc8d810676f0fb18c33c32f7c804a44bd884cee911204992107727"
  );
});

test("ssh:net:sshUrlHelperMixin:createSshSessionAuthBuilder:prop", t => {
  const helper = new SshUrlHelper();
  helper.nodeId = 123;
  helper.nodeInstructionAuthBuilder.tokenId = TEST_TOKEN_ID;
  t.is(
    helper
      .createSshSessionAuthBuilder()
      .date(TEST_DATE)
      .build(TEST_TOKEN_SECRET),
    "SNWS2 Credential=test-token-id,SignedHeaders=host;x-sn-date,Signature=6b69e6cdeafc8d810676f0fb18c33c32f7c804a44bd884cee911204992107727"
  );
});

test("ssh:net:sshUrlHelperMixin:startSshSessionUrl:empty", t => {
  const helper = new SshUrlHelper();
  t.is(
    helper.startSshSessionUrl(),
    "https://ssh.solarnetwork.net:8443/api/v1/ssh/session/undefined/start"
  );
});

test("ssh:net:sshUrlHelperMixin:startSshSessionUrl:arg", t => {
  const helper = new SshUrlHelper();
  t.is(
    helper.startSshSessionUrl("abc"),
    "https://ssh.solarnetwork.net:8443/api/v1/ssh/session/abc/start"
  );
});

test("ssh:net:sshUrlHelperMixin:startSshSessionUrl:prop", t => {
  const helper = new SshUrlHelper();
  helper.sshSession = new SshSession(new Date(), "abc");
  t.is(
    helper.startSshSessionUrl(),
    "https://ssh.solarnetwork.net:8443/api/v1/ssh/session/abc/start"
  );
});

test("ssh:net:sshUrlHelperMixin:startSshSessionUrl:argOverridesProp", t => {
  const helper = new SshUrlHelper();
  helper.sshSession = new SshSession(new Date(), "abc");
  t.is(
    helper.startSshSessionUrl("def"),
    "https://ssh.solarnetwork.net:8443/api/v1/ssh/session/def/start"
  );
});

test("ssh:net:sshUrlHelperMixin:startSshSessionAuthBuilder:prop", t => {
  const helper = new SshUrlHelper();
  const session = new SshSession(
    new Date(),
    "abc",
    123,
    "localhost",
    8022,
    17776
  );
  helper.nodeId = 123;
  helper.nodeInstructionAuthBuilder.tokenId = TEST_TOKEN_ID;
  helper.sshSession = session;
  t.is(
    helper
      .startSshSessionAuthBuilder()
      .date(TEST_DATE)
      .build(TEST_TOKEN_SECRET),
    "SNWS2 Credential=test-token-id,SignedHeaders=content-type;host;x-sn-date,Signature=08fca2171f8d7a1374c7940a21613db272316404c78226e3b67ad84856d853e6"
  );
});

test("ssh:net:sshUrlHelperMixin:terminalWebSocketUrl:empty", t => {
  const helper = new SshUrlHelper();
  t.is(
    helper.terminalWebSocketUrl(),
    "wss://ssh.solarnetwork.net:8443/ssh?sessionId=undefined"
  );
});

test("ssh:net:sshUrlHelperMixin:terminalWebSocketUrl:arg", t => {
  const helper = new SshUrlHelper();
  t.is(
    helper.terminalWebSocketUrl("abc"),
    "wss://ssh.solarnetwork.net:8443/ssh?sessionId=abc"
  );
});

test("ssh:net:sshUrlHelperMixin:terminalWebSocketUrl:prop", t => {
  const helper = new SshUrlHelper();
  helper.sshSession = new SshSession(new Date(), "abc");
  t.is(
    helper.terminalWebSocketUrl(),
    "wss://ssh.solarnetwork.net:8443/ssh?sessionId=abc"
  );
});

test("ssh:net:sshUrlHelperMixin:terminalWebSocketUrl:argOverridesProp", t => {
  const helper = new SshUrlHelper();
  helper.sshSession = new SshSession(new Date(), "abc");
  t.is(
    helper.terminalWebSocketUrl("def"),
    "wss://ssh.solarnetwork.net:8443/ssh?sessionId=def"
  );
});

test("ssh:net:sshUrlHelperMixin:terminalWebSocketUrl:customEnvironment", t => {
  const env = {};
  env[SolarSshPathKey] = "/foossh";
  env["protocol"] = "http";
  env["host"] = "ssh.example.com";
  const helper = new SshUrlHelper(env);
  t.is(
    helper.terminalWebSocketUrl("abc"),
    "ws://ssh.example.com/foossh/ssh?sessionId=abc"
  );
});

test("ssh:net:sshUrlHelperMixin:connectTerminalWebSocketAuthBuilder:prop", t => {
  const helper = new SshUrlHelper();
  helper.nodeInstructionAuthBuilder.tokenId = TEST_TOKEN_ID;
  helper.nodeId = 123;
  t.is(
    helper
      .connectTerminalWebSocketAuthBuilder()
      .date(TEST_DATE)
      .build(TEST_TOKEN_SECRET),
    "SNWS2 Credential=test-token-id,SignedHeaders=host;x-sn-date,Signature=cbd28dd3456b84358a25ab2092969c9640b89399d8b7b8d8b069faa03fff8355"
  );
});

test("ssh:net:sshUrlHelperMixin:httpProxyUrl:empty", t => {
  const helper = new SshUrlHelper();
  t.is(
    helper.httpProxyUrl(),
    "https://ssh.solarnetwork.net:8443/nodeproxy/undefined/"
  );
});

test("ssh:net:sshUrlHelperMixin:httpProxyUrl:arg", t => {
  const helper = new SshUrlHelper();
  t.is(
    helper.httpProxyUrl("abc"),
    "https://ssh.solarnetwork.net:8443/nodeproxy/abc/"
  );
});

test("ssh:net:sshUrlHelperMixin:httpProxyUrl:prop", t => {
  const helper = new SshUrlHelper();
  helper.sshSession = new SshSession(new Date(), "abc");
  t.is(
    helper.httpProxyUrl(),
    "https://ssh.solarnetwork.net:8443/nodeproxy/abc/"
  );
});

test("ssh:net:sshUrlHelperMixin:httpProxyUrl:argOverridesProp", t => {
  const helper = new SshUrlHelper();
  helper.sshSession = new SshSession(new Date(), "abc");
  t.is(
    helper.httpProxyUrl("def"),
    "https://ssh.solarnetwork.net:8443/nodeproxy/def/"
  );
});

test("ssh:net:sshUrlHelperMixin:stopSshSessionUrl:empty", t => {
  const helper = new SshUrlHelper();
  t.is(
    helper.stopSshSessionUrl(),
    "https://ssh.solarnetwork.net:8443/api/v1/ssh/session/undefined/stop"
  );
});

test("ssh:net:sshUrlHelperMixin:stopSshSessionUrl:arg", t => {
  const helper = new SshUrlHelper();
  t.is(
    helper.stopSshSessionUrl("abc"),
    "https://ssh.solarnetwork.net:8443/api/v1/ssh/session/abc/stop"
  );
});

test("ssh:net:sshUrlHelperMixin:stopSshSessionUrl:prop", t => {
  const helper = new SshUrlHelper();
  helper.sshSession = new SshSession(new Date(), "abc");
  t.is(
    helper.stopSshSessionUrl(),
    "https://ssh.solarnetwork.net:8443/api/v1/ssh/session/abc/stop"
  );
});

test("ssh:net:sshUrlHelperMixin:stopSshSessionUrl:argOverridesProp", t => {
  const helper = new SshUrlHelper();
  helper.sshSession = new SshSession(new Date(), "abc");
  t.is(
    helper.stopSshSessionUrl("def"),
    "https://ssh.solarnetwork.net:8443/api/v1/ssh/session/def/stop"
  );
});

test("ssh:net:sshUrlHelperMixin:stopSshSessionAuthBuilder:prop", t => {
  const helper = new SshUrlHelper();
  const session = new SshSession(
    new Date(),
    "abc",
    123,
    "localhost",
    8022,
    17776
  );
  helper.nodeId = 123;
  helper.nodeInstructionAuthBuilder.tokenId = TEST_TOKEN_ID;
  helper.sshSession = session;
  t.is(
    helper
      .stopSshSessionAuthBuilder()
      .date(TEST_DATE)
      .build(TEST_TOKEN_SECRET),
    "SNWS2 Credential=test-token-id,SignedHeaders=content-type;host;x-sn-date,Signature=b93b36d0567acb2758379d206dc33346bb593cb6458d2ca32f1dd9dcd8325ee4"
  );
});

test("ssh:net:sshUrlHelperMixin:viewStartRemoteSshInstructionUrl:prop", t => {
  const helper = new SshUrlHelper();
  const session = new SshSession(
    new Date(),
    "abc",
    123,
    "localhost",
    8022,
    17776,
    321
  );
  helper.sshSession = session;
  t.is(
    helper.viewStartRemoteSshInstructionUrl(),
    "https://data.solarnetwork.net/solaruser/api/v1/sec/instr/view?id=321"
  );
});

test("ssh:net:sshUrlHelperMixin:viewStartRemoteSshInstructionAuthBuilder:prop", t => {
  const helper = new SshUrlHelper();
  const session = new SshSession(
    new Date(),
    "abc",
    123,
    "localhost",
    8022,
    17776,
    321
  );
  helper.nodeInstructionAuthBuilder.tokenId = TEST_TOKEN_ID;
  helper.sshSession = session;
  t.is(
    helper
      .viewStartRemoteSshInstructionAuthBuilder()
      .date(TEST_DATE)
      .build(TEST_TOKEN_SECRET),
    "SNWS2 Credential=test-token-id,SignedHeaders=host;x-sn-date,Signature=eacbb0b026a6add7d7f9529bbb6fff3e9866d2d4e0d68f55ab6888919dd46e88"
  );
});

test("ssh:net:sshUrlHelperMixin:viewStopRemoteSshInstructionUrl:prop", t => {
  const helper = new SshUrlHelper();
  const session = new SshSession(
    new Date(),
    "abc",
    123,
    "localhost",
    8022,
    17776,
    321,
    456
  );
  helper.sshSession = session;
  t.is(
    helper.viewStopRemoteSshInstructionUrl(),
    "https://data.solarnetwork.net/solaruser/api/v1/sec/instr/view?id=456"
  );
});

test("ssh:net:sshUrlHelperMixin:viewStartRemoteSshInstructionAuthBuilder:propWithStopId", t => {
  const helper = new SshUrlHelper();
  const session = new SshSession(
    new Date(),
    "abc",
    123,
    "localhost",
    8022,
    17776,
    321,
    456
  );
  helper.nodeInstructionAuthBuilder.tokenId = TEST_TOKEN_ID;
  helper.sshSession = session;
  t.is(
    helper
      .viewStopRemoteSshInstructionAuthBuilder()
      .date(TEST_DATE)
      .build(TEST_TOKEN_SECRET),
    "SNWS2 Credential=test-token-id,SignedHeaders=host;x-sn-date,Signature=80eed7a83d9de5f5c6aeb5b6a9e0e0a3e654f25f9e542ba7a60c060c2d599462"
  );
});
