# TerminalApi

`TerminalApi` är integrationslagrets publika kontrakt. Applikationslagret hämtar
en instans via `ApiModule.terminal`.

```kotlin
interface TerminalApi {
    val logs: SharedFlow<String>
    val scannedCode: Flow<String>
    val terminalReady: StateFlow<Boolean>
    val terminalConnected: StateFlow<Boolean>
    val deviceInfo: StateFlow<DeviceInfo?>

    suspend fun startTerminal(config: TerminalConnectionConfig): TerminalInitResult
    suspend fun teardownTerminal(): Boolean

    suspend fun pay(amountMinorUnits: Int): PaymentResult
    suspend fun refundUnlinked(
        amountMinorUnits: Int,
        originalMaskedPan: String?,
        skipCardCheck: Boolean = false
    ): PaymentResult
    suspend fun voidPayment(appSpecificData: String): PaymentResult
    suspend fun paySplitPart(part: SplitPaymentPart, totalsGroupId: String): PaymentResult
    fun abortPayment()

    fun initializeScanner()
    fun startScanner(activity: Activity, behavior: ScanBehavior)

    suspend fun print(content: String, contentType: PrintContentType): PrintResult
    suspend fun initializeEpsonPrinter(): PrintResult
    suspend fun printEpson(data: EpsonPrintData): PrintResult
}
```

## Livscykelmetoder

`startTerminal(...)` initierar PSDK, loggar in och publicerar device-information.
Den anropas av `ApiModule.start(scope)` och ska normalt inte anropas från
applikationslagret.

`teardownTerminal()` loggar ut och stänger ned SDK:t. Används när integrationen
behöver avslutas kontrollerat.

## Betalningsmetoder

`pay(amountMinorUnits)` startar en vanlig kortbetalning. Belopp anges i minor
units.

`refundUnlinked(amountMinorUnits, originalMaskedPan, skipCardCheck)` startar en
obunden refund. När `skipCardCheck` är `false` försöker integrationen läsa kortet
och jämföra BIN samt sista fyra siffror mot `originalMaskedPan`.

`voidPayment(appSpecificData)` makulerar en tidigare betalning. Värdet
`appSpecificData` kommer från en lyckad `PaymentResult.Success` och måste sparas
av applikationen om betalningen senare ska kunna voidas.

`paySplitPart(part, totalsGroupId)` betalar en enskild split-del. `part` kan vara
kort eller presentkort beroende på `CardType`.

`abortPayment()` skickar abort till SDK:t för ett pågående betalningsflöde.

## Scanner

`initializeScanner()` registrerar integrationslagrets scannerlistener hos PSDK.

`startScanner(activity, behavior)` startar scannern. `behavior` är:

- `ScanBehavior.SINGLE`
- `ScanBehavior.CONTINUOUS`

Scannerresultat publiceras i `scannedCode`.

## Utskrift

`print(content, contentType)` skriver via Verifone-terminalens skrivare.
`PrintContentType` kan vara `HTML`, `TEXT` eller `IMAGE`. I nuvarande
implementation mappas `IMAGE` till PSDK:s text-content type.

`initializeEpsonPrinter()` öppnar Epson-anslutningen.

`printEpson(data)` skriver blockbaserad Epson-data, till exempel text, logotyp,
barcode, feed och cut.
