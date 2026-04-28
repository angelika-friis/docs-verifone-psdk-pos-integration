export default {
  docs: [
    'introduction',
    'quick-start',
    'configuration',
    'architecture',
    {
      type: 'category',
      label: 'Funktioner',
      items: [
        'features/payments',
        'features/refund',
        'features/void',
        'features/scanner',
        'features/receipt-printing',
      ],
    },
    {
      type: 'category',
      label: 'Livscykel',
      items: [
        'lifecycle/connection',
        'lifecycle/initialization',
        'lifecycle/teardown',
      ],
    },
    {
      type: 'category',
      label: 'Interna funktioner',
      items: [
        'internal/overview',
      ],
    },
    {
      type: 'category',
      label: 'Exempel',
      items: [
        'examples/basic-payment',
        'examples/printing',
        'examples/scanner',
      ],
    },
    'limitations',
    'error-handling',
  ],
};