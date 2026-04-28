# TerminalApi

**Målgrupp:** konsument av integrationslagret.

`TerminalApi` är det kontrakt applikationslagret använder via
`ApiModule.terminal`.

## Status

```kotlin
val logs: SharedFlow<String>
val scannedCode: Flow<String>
val terminalReady: StateFlow<Boolean>
val terminalConnected: StateFlow<Boolean>
val deviceInfo: StateFlow<DeviceInfo?>
```

Semantiken för dessa flöden finns i [Status och flöden](state-and-flows.md).

## Livscykel

```kotlin
suspend fun startTerminal(config: TerminalConnectionConfig): TerminalInitResult
suspend fun teardownTerminal(): Boolean
```

`startTerminal(...)` ägs av `ApiModule` i normal appkod. Startordning finns i
[Snabbstart](../quick-start.md).

## Betalning

```kotlin
suspend fun pay(amountMinorUnits: Int): PaymentResult
suspend fun refundUnlinked(
    amountMinorUnits: Int,
    originalMaskedPan: String?,
    skipCardCheck: Boolean = false
): PaymentResult
suspend fun voidPayment(appSpecificData: String): PaymentResult
suspend fun paySplitPart(part: SplitPaymentPart, totalsGroupId: String): PaymentResult
fun abortPayment()
```

Funktionsspecifik användning finns i:

- [Betalningar](../features/payments.md)
- [Refund](../features/refund.md)
- [Void](../features/void.md)

Resultat och fel beskrivs i [Felhantering](../error-handling.md).

## Scanner

```kotlin
fun initializeScanner()
fun startScanner(activity: Activity, behavior: ScanBehavior)
```

Användning finns i [Scanner](../features/scanner.md).

## Utskrift

```kotlin
suspend fun print(content: String, contentType: PrintContentType): PrintResult
suspend fun initializeEpsonPrinter(): PrintResult
suspend fun printEpson(data: EpsonPrintData): PrintResult
```

Användning finns i [Kvittoutskrift](../features/receipt-printing.md).
