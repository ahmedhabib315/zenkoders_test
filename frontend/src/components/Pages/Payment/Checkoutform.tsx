import {
  CardElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { Button } from '@mui/material';


const CheckoutForm = ({ formData }: any) => {
  const stripe: any = useStripe();
  const elements: any = useElements();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(':::::hello:::::::');

    const cart = elements.getElement(CardElement);

    const { error, token } = await stripe.createToken(cart);

    if (error) {
      console.log(':::::error:::::::', error);
    } else {
      console.log(':::::::::token:::::::', token)
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

export default CheckoutForm;