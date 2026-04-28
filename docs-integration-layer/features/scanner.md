# Scanner

Scannerstödet går via Verifone Payment SDK och exponeras av `TerminalApi`.

## Initiera scanner

```kotlin
ApiModule.terminal.initializeScanner()
```

Detta registrerar integrationslagrets `ScannerListener` hos PSDK.

## Starta scanning

```kotlin
ApiModule.terminal.startScanner(
    activity = activity,
    behavior = ScanBehavior.SINGLE,
)
```

`ScanBehavior` kan vara:

- `SINGLE`
- `CONTINUOUS`

Implementationens scannerattribut:

- aktuell `Activity` används som parent för scannerfeed
- scan area sätts till skärmens fulla bredd och höjd
- scannerljus aktiveras
- continuous scan sätts utifrån valt behavior

## Läsa resultat

Resultat publiceras via:

```kotlin
val scannedCode: Flow<String>
```

Exempel:

```kotlin
viewModelScope.launch {
    ApiModule.terminal.scannedCode.collect { code ->
        handleBarcode(code)
    }
}
```

## Begränsning

`startScanner(...)` kräver en `Activity`, vilket gör startanropet UI-nära.
Resultatet ska ändå flöda tillbaka genom `scannedCode` så att resten av
applikationen inte behöver känna till PSDK:s scannerlistener.
