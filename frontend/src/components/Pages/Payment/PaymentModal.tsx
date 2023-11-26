import React from 'react';
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
import { paymentModalStyle } from '../../../constants/constants';
import { PaymentModalProps } from '../../../constants/interfaces';

const PaymentModal = (props: PaymentModalProps) => {
  const formData = props.package;
  const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);
  
  const options: any = {
    mode: 'payment',
    amount: parseFloat(formData.price),
    currency: 'usd'
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
          <Box sx={paymentModalStyle}>
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

export default React.memo(PaymentModal)