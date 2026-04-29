# Exempel: enkel betalning

**Målgrupp:** konsument av integrationslagret.

För betalningsregler, se [Betalningar](../features/payments.md). För resultat,
se [Felhantering](../error-handling.md).

```kotlin
class PaymentViewModel : ViewModel() {
    private val terminal = ApiModule.terminal

    val terminalReady = terminal.terminalReady

    fun pay(amountMinorUnits: Int) {
        viewModelScope.launch {
            when (val result = terminal.pay(amountMinorUnits)) {
                is PaymentResult.Success -> {
                    saveAppSpecificData(result.appSpecificData)
                    showMessage("Betalning godkänd")
                }

                is PaymentResult.Failure -> {
                    showMessage(formatPaymentError(result.error))
                }

                PaymentResult.Aborted -> {
                    showMessage("Betalningen avbröts")
                }
            }
        }
    }

    fun abort() {
        terminal.abortPayment()
    }
}
```

```kotlin
val ready by viewModel.terminalReady.collectAsState()

Button(
    enabled = ready,
    onClick = { viewModel.pay(1000) }
) {
    Text("Betala")
}
```
