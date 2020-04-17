import React, { useCallback, useMemo } from "react";
import { string, func, number, node, bool } from "prop-types";
import styled from "styled-components";

import Button from "components/common/input/Button";
import I18n from "components/common/i18n";

import Dots from "components/common/icons/Dots";

const StyledButton = styled(Button)`
  font-size: small;
  margin: 0 0.25rem;
`;

function PageButton({ page, onChange, disabled, active, children }) {
  const handleClick = useCallback(() => {
    onChange(page);
  }, [page, onChange]);

  return (
    <StyledButton
      variant={active ? "filled" : "outlined"}
      color={active ? "primary" : "neutral"}
      onClick={handleClick}
      disabled={disabled}
    >
      {children || +page + 1}
    </StyledButton>
  );
}

PageButton.propTypes = {
  page: number.isRequired,
  onChange: func,
  disabled: bool,
  active: bool,
  children: node
};

PageButton.defaultProps = {
  page: number.isRequired,
  onChange: noop,
  disabled: false,
  active: false,
  children: undefined
};

function noop() {}

export function getPagesToDisplay(
  current: number,
  total: number,
  collapseWindow: number
): number[] {
  const first = 0;
  const last = total - 1;

  return new Array(collapseWindow)
    .fill(null)
    .map((_, n) => [current + 1 + n, current - 1 - n])
    .flat()
    .concat(current)
    .filter(n => n > 0 && n < last)
    .concat([first, last])
    .sort((a, b) => a - b);
}

function Pagination({ className, current, total, onChange, collapseWindow }) {
  const pages = useMemo(
    () => getPagesToDisplay(current, total, collapseWindow),
    [current, total, collapseWindow]
  );

  return (
    <div className={className}>
      <PageButton
        page={current - 1}
        onChange={onChange}
        disabled={current <= 0}
      >
        <I18n id="previous" />
      </PageButton>

      {pages.map((thisPage, index, arr) => (
        <>
          {arr[index - 1] < thisPage - 1 && <Dots />}
          <PageButton
            key={thisPage}
            page={thisPage}
            onChange={onChange}
            active={+thisPage === +current}
          />
        </>
      ))}

      <PageButton
        page={current + 1}
        onChange={onChange}
        disabled={current >= total - 1}
      >
        <I18n id="next" />
      </PageButton>
    </div>
  );
}

Pagination.propTypes = {
  className: string,
  collapseWindow: number,
  onChange: func,
  current: number.isRequired,
  total: number.isRequired
};

Pagination.defaultProps = {
  className: undefined,
  collapseWindow: 1,
  onChange: noop
};

export default styled(Pagination)`
  align-items: center;
  display: flex;
  justify-self: center;
`;
