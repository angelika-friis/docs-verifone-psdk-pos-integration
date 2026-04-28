# Void

Void används för att makulera en tidigare betalning:

```kotlin
val result = ApiModule.terminal.voidPayment(appSpecificData)
```

`appSpecificData` kommer från originalbetalningens `PaymentResult.Success`:

```kotlin
when (val result = terminal.pay(1000)) {
    is PaymentResult.Success -> save(result.appSpecificData)
    else -> Unit
}
```

## Flöde

När `voidPayment(...)` anropas:

1. en PSDK-session startas i repositoryt
2. en `Payment` skapas
3. `appSpecificData` sätts på betalningsobjektet
4. `TransactionManager.processVoid(...)` anropas
5. integrationen väntar på matchande `paymentCompleted`
6. resultatet mappas till `PaymentResult`

Lyckad void returnerar `PaymentResult.Success` med samma `appSpecificData`.

## Fel

Vanliga fel:

- `StartFailed`: PSDK accepterade inte void-kommandot.
- `DeviceNotConnected`: terminalanslutningen tappades.
- `Timeout`: inget matchande completed-event kom inom timeout.
- `Aborted`: flödet avbröts.
- `Declined(message)`: void nekades.

## Applikationsansvar

Applikationen måste spara `appSpecificData` från originalbetalningen. Utan det
värdet kan integrationslagret inte identifiera betalningen som ska voidas.
