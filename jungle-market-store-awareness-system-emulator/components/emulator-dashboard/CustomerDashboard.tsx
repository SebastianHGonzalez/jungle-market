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
  products: { [skuId: string]: number };

  onIdentify: (nonce: string, id: string) => void;
  onProductPicked: (nonce: string, skuId: string) => void;
  onLeave: (nonce: string) => void;
}

const SimpleForm = styled(Form)`
  display: flex;

  & > :first-child {
    flex-grow: 1;
    margin-inline-end: 1em;
  }
`;

const CustomerProfilePicture = styled.div`
  border-radius: 100%;
  background-color: ${({ theme: { neutral75 } }) => neutral75};
  height: 5em;
  width: 5em;
`;

const Header = styled.h1`
  font-weight: 600;
  font-size: 1.25em;
`;

const Section = styled.section`
  display: grid;
  grid-gap: 0.5em;
  grid-auto-rows: min-content;
`;

const CustomerDashboardWrapper = styled.article`
  display: grid;
  grid-gap: 1em;
  grid-template-columns: max-content max-content 1fr;
`;

const ProductList = styled.ul``;

export default function CustomerDashboard({
  id,
  nonce,
  products,

  onIdentify,
  onProductPicked,
  onLeave,
}: Props) {
  const handleIdentify = useCallback(
    ({ customerId }) => {
      onIdentify(nonce, customerId);
    },
    [nonce],
  );

  const handleProductPicked = useCallback((p, { resetForm }) => {
    onProductPicked(p.nonce, p.skuId);
    resetForm();
  }, []);

  const handleLeave = useCallback(() => {
    onLeave(nonce);
  }, [onLeave, nonce]);

  return (
    <CustomerDashboardWrapper>
      <CustomerProfilePicture />
      <Section>
        <Header as="h2">
          <I18n id="customer.label" />
        </Header>
        <Value>
          <I18n id="customer.nonce.label" />
          {': '}
          <ValueDetail as="span">{nonce}</ValueDetail>
        </Value>
        {id && (
          <Value>
            <I18n id="customer.id.label" />
            {': '}
            <ValueDetail as="span">{id}</ValueDetail>
          </Value>
        )}
        {!id && (
          <Formik
            initialValues={{
              customerId: id,
            }}
            validationSchema={Yup.object({
              customerId: Yup.string()
                .trim()
                .required(),
            })}
            onSubmit={handleIdentify}
          >
            <SimpleForm>
              <Field name="customerId" component={TextField} />
              <Button type="submit">
                <I18n id="customer.identify.label" />
              </Button>
            </SimpleForm>
          </Formik>
        )}
        <Button onClick={handleLeave}>
          <I18n id="customer.leave.label" />
        </Button>
      </Section>

      <Section>
        <Header as="h3">
          <I18n id="shoppingCart.label" />
        </Header>

        <ProductList>
          {Object.entries(products).map(([skuId, count]) => (
            <Value as="li" key={skuId}>
              {skuId}
              {': '}
              <ValueDetail as="span">{count}</ValueDetail>
            </Value>
          ))}
        </ProductList>

        <Formik
          initialValues={{
            nonce,
            skuId: '',
          }}
          validationSchema={Yup.object({
            nonce: Yup.string()
              .trim()
              .required(),
            skuId: Yup.string()
              .trim()
              .required(),
          })}
          onSubmit={handleProductPicked}
        >
          <SimpleForm>
            <Field
              id="skuId"
              name="skuId"
              placeholder="Producto"
              component={TextField}
            />
            <Button type="submit">
              <I18n id="customer.picked.product.label" />
            </Button>
          </SimpleForm>
        </Formik>
      </Section>
    </CustomerDashboardWrapper>
  );
}
