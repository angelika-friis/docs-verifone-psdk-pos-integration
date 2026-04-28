# Intern översikt

Den här sidan beskriver implementationen bakom `TerminalApi`. Klasserna är
interna och ska inte användas direkt av applikationslagret.

## ApiModule

`ApiModule` är processens integrationsägare. Den håller:

- om mock/emulerad terminal ska användas
- vald `TerminalConnectionConfig`
- application context
- aktuell `TerminalApi`
- aktuell `TerminalConnectionManager`

`ApiModule.start(scope)` skapar antingen `MockTerminalApi` eller en fysisk
integration via `TerminalApiFactory`.

## TerminalApiFactory

Factoryn bygger objektgrafen för fysisk terminal:

- `RuntimeProvider.get()`
- `SharedFlowLogSink`
- `TerminalConnectionManager`
- `PaymentSdkRepository`
- `PaymentSessionCoordinator`
- `PaymentService`
- `EpsonPrinterConnection`
- `EpsonPrinterService`
- `VerifonePrintService`
- `ScannerService`
- `TerminalApiImpl`

Syftet är att samla wiring på ett ställe så att `TerminalApiImpl` kan få färdiga
beroenden.

## TerminalApiImpl

`TerminalApiImpl` implementerar `TerminalApi` och delegerar till specialiserade
tjänster:

- betalningar till `PaymentService`
- scanner till `ScannerService`
- Verifone-utskrift till `VerifonePrintService`
- Epson-utskrift till `EpsonPrinterService`
- runtime/livscykel till `SdkRuntime`
- anslutningsstatus till `TerminalConnectionManager`

Den publicerar också scannerresultat via ett internt `MutableSharedFlow`.

## SdkRuntime

`SdkRuntime` är wrappern runt `PaymentSdk`. Den:

- skapar PSDK-instansen
- registrerar `CommerceListenerAdapter`
- initierar SDK beroende på `TerminalConnectionConfig`
- väntar på initieringsresultat
- loggar in och ut
- kör teardown
- publicerar SDK-events som `Flow`
- bygger `DeviceInfo`

Viktiga flöden:

- `initResult`
- `observedTransactionManagerState`
- `transactionEvents`
- `paymentCompleted`
- `communicationStatus`
- `notificationEvents`
- `cardInformationReceived`
- `shouldReconnect`

## TerminalConnectionManager

`TerminalConnectionManager` äger anslutningsstatus och reconnect. Den kombinerar
runtime-initiering, login-status och anslutning till `terminalReady`.

Den reagerar på tappad anslutning genom att köra teardown, initiera om med
senaste konfigurationen och logga in igen.

## PaymentSdkRepository

Repositoryt är adaptern mot PSDK:s `TransactionManager`. Det innehåller de
SDK-nära operationerna:

- `startSession(...)`
- `endSession(...)`
- `processSale(...)`
- `processSingleSplitPart(...)`
- `acquireCard(...)`
- `refundUnlinked(...)`
- `voidPayment(...)`
- `abortPayment()`

Repositoryt returnerar interna resultattyper som sedan mappas till publika
`PaymentResult` och `PaymentError`.

## PaymentService

`PaymentService` är betalningslagrets publika interna fasad. Den:

- skyddar mot parallella betalningar
- använder `PaymentSessionCoordinator`
- mapper interna fel till `PaymentError`
- markerar terminalen som frånkopplad vid relevanta fel

## PaymentSessionCoordinator

Koordinatorn samlar mönstret:

1. starta session
2. kör operation
3. avsluta session om `autoClose` är `true`

Det minskar risken för att en betalningsoperation glömmer stänga sessionen.

## Printer och scanner

`VerifonePrintService` använder PSDK:s `TransactionManager.print(...)`.

`EpsonPrinterService` använder `EpsonPrinterConnection` och Epson ePOS SDK för
blockbaserad utskrift.

`ScannerService` använder PSDK:s scanner-API och översätter scanner-callbacks
till kodsträngar som `TerminalApiImpl` publicerar i `scannedCode`.
