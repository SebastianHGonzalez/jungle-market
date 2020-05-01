import React from 'react';
import styled from 'styled-components';
import { Value, ValueDetail } from 'components/common/layout/Table';
import I18n from 'components/common/i18n';

interface Props extends React.Props<never> {
  id?: string;
  nonce: string;
}

const ClientProfilePicture = styled.div`
  border-radius: 100%;
  background-color: ${({ theme: { neutral75 } }) => neutral75};
  height: 5em;
  width: 5em;
`;

const ClientDetails = styled.div``;

const ClientDashboardWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 1em;
  grid-template-columns: max-content 1fr;
`;

export default function ClientDashboard({ id, nonce }: Props) {
  return (
    <ClientDashboardWrapper>
      <ClientProfilePicture />
      <ClientDetails>
        <Value>
          <I18n id="client.nonce.label" />
          {': '}
          <ValueDetail as="span">{nonce}</ValueDetail>
        </Value>
        <Value>
          <I18n id="client.id.label" />
          {': '}
          <ValueDetail as="span">{id}</ValueDetail>
        </Value>
      </ClientDetails>
    </ClientDashboardWrapper>
  );
}
