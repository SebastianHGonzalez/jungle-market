import React, { useCallback } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import Label from 'components/common/input/Label';
import I18n from 'components/common/i18n';
import TextField from 'components/common/formik/TextField';
import Button from 'components/common/input/Button';
import useCustomerPickedProduct from 'hooks/useCustomerPickedProduct';

type Props = React.Props<any>;

export default function EmulatorDashboard(props: Props) {
  const [execCustomerPickedProduct, { loading }] = useCustomerPickedProduct();
  const addProductToShoppingCart = useCallback(
    (variables) => execCustomerPickedProduct({ variables }),
    [execCustomerPickedProduct],
  );
  return (
    <div>
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
    </div>
  );
}
