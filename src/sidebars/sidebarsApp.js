
export default {
  docs: [
    'app/intro',
    'app/architecture',
    {
      type: 'category',
      label: 'UI components',
      items: [
        'app/UI Components/Base/Buttons',
        'app/UI Components/Cart/Cart Bar',
        'app/UI Components/Overlays/Modals & Scanners',
        'app/UI Components/Products/Product Elements',
        'app/UI Components/Shopping Cart/Cart Overview',
      ],
    },
    {
      type: 'category',
      label: 'Database',
      items: [
        'app/Database/Intro',
        'app/Database/Room',
      ],
    },
  ],
};