---
id: configuration
title: Konfigurera
slug: /configuration
---

# Konfiguration

Konfigurationen görs via `ApiModule` innan integrationslagret startas.

```kotlin
ApiModule.setUseEmulatedTerminal(...)
ApiModule.setTerminalConnectionConfig(...)
ApiModule.initialize(context)
ApiModule.start(scope)
```

Efter `ApiModule.start(scope)` är konfigurationen låst. Försök att ändra
terminaltyp eller anslutningskonfiguration efter start leder till `IllegalStateException`.

## Emulerad terminal

```kotlin
ApiModule.setUseEmulatedTerminal(true)
ApiModule.initialize(context)
ApiModule.start(scope)
```

När emulerad terminal används skapas `MockTerminalApi`. Då initieras inte
`RuntimeProvider` och ingen fysisk PSDK-runtime startas.

Detta läge är avsett för lokal utveckling, UI-flöden och test där fysisk terminal
inte ska krävas.

## On-device

```kotlin
ApiModule.setUseEmulatedTerminal(false)
ApiModule.setTerminalConnectionConfig(TerminalConnectionConfig.OnDevice)
ApiModule.initialize(context)
ApiModule.start(scope)
```

`OnDevice` använder terminalen och Payment App-instansen på samma enhet. Vid
initiering försöker `SdkRuntime` använda aktuell device-information från PSDK och
startar därefter SDK:t.

## Off-device som TCP/IP-klient

```kotlin
ApiModule.setTerminalConnectionConfig(
    TerminalConnectionConfig.TcpIpClient(
        address = "192.168.1.100",
        networkConfiguration = NetworkConfiguration.STATIC,
        forgetPersistedDevice = true,
    )
)
```

`TcpIpClient` används när appen ansluter till en separat terminal via IP-adress.

Fält:

- `address`: terminalens IP-adress.
- `networkConfiguration`: PSDK:s nätverksläge.
- `forgetPersistedDevice`: rensar tidigare vald enhet innan initiering.

`NetworkConfiguration` mappas till PSDK:s motsvarande värden:

- `DYNAMIC`
- `STATIC`
- `SERVICE_DISCOVERY`

## Off-device som TCP/IP-server

```kotlin
ApiModule.setTerminalConnectionConfig(
    TerminalConnectionConfig.TcpIpServer(serialNumber = null)
)
```

`TcpIpServer` låter SDK:t lyssna efter terminalanslutning. Om `serialNumber` är
`null` accepteras valfri terminal enligt PSDK:s värde för "accept any device".

## Persisted

```kotlin
ApiModule.setTerminalConnectionConfig(TerminalConnectionConfig.Persisted)
```

`Persisted` använder tidigare sparad terminalkonfiguration i PSDK. Det är
standardvärdet om ingen annan konfiguration sätts.

## BuildConfig-exempel

Projektet använder typiskt build flags för att välja läge:

```kotlin
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
```
