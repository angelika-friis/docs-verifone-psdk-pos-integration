# Initiering

**Målgrupp:** utvecklare av integrationslagret.

Publik startordning finns i [Snabbstart](../quick-start.md). Den här sidan
beskriver vad implementationen gör.

## ApiModule.initialize

`initialize(context)` är idempotent. Vid fysisk terminal initieras
`RuntimeProvider` med `applicationContext`. Vid emulerad terminal hoppar modulen
över fysisk runtime.

## ApiModule.start

`start(scope)` är idempotent och startar integrationen asynkront.

Vid emulerad terminal:

- `MockTerminalApi` skapas.
- `startTerminal(...)` körs i angiven scope.

Vid fysisk terminal:

- `TerminalApiFactory` bygger objektgrafen.
- `TerminalApiImpl.startTerminal(config)` körs i angiven scope.
- `TerminalConnectionManager` får startresultatet som anslutningsstatus.
- Epson-skrivaren initieras.

## TerminalApiImpl.startTerminal

Startsekvensen är:

1. spara `TerminalConnectionConfig` i `TerminalConnectionManager`
2. `SdkRuntime.initialize(config)`
3. `SdkRuntime.awaitInitialized()`
4. `SdkRuntime.login()`
5. `SdkRuntime.emitDeviceInformation()`

Konsumenter ska inte anropa den här metoden direkt; se
[TerminalApi](../api/terminal-api.md).
