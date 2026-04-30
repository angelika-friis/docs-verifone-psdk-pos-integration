# Modals & Scanners

The `ScannerOverlay` is a specialized overlay component designed for point-of-sale (POS) interactions. It provides a non-intrusive way to handle manual input for scanned items while maintaining the context of the current screen.

---

## Overview

The `ScannerOverlay` acts as a bottom-aligned modal that appears when a barcode scanner is active or when a manual entry is required. It obscures the background with a semi-transparent dimming effect to focus the user's attention on the input field.

---

## Key Features

- **Bottom-Sheet Behavior**: Anchored to the bottom of the screen for ergonomic thumb reach on mobile devices.
- **Dismissible Backdrop**: Tapping the dimmed area triggers the `onDismiss` callback, allowing the user to easily exit the scanner mode.
- **IME Awareness**: Uses `imePadding()` to ensure the modal shifts upward when the software keyboard is visible, preventing input fields from being hidden.
- **State Persistence**: Features an internal `textState` to handle real-time manual edits to scanned codes.

---

## Technical Specifications

### Parameters (Props)

| Name | Type | Description |
| :--- | :--- | :--- |
| `scannedCode` | `String` | The initial code captured by the scanner hardware. |
| `onDismiss` | `() -> Unit` | Lambda triggered when clicking outside the modal or closing it. |

### Styling Details
- **Backdrop Color**: `Color.Black` with 40% alpha.
- **Background**: Solid White `Card` with an elevation of `8.dp`.
- **Input Field**: Flat `TextField` design with light gray container (`0xFFF9F9F9`) and no visible indicator lines for a modern, clean look.

---

## Usage Example

```kotlin
var showScanner by remember { mutableStateOf(false) }

if (showScanner) {
    ScannerOverlay(
        scannedCode = "7310001234567",
        onDismiss = { showScanner = false }
    )
}