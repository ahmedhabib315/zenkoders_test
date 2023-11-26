import {
  CardElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { Button } from '@mui/material';
import React from 'react';
import { Stripe, StripeElements } from '@stripe/stripe-js';


const CheckoutForm = ({ formData }: any) => {
  const stripe: Stripe | null = useStripe();
  const elements: StripeElements | null = useElements();

  //Handle Submit for Stripe Payment
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (elements) {
      const cart = elements.getElement(CardElement);
      if (stripe && cart) {
        const { error, token } = await stripe.createToken(cart);
        if (error) {
          console.log(':::::error:::::::', error);
        } else {
          console.log(':::::::::token:::::::', token)
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Pay
      </Button>
    </form>

  );
};

export default React.memo(CheckoutForm);