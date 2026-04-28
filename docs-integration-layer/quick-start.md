# Snabbstart

**Målgrupp:** konsument av integrationslagret.

Den här sidan visar minsta rekommenderade startflöde. Detaljer om tillgängliga
terminalkonfigurationer finns i [Konfiguration](configuration.md).

## 1. Lägg till beroendet

```kotlin
dependencies {
    implementation(project(":api"))
}
```

## 2. Starta integrationslagret

```kotlin
class App : Application() {
    private val appScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)

    override fun onCreate() {
        super.onCreate()

        ApiModule.setUseEmulatedTerminal(BuildConfig.USE_EMULATED_TERMINAL)

        if (!BuildConfig.USE_EMULATED_TERMINAL) {
            ApiModule.setTerminalConnectionConfig(
                if (BuildConfig.USE_LOCAL_TERMINAL) {
                    TerminalConnectionConfig.OnDevice
                } else {
                    TerminalConnectionConfig.TcpIpClient(
                        address = BuildConfig.OFF_DEVICE_TERMINAL_IP,
                        networkConfiguration = NetworkConfiguration.STATIC,
                        forgetPersistedDevice = true,
                    )
                }
            )
        }

        ApiModule.initialize(this)
        ApiModule.start(appScope)
    }
}
```

`ApiModule.start(scope)` är asynkron. Läs readiness via
[Status och flöden](api/state-and-flows.md).

## 3. Använd terminalen

```kotlin
class PaymentViewModel : ViewModel() {
    private val terminal = ApiModule.terminal

    val terminalReady = terminal.terminalReady

    suspend fun pay(amountMinorUnits: Int): PaymentResult {
        return terminal.pay(amountMinorUnits)
    }
}
```

Publika metoder och modeller beskrivs i [TerminalApi](api/terminal-api.md).
