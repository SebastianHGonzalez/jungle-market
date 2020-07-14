import React from 'react';
import styled from 'styled-components';

import { Title, SubTitle } from 'components/common/typography';
import I18n from 'components/common/i18n';
import {
  Stepper, Step, StepIcon, StepContent, StepTitle, StepSubTitle, StepBody,
} from 'components/common/stepper';
import FormattedDate from 'components/common/format/FormattedDate';

import useShoppingCart from 'hooks/useShoppingCart';

import { ShoppingCart as ShoppingCartType } from 'model';

import ShoppingCartState from './ShoppingCartState';

interface Props extends React.Props<never> {
  id: string;
}

const ProductsList = styled.ul``;
const ProductsListItem = styled.li``;

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
  align-items: start;
`;

const Section = styled.section`
  display: grid;
  grid-gap: 1em;
`;

const StepperSection = styled(Section)`
  position: relative;
  overflow: hidden;
`;

const StepperFade = styled.div`
  box-shadow: inset 0px 0px 32px 32px rgba(255,255,255,1);
  position: absolute;
  top: -100px;
  bottom: 0;
  left: -100px;
  right: -100px;
  pointer-events: none;
`;

export default function ShoppingCart({
  id,
}: Props) {
  const { data, loading, error } = useShoppingCart(id);
  const {
    branch,
    customer,
    products,
    state,
    history,
  } = data?.shoppingCart?.shoppingCart ?? {} as ShoppingCartType;

  return (
    <>
      <Title>
        <I18n id="shoppingCart.label" />
        {': '}
        {state && <ShoppingCartState state={state} />}
      </Title>
      {loading && 'loading'}
      {error && 'error'}

      <Layout>
        <Section>
          <div>
            <SubTitle>
              <I18n id="shoppingCart.branch.label" />
            </SubTitle>
            {branch && (
              <>
                <I18n id="shoppingCart.branch.cname.label" />
                {': '}
                {branch.cname}
              </>
            )}
          </div>

          <div>
            <SubTitle>
              <I18n id="shoppingCart.customer.label" />
            </SubTitle>
            {customer && (
              <>
                <I18n id="shoppingCart.customer.fullName.label" />
                {': '}
                {customer.fullName ?? <I18n id="shoppingCart.customer.unidentified.label" />}
              </>
            )}
          </div>

          <div>
            <SubTitle>
              <I18n id="shoppingCart.products.label" />
            </SubTitle>
            <ProductsList>
              {products?.map(({ count, sku: { id: skuId, shortName } }) => (
                <ProductsListItem key={skuId}>
                  {shortName}
                  {': '}
                  {count}
                </ProductsListItem>
              ))}
            </ProductsList>
          </div>
        </Section>
        <StepperSection>

          <Stepper
            style={{

  maxHeight: "50vh",
  overflow: "hidden auto",
            }}
          >
            {history?.concat().reverse().map(({ createdAt, name, payload }) => (
              <Step key={createdAt}>
                <StepIcon />
                <StepContent>
                  <StepTitle>
                    <I18n id={`shoppingCart.history.${name}.label`} />
                  </StepTitle>
                  <StepSubTitle>
                    <FormattedDate value={createdAt} />
                    {' - '}
                    <FormattedDate
                      value={createdAt}
                      options={{
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      }}
                    />
                  </StepSubTitle>
                  <StepBody>
                    {payload?.sku?.shortName}
                    {payload?.customer?.fullName}
                  </StepBody>
                </StepContent>
              </Step>
            ))}
          </Stepper>

          <StepperFade />
        </StepperSection>
      </Layout>
    </>
  );
}
