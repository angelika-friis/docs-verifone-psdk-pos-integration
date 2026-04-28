# Exempel: scanner

Scannerflödet består av initiering, start och insamling av resultat.

## ViewModel

```kotlin
class ScannerViewModel : ViewModel() {
    private val terminal = ApiModule.terminal

    private val _latestCode = MutableStateFlow<String?>(null)
    val latestCode: StateFlow<String?> = _latestCode

    init {
        terminal.initializeScanner()

        viewModelScope.launch {
            terminal.scannedCode.collect { code ->
                _latestCode.value = code
            }
        }
    }
}
```

## UI-start

`startScanner(...)` behöver en `Activity`.

```kotlin
val activity = LocalContext.current as Activity

Button(
    onClick = {
        ApiModule.terminal.startScanner(
            activity = activity,
            behavior = ScanBehavior.SINGLE,
        )
    }
) {
    Text("Skanna")
}
```

För kontinuerlig scanning:

```kotlin
ApiModule.terminal.startScanner(
    activity = activity,
    behavior = ScanBehavior.CONTINUOUS,
)
```

## Resultat

Alla skannade koder kommer via `scannedCode`. UI bör inte använda PSDK:s
`ScannerListener` direkt.
