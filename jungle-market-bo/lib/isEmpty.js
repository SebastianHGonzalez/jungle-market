module.exports = function isEmpty(obj) {
  if (obj === null || obj === undefined) return true;

  if (Array.isArray(obj)) return !obj.length;
  if (Number.isFinite(obj)) return false;
  if (typeof obj === "string") return !obj.length;
  return !Object.keys(obj).length;
}
