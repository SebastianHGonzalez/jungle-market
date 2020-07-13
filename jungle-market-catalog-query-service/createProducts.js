const fs = require('fs');
const { commerce } = require('faker/locale/es_MX');

function createProducts(count) {
  return new Array(count).fill(null).map((_, id) => ({
    id,
    shortName: commerce.product(),
    price: commerce.price(),
  }));
}

const products = createProducts(100);

fs.writeFileSync('db.json', JSON.stringify({ products }));
