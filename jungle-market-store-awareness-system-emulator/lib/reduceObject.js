module.exports = function reduceObject(reducer, base, obj) {
  return Object.entries(obj).reduce(reducer, base);
}
