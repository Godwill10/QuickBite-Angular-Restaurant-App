# QuickBite Angular Restaurant App

QuickBite is a beginner-friendly full-stack restaurant ordering project built with Angular 18, ExpressJS, Node.js, plain CSS, and JSON file storage.

## Features

- Black and gold restaurant interface
- Home, Menu, Details, Cart, and Checkout pages
- Menu data loaded from an Express API
- Quantity selection before adding menu items
- Shopping cart with calculated totals
- Checkout form
- Orders submitted to the Express API
- Orders stored in `orders.json`
- Redirect to the home page after a successful order
- Responsive CSS without Tailwind or Bootstrap

## Run the project

Install dependencies:

```bash
npm install
```

Start the API in one terminal:

```bash
npm run server
```

Start Angular in another terminal:

```bash
npm start
```

Open `http://localhost:4200` in your browser. The API runs on port 3000.

## Menu Photos

Add your own photos to `src/assets/images/` with these filenames:

- `burger.jpg`
- `fries.jpg`
- `icedtea.jpg`

The menu configuration in `server.js` already uses those paths.
