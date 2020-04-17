const reduceObject = require("./reduceObject");

module.exports = function filterObject(f, obj) {
  return reduceObject(
    (res, entry) =>
      f(entry) ? Object.assign(res, { [entry[0]]: entry[1] }) : res,
    {},
    obj
  );
}
