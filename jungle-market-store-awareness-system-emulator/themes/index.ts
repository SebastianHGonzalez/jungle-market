import defaultTheme from "./defaultTheme";

export interface ITheme {
    primary: string,
    primary75: string,
    primary50: string,
    primary25: string,
    primaryContrast: string,
  
    secondary: string,
    secondary75: string,
    secondary50: string,
    secondary25: string,
    secondaryContrast: string,
  
    neutral: string,
    neutral75: string,
    neutral50: string,
    neutral25: string,
    neutralContrast: string,
  
    disabled: string,
    disabledContrast: string,
  
    error: string,
    errorContrast: string,
  
    link: string,
  
    table: {
      head: {
        background: string,
        backgroundContrast: string
      },
  
      background: string,
      backgroundOdd: string,
      separator: string
    },
  
    text: {
      boldWeight: number
    },
  
    bezier: {
      fast: string
    }
}

export default defaultTheme;