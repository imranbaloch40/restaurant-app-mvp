# Restaurant Mobile Application

Hamza Ali — Reg No 9751 — Assignment 01 — Submitted to Dr. Sadaf Tanvir — 27th September 2026

---

This repository contains a mobile prototype for a restaurant ordering and reservation system, built with React Native and Expo as part of a course assignment. The project is intentionally scoped as a frontend-only build: there is no server, no database, and no real authentication behind it. Its purpose is to demonstrate how a mobile app's screens, navigation, and state can be structured cleanly, not to be a deployable product.

## Two roles, one app

The app supports two kinds of users without requiring separate installs or login credentials:

A **customer** opens the app, looks through the menu, adds dishes to a cart, reviews and places an order, and then watches that order move through a simulated status pipeline. They can also view a basic profile screen.

A **manager**, instead, lands on a dashboard summarizing current activity and can review the restaurant's table reservations.

Which role you see is decided on a simple selection screen at launch — there's no real distinction enforced behind it, which is called out explicitly later in this document.

## Setting it up locally

Clone the repo, then from the project root:

```bash
npm install
npx expo start
```

Once the Metro bundler starts, open the Expo Go app on your phone and scan the printed QR code. If you'd rather run a simulator from your machine, press `a` for Android or `i` for iOS in the terminal running Expo.

## Navigation map

The app's screen flow looks like this:

```
Role selection screen
   |
   |-- Customer path: Menu -> Cart -> Order Summary -> Order Tracking
   |                  (Profile accessible throughout)
   |
   |-- Manager path: Dashboard, Reservations
```

Internally this is handled by a root navigator that decides which sub-navigator (customer or manager) to mount, each with its own tab bar and stack.

## Where things live

```
App.js                              root component; sets up CartProvider

src/context/CartContext.js          holds cart items, promo state, order type, totals
src/data/mockData.js                stand-in data: menu, orders, reservations
src/theme/theme.js                  shared colors, spacing and font values

src/navigation/RootNavigator.js         chooses Customer vs Manager flow
src/navigation/CustomerNavigator.js     customer tabs + stack screens
src/navigation/ManagerNavigator.js      manager tabs

src/screens/RoleSelectScreen.js

src/screens/customer/MenuScreen.js          browsing, search, category filters
src/screens/customer/CartScreen.js          quantity edits, notes, promo entry
src/screens/customer/OrderSummaryScreen.js  order type toggle, final check
src/screens/customer/OrderTrackingScreen.js simulated live status updates
src/screens/customer/ProfileScreen.js

src/screens/manager/DashboardScreen.js      summary cards, active orders
src/screens/manager/ReservationsScreen.js   reservation records and status

src/components/MenuItemCard.js
src/components/CategoryChip.js
src/components/CartItemRow.js
```

## Supporting diagrams

The UML diagrams produced for this assignment — use case, class, sequence, state machine, component, and activity — are kept under `/docs` in this repository for reference alongside the code.

## Scope: what actually works

It's worth being direct about what this build does and doesn't do, since "frontend-only" can mean different things.

Working and testable right now: navigating between every screen in both roles, cart total calculations (subtotal, discount, tax, grand total), the two promo codes `SAVE10` and `WELCOME5`, live menu search and filtering, editing item quantity and adding notes, and the animated order-tracking sequence.

Not implemented, by design: any real backend or API, actual login/authentication, data persistence across app restarts, and real payment processing. Closing and reopening the app resets everything to its initial mock state.

## Where this could go next

If this were carried past the assignment stage, the logical next steps would be replacing `mockData.js` with a real API layer, adding genuine authentication so the manager role isn't just a screen choice, persisting cart contents with AsyncStorage, and replacing the tracking screen's `setInterval` simulation with actual order-status updates from a server.

## Note on scope

This project was built for academic evaluation and is not intended for production or commercial use.
