# Scanner

**Målgrupp:** konsument av integrationslagret.

Scanner används via `TerminalApi`. API-signaturer finns i
[TerminalApi](../api/terminal-api.md).

## Initiera och starta

```kotlin
ApiModule.terminal.initializeScanner()

ApiModule.terminal.startScanner(
    activity = activity,
    behavior = ScanBehavior.SINGLE,
)
```

`ScanBehavior` kan vara `SINGLE` eller `CONTINUOUS`.

## Läsa resultat

Scannerresultat kommer via `scannedCode`, se
[Status och flöden](../api/state-and-flows.md).

## Exempel

Se [Exempel: scanner](../examples/scanner.md).
