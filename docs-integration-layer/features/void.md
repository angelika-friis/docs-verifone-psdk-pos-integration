# Void

**Målgrupp:** konsument av integrationslagret.

Void makulerar en tidigare betalning med `appSpecificData` från originalköpet.
API-signaturer finns i [TerminalApi](../api/terminal-api.md).

## Användning

```kotlin
val result = ApiModule.terminal.voidPayment(appSpecificData)
```

Spara värdet från lyckad betalning:

```kotlin
if (result is PaymentResult.Success) {
    save(result.appSpecificData)
}
```

## App-lagrets ansvar

Integrationslagret kan inte voida en betalning utan `appSpecificData`. App-lagret
måste därför spara värdet tillsammans med originaltransaktionen.

Resultat och fel beskrivs i [Felhantering](../error-handling.md).
