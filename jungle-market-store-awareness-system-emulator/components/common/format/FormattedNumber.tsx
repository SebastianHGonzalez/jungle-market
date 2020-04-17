import React, { useMemo } from "react";

interface IProps {
  value: number;
  locale?: string;
  style?: string;
  currency?: string;
  minimumIntegerDigits?: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export default function FormattedNumber({
  value,
  locale,
  style,
  currency,
  minimumIntegerDigits,
  minimumFractionDigits,
  maximumFractionDigits
}: IProps) {
  const formater = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style,
        currency,
        minimumIntegerDigits,
        minimumFractionDigits,
        maximumFractionDigits
      }),
    [
      locale,
      style,
      currency,
      minimumIntegerDigits,
      minimumFractionDigits,
      maximumFractionDigits
    ]
  );

  return <>{formater.format(value)}</>;
}

FormattedNumber.defaultProps = {
  locale: "es-AR",
  style: "decimal",
  currency: undefined,
  minimumIntegerDigits: undefined,
  minimumFractionDigits: undefined,
  maximumFractionDigits: undefined
};
