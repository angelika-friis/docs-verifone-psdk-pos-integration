# Nedstängning

Kontrollerad nedstängning görs via:

```kotlin
val success = ApiModule.terminal.teardownTerminal()
```

Metoden finns på `TerminalApi` och implementeras av `TerminalApiImpl`.

## Vad teardown gör

För fysisk terminal:

1. loggar att logout startar
2. anropar `runtime.logout()`
3. avbryter om logout misslyckas
4. anropar `runtime.teardown()`
5. avbryter om SDK teardown misslyckas
6. sätter `terminalConnected` till `false`
7. returnerar `true`

Vid exception loggas felet och metoden returnerar `false`.

## När metoden behövs

Vanlig appanvändning behöver normalt inte anropa teardown manuellt. Den är främst
relevant vid:

- kontrollerad logout från terminalintegration
- felsökning
- test där SDK ska stängas ned mellan scenarier
- explicit byte av integrationsläge i en ny process

## Viktigt

`ApiModule` har inget publikt reset-API som gör hela modulen startbar igen med ny
konfiguration i samma process. Behandla därför terminalkonfigurationen som
process-livscykelkonfiguration.
