# Exempel: utskrift

**Målgrupp:** konsument av integrationslagret.

För utskriftsregler, se [Kvittoutskrift](../features/receipt-printing.md).

## Verifone

```kotlin
viewModelScope.launch {
    val result = ApiModule.terminal.print(
        content = "<p>Tack för ditt köp</p>",
        contentType = PrintContentType.HTML,
    )

    when (result) {
        PrintResult.Success -> showMessage("Kvitto utskrivet")
        is PrintResult.Failure -> showMessage(result.errorMessage)
    }
}
```

## Epson

```kotlin
viewModelScope.launch {
    val data = EpsonPrintData(
        blocks = listOf(
            EpsonPrintBlock.Text("Gardeco", EpsonAlign.CENTER),
            EpsonPrintBlock.Feed(1),
            EpsonPrintBlock.Text("Tack för ditt köp"),
            EpsonPrintBlock.Cut(),
        )
    )

    val result = ApiModule.terminal.printEpson(data)

    when (result) {
        PrintResult.Success -> showMessage("Kvitto utskrivet")
        is PrintResult.Failure -> showMessage(result.errorMessage)
    }
}
```
