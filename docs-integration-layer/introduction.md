---
id: introduction
title: Introduktion
slug: /
---

# Integrationslagret

Integrationslagret är projektets gräns mot Verifone Payment SDK, PSDK, och
övriga enhetsnära integrationer som scanner och kvittoskrivare. Lagret ligger i
Gradle-modulen `api` och används av applikationslagret via `ApiModule.terminal`.

Målet är att UI, ViewModels och domänlogik ska slippa känna till PSDK:s
callback-modell, terminalsessioner, login/logout, återanslutning och
skrivar-SDK:n. Applikationslagret arbetar i stället mot ett stabilt Kotlin-API
med `suspend`-funktioner och `Flow`/`StateFlow`.

## Huvudprinciper

- `ApiModule` äger initiering och start av integrationslagret.
- `TerminalApi` är den publika kontraktytan för applikationslagret.
- `TerminalApiImpl`, `TerminalConnectionManager`, `SdkRuntime` och serviceklasser
  är interna implementationer.
- Verifone SDK behandlas som en process-singleton och ska bara initieras en gång
  per app-process.
- Valet mellan mock, on-device och off-device görs innan `ApiModule.start(scope)`.
- Status observeras via flöden, inte genom egna SDK-anrop från UI.

## Ingångar

Applikationslagret ska normalt bara använda:

```kotlin
ApiModule.initialize(context)
ApiModule.start(appScope)
val terminal = ApiModule.terminal
```

`TerminalApi.startTerminal(...)` finns i det publika interfacet eftersom mock och
verklig implementation delar livscykelkontrakt, men metoden ska i praktiken
anropas av `ApiModule`, inte direkt från UI eller ViewModels.

## Funktioner

Integrationslagret stödjer:

- terminalinitiering och inloggning mot PSDK
- on-device-terminal
- off-device-terminal via TCP/IP
- emulerad/mockad terminal för utveckling
- betalning
- obunden refund
- void baserat på `appSpecificData`
- split payment-delar
- abort av pågående betalningsflöde
- scanner via terminalen
- utskrift via Verifone-terminalens skrivare
- utskrift via Epson-skrivare
- statusflöden för anslutning, readiness, device info och loggar

## Paketöversikt

- `com.example.testv660p.api` innehåller publikt API och modulstart.
- `com.example.testv660p.api.model` innehåller publika datamodeller.
- `com.example.testv660p.internal.runtime` kapslar PSDK-runtime.
- `com.example.testv660p.internal.terminal` hanterar terminalens livscykel och
  anslutningsstatus.
- `com.example.testv660p.internal.payment` hanterar betalningssessioner och
  mapper SDK-resultat till publika modeller.
- `com.example.testv660p.internal.printer` hanterar Verifone- och Epson-utskrift.
- `com.example.testv660p.internal.scanner` hanterar scannerintegration.
