# Betalningar

**Målgrupp:** konsument av integrationslagret.

Använd den här sidan för betalningsspecifikt beteende. Metodsignaturer finns i
[TerminalApi](../api/terminal-api.md) och resultatmodeller i
[Felhantering](../error-handling.md).

## Vanlig betalning

```kotlin
val result = ApiModule.terminal.pay(amountMinorUnits = 1000)
```

Belopp anges i minor units.

## Samtidighet

Integrationslagret stödjer en betalning åt gången. Om en betalning redan pågår
returneras `PaymentError.PaymentAlreadyInProgress`.

## Abort

```kotlin
ApiModule.terminal.abortPayment()
```

Abort skickar en avbrytbegäran till terminalen. UI ska vänta på resultatet från
det pågående betalningsanropet.

## Split payment-del

```kotlin
val result = ApiModule.terminal.paySplitPart(part, totalsGroupId)
```

`part.paymentType` avgör om delen hanteras som kort eller presentkort.

## Exempel

Se [Exempel: enkel betalning](../examples/basic-payment.md).
