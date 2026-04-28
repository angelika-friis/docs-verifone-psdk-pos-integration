# Exempel: scanner

**Målgrupp:** konsument av integrationslagret.

För scannerregler, se [Scanner](../features/scanner.md).

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

```kotlin
ApiModule.terminal.startScanner(
    activity = activity,
    behavior = ScanBehavior.SINGLE,
)
```
