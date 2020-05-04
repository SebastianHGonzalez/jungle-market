import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { Value, ValueDetail } from 'components/common/layout/Table';
import I18n from 'components/common/i18n';
import Button from 'components/common/input/Button';
import TextField from 'components/common/formik/TextField';

interface Props extends React.Props<never> {
  id?: string;
  nonce: string;

  onIdentify: (nonce: string, id: string) => void;
  onLeave: (nonce: string) => void;
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

export default function ClientDashboard({
  id,
  nonce,
  onIdentify,
  onLeave,
}: Props) {
  const handleIdentify = useCallback(
    ({ clientId }) => {
      onIdentify(nonce, clientId);
    },
    [nonce],
  );

  const handleLeave = useCallback(() => {
    onLeave(nonce);
  }, [onLeave, nonce]);

  return (
    <ClientDashboardWrapper>
      <ClientProfilePicture />
      <ClientDetails>
        <Value>
          <I18n id="client.nonce.label" />
          {': '}
          <ValueDetail as="span">{nonce}</ValueDetail>
        </Value>
        {id && (
          <Value>
            <I18n id="client.id.label" />
            {': '}
            <ValueDetail as="span">{id}</ValueDetail>
          </Value>
        )}
        <Button onClick={handleLeave}>
          <I18n id="client.leave.label" />
        </Button>

        {!id && (
          <Formik
            initialValues={{
              clientId: id,
            }}
            validationSchema={Yup.object({
              clientId: Yup.string()
                .trim()
                .required(),
            })}
            onSubmit={handleIdentify}
          >
            <Form>
              <Field name="clientId" component={TextField} />
              <Button type="submit">
                <I18n id="client.identify.label" />
              </Button>
            </Form>
          </Formik>
        )}
      </ClientDetails>
    </ClientDashboardWrapper>
  );
}
