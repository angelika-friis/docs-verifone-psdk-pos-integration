# Anslutning och återanslutning

**Målgrupp:** utvecklare av integrationslagret.

Publik statussemantik finns i [Status och flöden](../api/state-and-flows.md).
Den här sidan beskriver intern reconnect-logik.

## terminalReady

`TerminalConnectionManager` beräknar `terminalReady` genom att kombinera:

- lyckad SDK-initiering
- `TransactionManagerState.LOGGED_IN`
- `terminalConnected`

## Signaler som påverkar anslutning

Manager-klassen lyssnar på:

- `paymentCompleted`
- `communicationStatus`
- `notificationEvents`
- `shouldReconnect`

Vid tappad anslutning sätts intern anslutningsstatus till `false`.

## Reconnect

Reconnect körs med `Mutex` så att bara ett reconnect-flöde kör samtidigt.

Sekvens:

1. teardown av runtime
2. initiering med senast sparade `TerminalConnectionConfig`
3. väntan på initieringsresultat
4. login
5. publicering av device-information
6. anslutningsstatus sätts till `true`

## Utvecklarregel

Ny reconnect-logik ska läggas här eller i `SdkRuntime` beroende på om den handlar
om anslutningspolicy eller SDK-event. Den ska inte läggas i UI, ViewModels eller
funktionsspecifika payment-metoder.
