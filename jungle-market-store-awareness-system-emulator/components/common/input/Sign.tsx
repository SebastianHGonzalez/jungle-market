import React from "react";
import styled from "styled-components";

import I18n from "components/common/i18n";
import { InputWrapper } from "components/common/input/TextInput";
import Loader from "components/common/icons/Loader";

interface IProps extends React.Props<any> {
  loading: boolean;
  value: string;
}

const Img = styled.img`
  max-height: 20rem;
`;

const SignContainer = styled(InputWrapper)`
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  min-height: 50px;
`;

export default function Sign({ loading, value }: IProps) {
  return (
    <SignContainer>
      {loading && <Loader />}
      {value && <Img src={value} alt="firma" />}
      {!value && !loading && (
        <i>
          <I18n id="sign.empty.label" />
        </i>
      )}
    </SignContainer>
  );
}
