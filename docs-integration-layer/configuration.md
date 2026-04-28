# Konfiguration

**Målgrupp:** konsument av integrationslagret.

Konfiguration görs före `ApiModule.start(scope)`. Efter start får terminaltyp och
anslutningskonfiguration inte ändras.

## Ordning

```kotlin
ApiModule.setUseEmulatedTerminal(useMock)
ApiModule.setTerminalConnectionConfig(config)
ApiModule.initialize(context)
ApiModule.start(scope)
```

`setTerminalConnectionConfig(...)` kan hoppas över om `Persisted` ska användas.

## TerminalConnectionConfig

Välj en av:

- `TerminalConnectionConfig.Persisted`: använd tidigare sparad PSDK-konfiguration.
- `TerminalConnectionConfig.OnDevice`: använd terminal på samma enhet.
- `TerminalConnectionConfig.TcpIpClient`: anslut till separat terminal via IP.
- `TerminalConnectionConfig.TcpIpServer`: låt SDK:t lyssna efter terminal.

Exempel för off-device:

```kotlin
ApiModule.setTerminalConnectionConfig(
    TerminalConnectionConfig.TcpIpClient(
        address = BuildConfig.OFF_DEVICE_TERMINAL_IP,
        networkConfiguration = NetworkConfiguration.STATIC,
        forgetPersistedDevice = true,
    )
)
```

## Emulerad terminal

```kotlin
ApiModule.setUseEmulatedTerminal(true)
```

Emulerat läge startar ingen fysisk terminalintegration.

## Start och status

`ApiModule.start(scope)` väntar inte synkront på färdig terminal. Konsumera
`terminalReady` och `terminalConnected` enligt
[Status och flöden](api/state-and-flows.md).

Kända begränsningar finns i [Begränsningar](limitations.md).
