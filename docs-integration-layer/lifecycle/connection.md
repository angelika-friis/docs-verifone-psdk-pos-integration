# Anslutning och återanslutning

Terminalanslutningen hanteras av `TerminalConnectionManager`. Den har två
publika statusflöden via `TerminalApi`:

- `terminalConnected`
- `terminalReady`

## Startsekvens

Vid fysisk terminal kör `TerminalApiImpl.startTerminal(config)` följande:

1. loggar att SDK initieras
2. sparar anslutningskonfigurationen i `TerminalConnectionManager`
3. anropar `runtime.initialize(config)`
4. väntar på `runtime.awaitInitialized()`
5. loggar in med `runtime.login()`
6. publicerar device-information
7. returnerar `TerminalInitResult.Success` eller `Failure`

Efter start sätter `ApiModule` `terminalConnected` baserat på om resultatet var
`Success`.

## terminalReady

`terminalReady` blir `true` när alla villkor är uppfyllda:

- SDK-initiering har lyckats.
- PSDK:s `TransactionManager` är `LOGGED_IN`.
- `terminalConnected` är `true`.

Det gör `terminalReady` striktare än `terminalConnected`.

## Återanslutning

`TerminalConnectionManager` lyssnar på SDK-signaler som indikerar tappad
anslutning:

- `CommunicationStatus.DEVICE_CONNECTION_LOST`
- `StatusCode.DEVICE_CONNECTION_LOST` från payment completed events
- `StatusCode.DEVICE_CONNECTION_LOST` från notification events
- initieringsstatusar där runtime signalerar `shouldReconnect`

När anslutningen tappas:

1. `terminalConnected` sätts till `false`.
2. en reconnect-job schemaläggs om ingen redan körs.
3. SDK teardown körs.
4. SDK initieras igen med senaste `TerminalConnectionConfig`.
5. integrationen väntar på lyckad initiering.
6. runtime loggar in igen.
7. device-information publiceras.
8. `terminalConnected` sätts till `true`.

Reconnect skyddas av en `Mutex` för att inte flera återanslutningar ska köras
samtidigt.

## Applikationslagrets ansvar

Applikationslagret ska:

- visa terminalstatus från `terminalConnected` och `terminalReady`
- blockera nya terminalflöden när `terminalReady` är `false`
- låta integrationslagret hantera reconnect

Applikationslagret ska inte:

- skapa egna reconnect-loopar mot PSDK
- anropa `startTerminal(...)` igen från UI
- skapa nya SDK-instanser vid tappad anslutning
