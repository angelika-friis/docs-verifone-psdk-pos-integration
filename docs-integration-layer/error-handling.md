# Felhantering

Integrationslagret ska översätta SDK-nära fel till publika, stabila modeller som
applikationslagret kan hantera utan PSDK-beroende.

## TerminalInitResult

`startTerminal(...)` returnerar:

- `TerminalInitResult.Success`
- `TerminalInitResult.Failure(errorMessage)`

Vid fysisk terminal kan fel bero på misslyckad SDK-initiering, misslyckad login
eller oväntade exceptions under start.

## PaymentResult

Betalning, refund, void och split-delar returnerar `PaymentResult`.

Lyckat resultat:

```kotlin
PaymentResult.Success(
    paymentInfo = "...",
    appSpecificData = "...",
    maskedPan = "...",
    brand = "..."
)
```

`appSpecificData` ska sparas om betalningen senare behöver voidas.

Misslyckat resultat:

```kotlin
PaymentResult.Failure(
    paymentInfo = "...",
    error = PaymentError.Timeout
)
```

Avbrutet flöde:

```kotlin
PaymentResult.Aborted
```

## PaymentError

Publika feltyper:

- `DeviceNotConnected`: terminalen tappades eller saknas.
- `DeviceBusy`: terminalen är upptagen.
- `Timeout`: integrationen fick inte förväntat SDK-event i tid.
- `Aborted`: flödet avbröts.
- `StartFailed`: SDK:t accepterade inte start av operationen.
- `SessionNotActive`: session kunde inte startas.
- `CardReadFailed`: kortdata kunde inte läsas.
- `WrongCard`: kortkontroll vid refund matchade inte originalkortet.
- `PaymentAlreadyInProgress`: ett betalningsflöde pågår redan.
- `Declined(message)`: betalning/refund/void nekades.
- `SdkError(message)`: exception eller SDK-nära fel.
- `Unknown(message)`: okänt fel.

## PrintResult

Utskrift returnerar `PrintResult.Success` eller `PrintResult.Failure`.

Felvarianter:

- `OutOfPaper`
- `OverTemperature`
- `PaperJam`
- `LowBattery`
- `Unknown(code)`

Varje utskriftsfel har två textfält:

- `errorMessage`: användarvänligt meddelande som kan visas i UI.
- `reason`: teknisk orsak för loggning och felsökning.

## Anslutningsfel och återanslutning

`TerminalConnectionManager` lyssnar på flera signaler från `SdkRuntime`:

- communication status
- notification events
- payment completed events
- initieringsfel som bör trigga retry

Vid tappad anslutning sätts `terminalConnected` till `false`. Därefter försöker
manager-klassen göra teardown, initiera om med senaste `TerminalConnectionConfig`,
logga in igen och publicera device-information.

Applikationslagret ska reagera på statusflödena och undvika egna retry-loopar mot
PSDK.
