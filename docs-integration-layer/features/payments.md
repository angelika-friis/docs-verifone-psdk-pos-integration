# Betalningar

Vanliga betalningar startas med:

```kotlin
val result = ApiModule.terminal.pay(amountMinorUnits = 1000)
```

Belopp anges i minor units. `1000` motsvarar 10,00 i terminalens valuta.

## Flöde

När `pay(...)` anropas:

1. `PaymentService` kontrollerar att ingen annan betalning pågår.
2. `PaymentSessionCoordinator` startar en PSDK-session.
3. `PaymentSdkRepository.processSale(...)` skapar en PSDK `Payment`.
4. `TransactionManager.startPayment(...)` anropas.
5. integrationen väntar på `paymentCompleted`.
6. SDK-resultatet mappas till `PaymentResult`.
7. sessionen avslutas.

## Samtidighet

Endast en betalning åt gången tillåts. Om `pay(...)` anropas medan en betalning
redan pågår returneras:

```kotlin
PaymentResult.Failure(null, PaymentError.PaymentAlreadyInProgress)
```

## Lyckad betalning

Vid lyckad betalning returneras:

```kotlin
PaymentResult.Success(
    paymentInfo = "...",
    appSpecificData = "...",
    maskedPan = "...",
    brand = "..."
)
```

Spara `appSpecificData` om betalningen ska kunna voidas senare.

## Avbruten betalning

Om användaren eller systemet avbryter flödet returneras `PaymentResult.Aborted`
eller ett failure med `PaymentError.Aborted`, beroende på vilket internt
SDK-resultat som tas emot.

## Abort

Pågående betalning kan avbrytas med:

```kotlin
ApiModule.terminal.abortPayment()
```

Metoden skickar abort till PSDK. UI bör därefter vänta på resultatet från det
pågående `pay(...)`-anropet i stället för att anta att abort är omedelbart klar.

## Split payment-delar

En split-del betalas med:

```kotlin
val result = ApiModule.terminal.paySplitPart(part, totalsGroupId)
```

`part.paymentType` avgör om SDK-betalningen blir vanlig kortbetalning eller
stored value/presentkort. Split-flödet använder `totalsGroupId` och ett lokalt
payment-id för att matcha rätt `paymentCompleted`-event.
