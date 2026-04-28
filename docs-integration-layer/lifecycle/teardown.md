# Nedstängning

**Målgrupp:** utvecklare av integrationslagret.

Den publika metoden finns i [TerminalApi](../api/terminal-api.md). Den här sidan
beskriver implementationens ansvar.

## TerminalApiImpl.teardownTerminal

Sekvens:

1. `SdkRuntime.logout()`
2. `SdkRuntime.teardown()`
3. `TerminalConnectionManager.setConnected(false)`
4. returnera `true` om båda SDK-stegen lyckades

Vid exception loggas felet och metoden returnerar `false`.

## Begränsning

`ApiModule` har inget publikt reset-API som gör att hela integrationen kan
konfigureras om i samma process. Konfigurationsregler för konsumenter finns i
[Konfiguration](../configuration.md).
