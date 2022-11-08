// database product seed
export const products = [
  {
    name: 'Black Rock',
    description: 'A rock, but black',
    price: 1549.99,
    sku: 'sku_black_rock',
    published: true,
  },
  {
    name: 'Diamond',
    description: 'A diamond.',
    price: 9629.95,
    sku: 'sku_diamond',
    published: true,
  },
  {
    name: 'Brita',
    description: 'A Brita.',
    price: 0.95,
    sku: 'sku_brita',
    published: false,
  },
];

export const user = {
  name: 'Admin',
  email: 'email@admin.com',
  password: 'admin',
};

export const order = {
  product: 'Rock',
  description: 'THE ONE.',
  price: 555549.99,
  provider: 'All Store',
  available: true,
};
