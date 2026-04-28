---
id: introduction
title: Introduktion
slug: /
---

# Integrationslagret

Integrationslagret är appens publika gräns mot terminal, betalning, scanner och
utskrift. Applikationslagret ska använda kontraktet
`TerminalApi`. Verifone Payment SDK eller interna implementationer ska inte användas direkt utav applikationslagret.

## Läsordning

För att använda lagret:

1. Börja med [Snabbstart](quick-start.md).
2. Välj terminalmiljö enligt [Konfiguration](configuration.md).
3. Läs API-kontraktet i [TerminalApi](api/terminal-api.md).
4. Hantera status enligt [Status och flöden](api/state-and-flows.md).
5. Hantera resultat och fel enligt [Felhantering](error-handling.md).

## När du behöver mer

Funktionerna beskrivs separat:

- [Betalningar](features/payments.md)
- [Refund](features/refund.md)
- [Void](features/void.md)
- [Scanner](features/scanner.md)
- [Kvittoutskrift](features/receipt-printing.md)

Kända begränsningar finns i [Begränsningar](limitations.md).

Intern arkitektur och implementation finns i [Arkitektur](architecture.md) och
[Intern översikt](internal/overview.md). De dokumenten riktar sig till utvecklare
av integrationslagret.
