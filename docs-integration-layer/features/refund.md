# Refund

**Målgrupp:** konsument av integrationslagret.

Den här sidan beskriver bara refund-specifikt beteende. API-signaturer finns i
[TerminalApi](../api/terminal-api.md) och resultatmodeller i
[Felhantering](../error-handling.md).

## Obunden refund

```kotlin
val result = ApiModule.terminal.refundUnlinked(
    amountMinorUnits = 1000,
    originalMaskedPan = originalMaskedPan,
    skipCardCheck = false,
)
```

Belopp anges i minor units.

## Kortkontroll

När `skipCardCheck` är `false` försöker integrationen läsa kortet och jämföra
BIN samt sista fyra siffror mot `originalMaskedPan`.

Möjliga refund-specifika fel:

- `CardReadFailed`
- `WrongCard`

När `skipCardCheck` är `true` går integrationen direkt till refund-kommandot.

## Ansvar hos app-lagret

Det här är en obunden refund. App-lagret ansvarar för att avgöra om refund får
göras enligt affärsregler och sparad originaltransaktion.
