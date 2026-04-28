# Begränsningar

Den här sidan beskriver nuvarande begränsningar i integrationslagret och vilka
antaganden applikationslagret inte bör bryta.

## PSDK är process-singleton

Verifone Payment SDK ska bara initieras en gång per app-process. Skapa inte egna
`PaymentSdk`, `SdkRuntime` eller `TerminalApiImpl` från applikationslagret.

## Konfiguration kan inte ändras efter start

`setUseEmulatedTerminal(...)` och `setTerminalConnectionConfig(...)` måste köras
före `ApiModule.start(scope)`. Efter start kastar dessa metoder exception.

## En betalning åt gången

`PaymentService` skyddar vanliga betalningar och split-delar med en
`AtomicBoolean`. Om en betalning redan pågår returneras
`PaymentError.PaymentAlreadyInProgress`.

## Refundens kortkontroll är begränsad

När `skipCardCheck` är `false` jämförs BIN och sista fyra siffror från
`originalMaskedPan` mot läst kortdata. Det är en praktisk kontroll, inte en full
transaktionslänkning.

## Void kräver appSpecificData

Void använder `appSpecificData` från originalbetalningen. Applikationen måste
spara detta värde från `PaymentResult.Success`.

## Terminalskrivarens IMAGE-läge är inte fullt implementerat

`PrintContentType.IMAGE` mappas i nuvarande implementation till PSDK:s
`ContentType.TEXT`. Använd `HTML` eller `TEXT` för Verifone-utskrift tills
bildutskrift har verifierats.

## Epson-skrivare är separat från Verifone-terminalen

Epson-utskrift använder Epson ePOS SDK och en separat `EpsonPrinterConnection`.
Den är främst avsedd för off-device-läge och är inte samma mekanism som
terminalens inbyggda skrivare.

## Scanner kräver Activity

`startScanner(...)` kräver en Android `Activity` eftersom PSDK behöver en parent
för scannerfeed och scan area. Scannerflöden bör därför startas från UI-nära kod,
men resultatet ska fortfarande läsas via `scannedCode`.

## Start är asynkron

`ApiModule.start(scope)` startar terminalen i en coroutine och returnerar innan
terminalen nödvändigtvis är redo. Lyssna på `terminalReady` i stället för att
anta att terminalen är klar direkt efter startanropet.
