import React from 'react';
import {
  string, bool, node, arrayOf,
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
`;

const LabelSpan = styled.span`
  color: #808080;
  font-size: 0.8125rem;
  font-stretch: normal;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.23px;
  text-transform: uppercase;
`;

// const ErrorWrapper = styled.div`
//   line-height: 2;
//   &:after {
//     color: transparent;
//     content: "X";
//   }
// `;

// const FieldError = styled(({ className, children }) => (
//   <span className={className}>
//     {Children.map(children, error => (
//       <I18n key={error} id={error} />
//     ))}
//   </span>
// ))`
//   color: #b00000;

//   &:before {
//     content: "*";
//   }
// `;

interface Props extends React.Props<any> {
  optional?: boolean;
  errors?: string[];
  name: string;
  label: any;
}

function Label({
  optional, label, name, children, errors, ...props
}: Props) {
  return (
    <label {...props}>
      <LabelWrapper>
        {label && (
          <LabelSpan>
            <I18n id={label} />
          </LabelSpan>
        )}
        {optional && (
          <Optional>
            (
            <I18n id="optional" />
            )
          </Optional>
        )}
      </LabelWrapper>
      {children}
      {/* <ErrorWrapper>
        {errors && !!errors.length && <FieldError>{errors}</FieldError>}
      </ErrorWrapper> */}
    </label>
  );
}

Label.propTypes = {
  optional: bool,
  errors: arrayOf(string),
  name: string,
  label: node,
  children: node,
};

Label.defaultProps = {
  optional: false,
  name: '',
  label: undefined,
  children: undefined,
};

export default styled(Label)`
  color: #444444;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;
