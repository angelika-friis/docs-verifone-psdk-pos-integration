# Kvittoutskrift

**Målgrupp:** konsument av integrationslagret.

Integrationslagret har två utskriftsvägar. API-signaturer finns i
[TerminalApi](../api/terminal-api.md) och resultatmodellen i
[Felhantering](../error-handling.md).

## Verifone-terminalens skrivare

```kotlin
val result = ApiModule.terminal.print(
    content = "Kvitto",
    contentType = PrintContentType.TEXT,
)
```

`PrintContentType` kan vara `HTML`, `TEXT` eller `IMAGE`. Se kända begränsningar
i [Begränsningar](../limitations.md).

## Epson-skrivare

```kotlin
val initResult = ApiModule.terminal.initializeEpsonPrinter()
val result = ApiModule.terminal.printEpson(data)
```

`EpsonPrintData` består av block som text, logotyp, feed, cut och barcode.

## Exempel

Se [Exempel: utskrift](../examples/printing.md).
