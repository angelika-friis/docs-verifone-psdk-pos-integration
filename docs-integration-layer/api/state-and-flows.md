# Status och flöden

**Målgrupp:** konsument av integrationslagret.

Den här sidan beskriver hur app-lagret ska läsa status från `TerminalApi`.
Metodlistan finns i [TerminalApi](terminal-api.md).

## terminalReady

```kotlin
val terminalReady: StateFlow<Boolean>
```

Använd detta som primärt villkor för att aktivera terminalflöden i UI.
`true` betyder att integrationslagret bedömer att terminalen kan ta emot nya
operationer.

## terminalConnected

```kotlin
val terminalConnected: StateFlow<Boolean>
```

Visar anslutningsstatus. `terminalReady` är striktare än `terminalConnected` och
ska användas för åtgärdsknappar.

## deviceInfo

```kotlin
val deviceInfo: StateFlow<DeviceInfo?>
```

Innehåller terminal-, Payment App-, PSDK- och merchant-information när den finns.
Värdet är `null` innan integrationslagret har publicerat information.

## logs

```kotlin
val logs: SharedFlow<String>
```

Loggrader från integrationslagret för debugvy, support och felsökning.

## scannedCode

```kotlin
val scannedCode: Flow<String>
```

Scannerresultat. Start av scanner beskrivs i [Scanner](../features/scanner.md).

## Exempel

```kotlin
val ready by terminalApi.terminalReady.collectAsState()
val connected by terminalApi.terminalConnected.collectAsState()
val deviceInfo by terminalApi.deviceInfo.collectAsState()
```

UI ska inte fråga PSDK direkt om motsvarande status.
