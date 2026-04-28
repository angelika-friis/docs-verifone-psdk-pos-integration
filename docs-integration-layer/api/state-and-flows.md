# Status och flöden

Integrationslagret exponerar både tillstånd och punktvisa händelser via Kotlin
Flow.

## terminalConnected

```kotlin
val terminalConnected: StateFlow<Boolean>
```

`true` betyder att integrationslagret bedömer att terminalen är ansluten.
Värdet sätts till `true` efter lyckad terminalstart och kan sättas till `false`
vid händelser som `DEVICE_CONNECTION_LOST`, misslyckad sessionstart eller
betalningsfel som indikerar tappad terminal.

## terminalReady

```kotlin
val terminalReady: StateFlow<Boolean>
```

`terminalReady` är en sammanvägning av:

- SDK-initiering lyckades.
- `TransactionManager` är `LOGGED_IN`.
- `terminalConnected` är `true`.

Detta är det bästa flödet för UI att använda när det ska avgöra om terminalflöden
kan startas.

## deviceInfo

```kotlin
val deviceInfo: StateFlow<DeviceInfo?>
```

Publiceras efter lyckad initiering och login, när `SdkRuntime.emitDeviceInformation()`
har läst information från PSDK.

`DeviceInfo` innehåller:

- Payment App-namn och version
- PSDK-version
- serienummer
- tillverkare och modell
- Android OS-version
- merchant-information

## logs

```kotlin
val logs: SharedFlow<String>
```

`logs` är integrationslagrets egna loggradflöde. Det är avsett för debugvy,
felsökning och supportnära diagnostik. Det ersätter inte Android Logcat, men ger
applikationslagret ett enkelt sätt att visa viktiga integrationshändelser.

## scannedCode

```kotlin
val scannedCode: Flow<String>
```

Scannerresultat publiceras här efter `initializeScanner()` och
`startScanner(...)`. Flödet använder en liten buffert och tappar äldsta värdet om
nya värden kommer snabbare än de konsumeras.

## Rekommenderad UI-användning

```kotlin
val ready by terminalApi.terminalReady.collectAsState()
val connected by terminalApi.terminalConnected.collectAsState()
val deviceInfo by terminalApi.deviceInfo.collectAsState()
```

UI bör inte fråga PSDK direkt om status. Om status saknas i `TerminalApi` bör
kontraktet utökas i integrationslagret.
