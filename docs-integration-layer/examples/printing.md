# Exempel: utskrift

## Verifone-terminalens skrivare

```kotlin
viewModelScope.launch {
    val result = ApiModule.terminal.print(
        content = """
            <html>
              <body>
                <h1>Gardeco</h1>
                <p>Tack för ditt köp</p>
              </body>
            </html>
        """.trimIndent(),
        contentType = PrintContentType.HTML,
    )

    when (result) {
        PrintResult.Success -> showMessage("Kvitto utskrivet")
        is PrintResult.Failure -> showMessage(result.errorMessage)
    }
}
```

## Epson-skrivare

```kotlin
viewModelScope.launch {
    val data = EpsonPrintData(
        blocks = listOf(
            EpsonPrintBlock.Text("Gardeco", EpsonAlign.CENTER),
            EpsonPrintBlock.Feed(1),
            EpsonPrintBlock.Text("Order: 12345"),
            EpsonPrintBlock.Text("Total: 10.00"),
            EpsonPrintBlock.Feed(2),
            EpsonPrintBlock.Barcode("12345"),
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

## Rekommendation

Logga `PrintResult.Failure.reason` för felsökning och visa
`PrintResult.Failure.errorMessage` för användaren.
