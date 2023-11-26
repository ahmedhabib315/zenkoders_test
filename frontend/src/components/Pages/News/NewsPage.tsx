import News from './News'
import Headline from './Headline'
import { ThemeProvider } from 'styled-components';
import { Container, CssBaseline, Grid, createTheme } from '@mui/material';
import React from 'react';

const defaultTheme = createTheme();

const NewsPage = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container fixed>
        <main>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <News />
            <Headline />
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  )
}

export default React.memo(NewsPage)