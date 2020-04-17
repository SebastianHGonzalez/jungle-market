module.exports = function formatMonetaryAmount({ locale = 'es-AR', currency = 'ARS', value }) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
}
