const reduceObject = require("./reduceObject");

module.exports = function mapObjectValues(f, obj) {
  return reduceObject(
    (res, [k, v]) => Object.assign(res, { [k]: f(v) }),
    {},
    obj
  );
}
