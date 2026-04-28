# Felhantering

**Målgrupp:** konsument av integrationslagret.

Alla publika terminaloperationer returnerar modeller från `api.model`. App-lagret
ska hantera dessa modeller och inte PSDK-specifika statuskoder.

## TerminalInitResult

- `Success`
- `Failure(errorMessage)`

Normal start sker via `ApiModule.start(scope)`, se [Snabbstart](quick-start.md).

## PaymentResult

- `Success(paymentInfo, appSpecificData, maskedPan, brand)`
- `Failure(paymentInfo, error)`
- `Aborted`

Spara `appSpecificData` från `Success` om void ska stödjas. Void-flödet beskrivs
i [Void](features/void.md).

## PaymentError

- `DeviceNotConnected`
- `DeviceBusy`
- `Timeout`
- `Aborted`
- `StartFailed`
- `SessionNotActive`
- `CardReadFailed`
- `WrongCard`
- `PaymentAlreadyInProgress`
- `Declined(message)`
- `SdkError(message)`
- `Unknown(message)`

Funktionsspecifika orsaker beskrivs på respektive funktionssida:

- [Betalningar](features/payments.md)
- [Refund](features/refund.md)
- [Void](features/void.md)

## PrintResult

- `Success`
- `Failure`

`Failure` har:

- `errorMessage`: text som kan visas för användaren.
- `reason`: teknisk text för loggning.

Utskriftsflöden beskrivs i [Kvittoutskrift](features/receipt-printing.md).
