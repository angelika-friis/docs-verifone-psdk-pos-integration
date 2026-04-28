---
id: quick-start
title: Snabbstart
slug: /quick-start
---

# Snabbstart

Den normala vägen är att konfigurera och starta integrationslagret en gång när
appen startar. Därefter används `ApiModule.terminal` från ViewModels,
use cases eller annan applikationslogik.

## 1. Lägg till beroendet

Applikationsmodulen ska bero på integrationsmodulen:

```kotlin
dependencies {
    implementation(project(":api"))
}
```

Lägg även till i applikationsmodulen/libs:
- Verifones PSDK (t.ex. PaymentSDK-3.68.14.aar)

### Off-device specifika beroenden
Lägg till Epson SDK.
Ladda ner applikation *Epson Print Enabler* på den device där POS applikationen körs.

## 2. Konfigurera vid appstart

Exempel i `Application.onCreate()`:

```kotlin
class App : Application() {
    private val appScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)

    override fun onCreate() {
        super.onCreate()

        ApiModule.setUseEmulatedTerminal(BuildConfig.USE_EMULATED_TERMINAL)

        if (!BuildConfig.USE_EMULATED_TERMINAL) {
            val config =
                if (BuildConfig.USE_LOCAL_TERMINAL) {
                    TerminalConnectionConfig.OnDevice
                } else {
                    TerminalConnectionConfig.TcpIpClient(
                        address = BuildConfig.OFF_DEVICE_TERMINAL_IP,
                        forgetPersistedDevice = true,
                        networkConfiguration = NetworkConfiguration.STATIC,
                    )
                }

            ApiModule.setTerminalConnectionConfig(config)
        }

        ApiModule.initialize(this)
        ApiModule.start(appScope)
    }
}
```

Regler:

- `setUseEmulatedTerminal(...)` måste köras före `start(scope)`.
- `setTerminalConnectionConfig(...)` måste köras före `start(scope)`.
- `initialize(context)` måste köras före `start(scope)`.
- `ApiModule.terminal` får bara läsas efter att modulen har startats.

## 3. Använd terminalen

```kotlin
class PaymentViewModel : ViewModel() {
    private val terminalApi = ApiModule.terminal

    val terminalConnected = terminalApi.terminalConnected
    val terminalReady = terminalApi.terminalReady
    val deviceInfo = terminalApi.deviceInfo

    suspend fun pay(amountMinorUnits: Int): PaymentResult {
        return terminalApi.pay(amountMinorUnits)
    }
}
```

Belopp anges i minor units. `1000` betyder alltså 10,00 i terminalens valuta.

## 4. Kontrollera readiness

Innan UI erbjuder terminalflöden bör det lyssna på:

- `terminalConnected`: fysisk eller logisk anslutning finns.
- `terminalReady`: SDK är initierat, TransactionManager är inloggad och terminalen
  är ansluten.

Ett vanligt UI-villkor är att betalningsknappen bara är aktiv när
`terminalReady.value == true`.
