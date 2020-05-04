import React, { useCallback } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import { Main } from 'components/common/layout';
import Label from 'components/common/input/Label';
import I18n from 'components/common/i18n';
import TextField from 'components/common/formik/TextField';
import Button from 'components/common/input/Button';
import ClientDashboard from 'components/emulator-dashboard/ClientDashboard';

import useCustomerPickedProduct from 'hooks/useCustomerPickedProduct';
import useBranch from 'hooks/useBranch';

const Section = styled.section``;

const ClientList = styled.ul`
  margin: -1em;
`;
const ClientListItem = styled.li`
  margin: 1em;
`;

type Props = React.Props<any>;

export default function EmulatorDashboard(props: Props) {
  const [execCustomerPickedProduct, { loading }] = useCustomerPickedProduct();
  const addProductToShoppingCart = useCallback(
    (variables) => execCustomerPickedProduct({ variables }),
    [execCustomerPickedProduct],
  );

  // TODO: parametrize this argument
  const branchId = 'branch1';

  const { clients, onClientEnters, onClientIdentified } = useBranch(branchId);

  return (
    <Main>
      <Section>
        <Button onClick={onClientEnters}>
          <I18n id="branch.client.enters" />
        </Button>
      </Section>

      <Section>
        <ClientList>
          {clients.map(({ nonce, id }) => (
            <ClientListItem key={nonce}>
              <ClientDashboard id={id} nonce={nonce} onIdentify={onClientIdentified} />
            </ClientListItem>
          ))}
        </ClientList>
      </Section>

      <Formik
        initialValues={{
          customerId: '',
          skuId: '',
        }}
        validationSchema={Yup.object({
          customerId: Yup.string()
            .trim()
            .required(),
          skuId: Yup.string()
            .trim()
            .required(),
        })}
        onSubmit={addProductToShoppingCart}
      >
        <Form>
          <Label>
            <I18n id="shoppingCart.customer.label" />
            <Field name="customerId" component={TextField} />
          </Label>
          <Label>
            <I18n id="shoppingCart.products.sku.label" />
            <Field name="skuId" component={TextField} />
          </Label>
          <Button type="submit" disabled={loading}>
            Enviar
          </Button>
        </Form>
      </Formik>
    </Main>
  );
}
