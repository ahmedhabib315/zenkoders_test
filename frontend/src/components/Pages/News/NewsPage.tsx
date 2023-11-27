import News from './News'
import Headline from './Headline'
import { ThemeProvider } from 'styled-components';
import { Container, CssBaseline, Grid, createTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../Nav/Nav';
import { checkArrayLength, getValueFromLocalStorage } from '../../../helpers/common-functions';

const defaultTheme = createTheme();

const NewsPage = () => {
  const navigate = useNavigate();

  //Check if user is subscribed then let them see the news page else redirect to payment page for subscription
  useEffect(() => {
    const subscribedCustomer = getValueFromLocalStorage('auth');
    if (subscribedCustomer && checkArrayLength(subscribedCustomer.user_details) && !subscribedCustomer.user_details[0].is_subscribed) {
      navigate('/payment');
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container fixed>
        <Nav />
        <main>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <News />
            <Headline />
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  )
}

export default React.memo(NewsPage)