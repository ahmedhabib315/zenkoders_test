import {
  CardElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { Alert, Button } from '@mui/material';
import React, { useState } from 'react';
import { Stripe, StripeElements } from '@stripe/stripe-js';
import { getValueFromLocalStorage, setValueInLocalStorage } from '../../../helpers/common-functions';
import { payNow } from '../../../actions/payment';
import { useNavigate } from 'react-router-dom';


const CheckoutForm = ({ formData }: any) => {
  const stripe: Stripe | null = useStripe();
  const elements: StripeElements | null = useElements();
  const [status, setstatus]: any = useState({});
  const [disabled, setdisabled] = useState(false);
  const navigate = useNavigate();

  //Handle Submit for Stripe Payment
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setdisabled(true);
    setstatus({});
    if (elements) {
      const cart = elements.getElement(CardElement);
      if (stripe && cart) {
        const { error, token } = await stripe.createToken(cart);
        if (error) {
          setstatus({ msg: error.message, code: 500 })
        } else {
          const subscribedCustomer = getValueFromLocalStorage('auth');
          const res: any = await payNow(subscribedCustomer, token.id, formData.package_name)

          if (res.code == 200) {
            subscribedCustomer.user_details[0].is_subscribed = true;
            setValueInLocalStorage('auth', subscribedCustomer);
            setstatus({ msg: 'Subscribed Successfully', code: 200 })
            setTimeout(() => {
              navigate('/news')
            }, 2000);
          }

        }
      }
    }
    setdisabled(false);

  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button
        type="submit"
        fullWidth
        disabled={disabled}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Pay
      </Button>
      {status.code ? status.code !== 200 ?
        (<Alert variant="filled" severity="error">
          {status.msg}
        </Alert>) : (<Alert variant="filled" severity="success">
          {status.msg}
        </Alert>) : (<></>)}
    </form>

  );
};

export default React.memo(CheckoutForm);