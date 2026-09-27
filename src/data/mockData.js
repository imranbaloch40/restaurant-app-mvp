export const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

export const menuItems = [
  { id: '1', name: 'Grilled Chicken Skewers', category: 'Starters', price: 8.5, desc: 'Charred chicken, peanut sauce, pickled onions.', image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400' },
  { id: '2', name: 'Crispy Calamari', category: 'Starters', price: 9.0, desc: 'Lightly fried, chili lime aioli.', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400' },
  { id: '3', name: 'Truffle Mushroom Risotto', category: 'Mains', price: 16.0, desc: 'Arborio rice, wild mushrooms, parmesan.', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400' },
  { id: '4', name: 'Grilled Ribeye Steak', category: 'Mains', price: 24.0, desc: '10oz ribeye, herb butter, roasted potatoes.', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400' },
  { id: '5', name: 'Margherita Pizza', category: 'Mains', price: 13.5, desc: 'San Marzano tomato, mozzarella, basil.', image: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=400' },
  { id: '6', name: 'Chocolate Lava Cake', category: 'Desserts', price: 7.0, desc: 'Warm cake, molten center, vanilla ice cream.', image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400' },
  { id: '7', name: 'Tiramisu', category: 'Desserts', price: 6.5, desc: 'Espresso-soaked ladyfingers, mascarpone.', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400' },
  { id: '8', name: 'Fresh Lemonade', category: 'Drinks', price: 4.0, desc: 'Hand-squeezed, mint garnish.', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400' },
  { id: '9', name: 'Iced Latte', category: 'Drinks', price: 4.5, desc: 'Double shot espresso, cold milk.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400' },
];

export const promoCodes = {
  SAVE10: 0.10,
  WELCOME5: 0.05,
};

export const dashboardStats = {
  todayOrders: 42,
  todayRevenue: 1284.5,
  activeReservations: 7,
  pendingOrders: 3,
};

export const managerOrders = [
  { id: 'O-2031', table: 'Table 4', items: 3, total: 38.5, status: 'Preparing' },
  { id: 'O-2032', table: 'Takeaway', items: 2, total: 21.0, status: 'Ready' },
  { id: 'O-2033', table: 'Table 1', items: 5, total: 62.0, status: 'New' },
];

export const reservations = [
  { id: 'R-101', name: 'Ayesha Khan', guests: 4, time: '7:30 PM', status: 'Confirmed' },
  { id: 'R-102', name: 'Bilal Ahmed', guests: 2, time: '8:00 PM', status: 'Pending' },
  { id: 'R-103', name: 'Sara Malik', guests: 6, time: '8:30 PM', status: 'Confirmed' },
  { id: 'R-104', name: 'Usman Tariq', guests: 3, time: '9:00 PM', status: 'Cancelled' },
];

export const orderTrackingStages = ['Order Placed', 'Preparing', 'Ready', 'Out / Served', 'Completed'];
