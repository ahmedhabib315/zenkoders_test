import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import PaymentModal from './PaymentModal';

const tiers = [
  {
    title: 'Basic',
    price: '10',
    description: [
      'News Update every 1 hour',
      'Headlines update every 30 minutes',
      '100 calls Daily limit',
      'Help center access',
      'Email support',
    ]
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '15',
    description: [
      'News Update every 15 minutes',
      'Headlines update every 10 minutes',
      '1000 calls Daily limit',
      'Help center access',
      'Priority email support',
    ]
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      'News Update every 1 minute',
      'Headlines update every 1 minute',
      'No limit hits',
      'Help center access',
      'Phone & email support',
    ]
  },
];

const defaultTheme = createTheme();

const Payment = () => {
  const [open, setOpen] = useState(false);
  const [choosenPackage, setchoosenPackage] = useState({});
  const handleClose = () => setOpen(false);

  const handleOnClick = (el: any) => {
    setchoosenPackage(tiers[el.target.id]);
    setOpen(true);
  }

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />

        {/* Hero unit */}
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Package
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" component="p">
            Get subscribed to the number #1 News Application in the world and Stay tuned with all the latest News.
          </Typography>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((tier, index: number) => (
              // Enterprise card is full width at sm breakpoint
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={tier.title === 'Enterprise' ? 12 : 6}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        mb: 2,
                      }}
                    >
                      <Typography component="h2" variant="h3" color="text.primary">
                        ${tier.price}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        /mo
                      </Typography>
                    </Box>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      id={index.toString()}
                      variant='contained'
                      onClick={handleOnClick}
                    >
                      Get started
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ThemeProvider>

      <PaymentModal open={open} handleClose={handleClose} package={choosenPackage} />
    </>
  );
}

export default React.memo(Payment)