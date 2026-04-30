export default {
  docs: [
    'introduction',
    {
      type: 'category',
      label: 'Run POS application',
      items: [
        'run-pos/run-pos-app',
      ],
    },
    {
      type: 'category',
      label: 'Integrate new POS app',
      items: [
        'build-pos/build-pos-app',
        'build-pos/configure-terminal',
        'build-pos/terminal-api',
        'build-pos/state-and-flows',
        {
          type: 'category',
          label: 'Features',
          items: [
            'build-pos/features/refund',
            'build-pos/features/payments',
            'build-pos/features/void',
            'build-pos/features/scanner',
            'build-pos/features/receipt-printing',
          ],
        },
        {
          type: 'category',
          label: 'Example',
          items: [
            'build-pos/examples/basic-payment',
            'build-pos/examples/printing',
            'build-pos/examples/scanner',
          ],
        },
        'build-pos/error-handling',
        'build-pos/limitations',
      ],
    },
    {
      type: 'category',
      label: 'Develop integration layer',
      items: [
        'integration-development/architecture',
        {
          type: 'category',
          label: 'Lifecycle',
          items: [
            'integration-development/lifecycle/initialization',
            'integration-development/lifecycle/connection',
            'integration-development/lifecycle/teardown',
          ],
        },
      ],
    },
  ],
};