# Begränsningar

**Målgrupp:** konsument av integrationslagret.

Det här är begränsningar som app-lagret behöver känna till.

## Process och konfiguration

- Integrationslagret ska startas en gång per app-process.
- Terminalkonfiguration kan inte ändras efter `ApiModule.start(scope)`.
- `ApiModule.start(scope)` är asynkron; använd `terminalReady`.

Start och konfiguration beskrivs i [Snabbstart](quick-start.md) och
[Konfiguration](configuration.md).

## Operationer

- En betalning åt gången stöds.
- Void kräver `appSpecificData` från originalbetalningen.
- Refundens kortkontroll jämför bara BIN och sista fyra siffror när den används.
- Scannerstart kräver en Android `Activity`.

Detaljer finns på respektive funktionssida.

## Utskrift

- `PrintContentType.IMAGE` är inte verifierat som riktig bildutskrift i
  terminalskrivaren.
- Epson-utskrift använder separat Epson-integration, inte terminalens skrivare.

Se [Kvittoutskrift](features/receipt-printing.md).
