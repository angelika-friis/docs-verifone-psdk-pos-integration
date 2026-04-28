# Refund

Integrationslagret stödjer obunden refund via:

```kotlin
val result = ApiModule.terminal.refundUnlinked(
    amountMinorUnits = 1000,
    originalMaskedPan = originalMaskedPan,
    skipCardCheck = false,
)
```

Belopp anges i minor units.

## Kortkontroll

När `skipCardCheck` är `false` gör integrationen en kortläsning innan refund:

1. PSDK-session startas.
2. `requestCardData(...)` skickas till terminalen.
3. integrationen väntar på kortdata.
4. BIN och sista fyra siffror jämförs med `originalMaskedPan`.
5. om kortet inte matchar returneras `PaymentError.WrongCard`.

Om kortdata inte kan läsas returneras `PaymentError.CardReadFailed`.

När `skipCardCheck` är `true` hoppar integrationen över den lokala kortkontrollen
och går direkt till refund-kommandot.

## Refundflöde

Efter eventuell kortkontroll:

1. en PSDK `Payment` skapas med `TransactionType.REFUND`
2. `TransactionManager.processRefund(...)` anropas
3. integrationen väntar på `TRANSACTION_ENDED`
4. resultatet mappas till `PaymentResult`

Lyckad refund returnerar `PaymentResult.Success`. Nekad refund returnerar
`PaymentResult.Failure` med `PaymentError.Declined(message)`.

## Viktigt

Det här är en obunden refund. Den är inte automatiskt kopplad till en tidigare
transaktion i integrationslagret. Om kassaflödet kräver hårdare kontroll behöver
applikationslagret spara och validera originaltransaktionen enligt sina
affärsregler.
