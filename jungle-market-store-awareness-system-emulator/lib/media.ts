const minWidth = (width: string) => (str: string | TemplateStringsArray) => `@media (min-width: ${width}) {${str}}`;

export const minXl = minWidth('1600px');
export const minLg = minWidth('1200px');
export const minMd = minWidth('1024px');
export const minSm = minWidth('768px');
export const minXs = minWidth('480px');

export const desktop = minSm;
