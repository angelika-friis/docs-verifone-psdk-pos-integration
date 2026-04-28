# Exempel: enkel betalning

Det här exemplet visar ett typiskt ViewModel-flöde för en vanlig betalning.

```kotlin
class PaymentViewModel : ViewModel() {
    private val terminal = ApiModule.terminal

    val terminalReady = terminal.terminalReady

    private val _message = MutableStateFlow<String?>(null)
    val message: StateFlow<String?> = _message

    fun pay(amountMinorUnits: Int) {
        viewModelScope.launch {
            when (val result = terminal.pay(amountMinorUnits)) {
                is PaymentResult.Success -> {
                    saveAppSpecificData(result.appSpecificData)
                    _message.value = "Betalning godkänd"
                }

                is PaymentResult.Failure -> {
                    _message.value = formatPaymentError(result.error)
                }

                PaymentResult.Aborted -> {
                    _message.value = "Betalningen avbröts"
                }
            }
        }
    }

    fun abort() {
        terminal.abortPayment()
    }
}
```

## UI-villkor

Betalningsknappen bör vara inaktiv när terminalen inte är redo:

```kotlin
val ready by viewModel.terminalReady.collectAsState()

Button(
    enabled = ready,
    onClick = { viewModel.pay(1000) }
) {
    Text("Betala")
}
```

## Viktigt

- Anropa `pay(...)` från en coroutine.
- Spara `appSpecificData` från lyckade betalningar om void ska stödjas.
- Låt `PaymentResult` styra UI-resultatet, inte en egen SDK-observation.
