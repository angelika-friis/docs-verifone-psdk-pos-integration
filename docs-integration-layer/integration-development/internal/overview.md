# Intern översikt

**Målgrupp:** utvecklare av integrationslagret.

Den här sidan beskriver interna klasser. Publikt kontrakt finns i
[TerminalApi](../api/terminal-api.md).

## ApiModule

Äger processens integrationsinstans och väljer mellan `MockTerminalApi` och
fysisk `TerminalApiImpl`. Startordningen beskrivs i
[Initiering](../lifecycle/initialization.md).

## TerminalApiFactory

Bygger beroenden för fysisk terminal:

- runtime
- connection manager
- betalningsrepository och services
- Verifone- och Epson-skrivartjänster
- scanner
- `TerminalApiImpl`

## TerminalApiImpl

Implementerar `TerminalApi` och delegerar till domänspecifika tjänster. Klassen
ska hållas tunn; ny PSDK-nära logik bör normalt ligga i runtime, repository eller
service beroende på ansvar.

## SdkRuntime

Wrapper runt `PaymentSdk`. Den registrerar SDK-listenern, initierar SDK:t och
publicerar SDK-events som Kotlin-flöden.

Viktig regel: PSDK-instansen ska fortsätta vara centraliserad här.

## TerminalConnectionManager

Äger anslutningsstatus och reconnect. Den får inte innehålla UI-logik eller
funktionsspecifik betalningslogik. Detaljer finns i
[Anslutning och återanslutning](../lifecycle/connection.md).

## PaymentSdkRepository

Lägsta betalningsadaptern mot PSDK:s `TransactionManager`. Den får känna till
SDK-typer och SDK-events, men ska inte exponera dem till publika modeller.

## PaymentService

Betalningsfasad ovanpå repositoryt. Här hör samtidighetskontroll,
sessionskoordination och mappning till `PaymentResult`/`PaymentError` hemma.

## PaymentSessionCoordinator

Samlar mönstret starta session, kör operation och avsluta session. Använd den när
nya betalningsoperationer behöver en PSDK-session.

## Printer och scanner

`VerifonePrintService` och `ScannerService` använder PSDK. `EpsonPrinterService`
använder Epson ePOS SDK. Publik användning finns i
[Kvittoutskrift](../features/receipt-printing.md) och
[Scanner](../features/scanner.md).
