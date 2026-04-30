# Internal overview

**Target audience:** developers working on the integration layer.

This page describes internal classes and their responsibilities. The public contract is defined in
[TerminalApi](build-pos/api/terminal-api.md).

## ApiModule

Owns the integration instance for the process and selects between `MockTerminalApi` and the physical `TerminalApiImpl`.

It is responsible for initializing and starting the integration. See
[Initialization](integration-development/lifecycle/initialization.md) for the startup sequence.

## TerminalApiFactory

Constructs the dependency graph for a physical terminal, including:

* runtime
* connection manager
* payment repository and services
* Verifone and Epson print services
* scanner
* `TerminalApiImpl`

## TerminalApiImpl

Implements `TerminalApi` and delegates to domain-specific services.

This class should remain thin. Logic that is close to the PSDK should generally be placed in the runtime, repository, or service layer depending on responsibility.

## SdkRuntime

A wrapper around `PaymentSdk`.

Responsible for:

* SDK initialization
* registering SDK listeners
* exposing SDK events as Kotlin Flows

**Constraint:** the PSDK instance must remain centralized here.

## TerminalConnectionManager

Owns connection state and reconnection logic.

It must not contain UI logic or payment-specific business logic.
See [Connection and reconnection](integration-development/lifecycle/connection.md) for details.

## PaymentSdkRepository

The lowest-level payment adapter around the PSDK `TransactionManager`.

It may depend on SDK types and events, but must not expose them in public models.

## PaymentService

A façade on top of the repository.

Responsible for:

* session coordination
* concurrency control
* mapping to `PaymentResult` and `PaymentError`

## PaymentSessionCoordinator

Encapsulates the pattern: start session → perform operation → end session.

Use this when introducing new payment operations that require a PSDK session.

## Printing and scanning

* `VerifonePrintService` and `ScannerService` use the PSDK
* `EpsonPrinterService` uses the Epson ePOS SDK

For public usage, see:

* [Receipt printing](build-pos/features/receipt-printing.md)
* [Scanner](build-pos/features/scanner.md)