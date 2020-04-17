import React from "react";

import useI18n from "hooks/useI18n";

interface IProps {
  value: string | number | Date;
  options?: Intl.DateTimeFormatOptions;
}

export default function FormattedDate({
  value,
  options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }
}: IProps) {
  const { lang } = useI18n();

  return (
    <>
      {value &&
        new Intl.DateTimeFormat(lang, options).format(new Date(value))}
    </>
  );
}
