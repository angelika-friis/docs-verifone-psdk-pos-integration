# Kvittoutskrift

Integrationslagret stödjer två utskriftsvägar:

- Verifone-terminalens skrivare via PSDK
- Epson-skrivare via Epson ePOS SDK

## Verifone-terminal

```kotlin
val result = ApiModule.terminal.print(
    content = "Kvitto",
    contentType = PrintContentType.TEXT,
)
```

`PrintContentType`:

- `HTML`
- `TEXT`
- `IMAGE`

I nuvarande implementation mappas `IMAGE` till PSDK:s text-content type.

Resultat:

```kotlin
when (val result = terminal.print(content, PrintContentType.TEXT)) {
    PrintResult.Success -> Unit
    is PrintResult.Failure -> show(result.errorMessage)
}
```

## Epson

Epson-skrivaren initieras med:

```kotlin
val initResult = ApiModule.terminal.initializeEpsonPrinter()
```

Utskrift görs med block:

```kotlin
val data = EpsonPrintData(
    blocks = listOf(
        EpsonPrintBlock.Text("Gardeco", EpsonAlign.CENTER),
        EpsonPrintBlock.Feed(1),
        EpsonPrintBlock.Text("Tack för ditt köp"),
        EpsonPrintBlock.Cut(),
    )
)

val result = ApiModule.terminal.printEpson(data)
```

Stödda Epson-block:

- `Logo(bitmap)`
- `Text(text, align)`
- `Feed(lines)`
- `Cut(type)`
- `Barcode(data)`

## Felhantering

Båda utskriftsvägarna returnerar `PrintResult`.

`PrintResult.Failure` innehåller:

- `errorMessage`: text som kan visas för användaren.
- `reason`: teknisk text för loggning.

Exempel:

```kotlin
if (result is PrintResult.Failure) {
    logger.warn(result.reason)
    showToast(result.errorMessage)
}
```
