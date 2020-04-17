import defaultTheme from './defaultTheme';

export function separatorColor(
  {
    theme: {
      table: { separator },
    },
  } = { theme: defaultTheme },
) {
  return separator;
}

export function primaryColor({ theme: { primary } } = { theme: defaultTheme }) {
  return primary;
}

export function primaryColorContrast(
  { theme: { primaryContrast } } = { theme: defaultTheme },
) {
  return primaryContrast;
}
