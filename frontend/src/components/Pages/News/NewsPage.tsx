import News from './News'
import Headline from './Headline'
import { ThemeProvider } from 'styled-components';
import { Container, CssBaseline, Grid, createTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../Nav/Nav';

const defaultTheme = createTheme();

const NewsPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const paid_customer = localStorage.getItem('auth');
    if (paid_customer && !JSON.parse(paid_customer).subscribed) {
      // navigate('/payment');
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