import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Grid, TextField } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import Paper from '@mui/material/Paper';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './Checkoutform';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PaymentModal(props: any) {
  // const stripe: any = useStripe();
  const [formData, setformData] = useState(false);

  // const elements: any = useElements();
  const stripePromise = loadStripe('pk_test_51OG3RMIEDOzmC8ikQFzsEKi9eaHbHUpd9zluKjojs7Popl7qtCxptAEpapWka2mqz9W4LE7TPkJ0RQpoJ9tEo5Wu00UVKSbfpi');

  const options: any = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd'
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography component="h1" variant="h5">
                  Payment Form
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    type='text'
                    placeholder="Name on Card"
                    name="name"
                    autoComplete="given-name"
                    autoFocus
                  />
                  <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm formData={formData} />
                  </Elements>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}