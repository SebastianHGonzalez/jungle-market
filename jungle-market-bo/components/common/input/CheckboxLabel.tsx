/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  string, bool, node, shape,
} from 'prop-types';
import styled from 'styled-components';

import I18n from 'components/common/i18n';

const Optional = styled.i`
  font-size: small;
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 2;
  margin: 0 0.5em;
`;

interface Props extends React.Props<any> {
  optional?: boolean;
  left?: boolean;
  name: string;
  label: string;
  fillers: { [key: string]: string | number };
  fallback?: string;
}

function CheckboxFieldLabel({
  optional,
  label,
  children,
  left,
  fillers,
  fallback,
  ...props
}: Props) {
  return (
    <label {...props}>
      {!left && children}
      <LabelWrapper>
        {label && (
          <span>
            <I18n id={label} fillers={fillers} fallback={fallback} />
          </span>
        )}
        {optional && (
          <Optional>
            (
            <I18n id="optional" />
            )
          </Optional>
        )}
      </LabelWrapper>
      {left && children}
    </label>
  );
}

CheckboxFieldLabel.propTypes = {
  optional: bool,
  left: bool,
  name: string,
  label: node,
  fillers: shape({}),
  fallback: string,
  children: node,
};

CheckboxFieldLabel.defaultProps = {
  optional: false,
  left: false,
  name: '',
  label: undefined,
  fillers: undefined,
  fallback: undefined,
  children: undefined,
};

export default styled(CheckboxFieldLabel)`
  align-items: center;
  display: flex;
`;
