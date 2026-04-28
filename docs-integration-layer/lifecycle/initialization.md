# Initiering

Initiering sker i två steg:

1. `ApiModule.initialize(context)`
2. `ApiModule.start(scope)`

`initialize(context)` förbereder modulens grundläge. Vid fysisk terminal sparas
`applicationContext` och `RuntimeProvider.init(appContext)` körs. Vid emulerad
terminal initieras ingen PSDK-runtime.

## initialize

```kotlin
ApiModule.initialize(context)
```

Metoden är idempotent. Om modulen redan är initierad returnerar den direkt.

Den måste köras före:

```kotlin
ApiModule.start(scope)
ApiModule.terminal
```

Om `ApiModule.terminal` läses före initiering kastas `IllegalStateException` med
meddelandet `ApiModule not initialized`.

## start

```kotlin
ApiModule.start(scope)
```

`start(scope)` kräver att modulen redan är initierad. Metoden är också
idempotent: första anropet startar integrationen, senare anrop returnerar utan
att skapa en ny SDK-instans.

Vid emulerad terminal:

- `MockTerminalApi` skapas.
- `startTerminal(...)` körs i den angivna scopet.

Vid fysisk terminal:

- `TerminalApiFactory.create(appContext, scope)` skapar alla interna tjänster.
- `TerminalApiImpl.startTerminal(config)` körs i den angivna scopet.
- `TerminalConnectionManager` uppdateras med startresultatet.
- `initializeEpsonPrinter()` anropas.

## Startresultat

`start(scope)` returnerar inte `TerminalInitResult` direkt eftersom start sker
asynkront. Applikationslagret ska därför lyssna på:

- `terminalConnected`
- `terminalReady`
- `deviceInfo`
- `logs`

## Rekommenderad ordning

```kotlin
ApiModule.setUseEmulatedTerminal(useMock)
ApiModule.setTerminalConnectionConfig(config)
ApiModule.initialize(applicationContext)
ApiModule.start(appScope)
```

När integrationen är startad:

```kotlin
val terminalApi = ApiModule.terminal
```
