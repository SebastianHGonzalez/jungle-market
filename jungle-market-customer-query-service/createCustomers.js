const fs = require('fs');
const { name } = require('faker');

function createCustomers(count) {
  return new Array(count).fill(null).map((_, id) => ({
    id,
    fullName: name.findName(),
  }));
}

const customers = createCustomers(100);

fs.writeFileSync('db.json', JSON.stringify({ customers }));
