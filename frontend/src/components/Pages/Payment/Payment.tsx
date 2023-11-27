import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { checkArrayLength, getValueFromLocalStorage, removeValueFromLocalStorage } from '../../../helpers/common-functions';
import { getPackages } from '../../../actions/payment';

const defaultTheme = createTheme();

const Payment = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [packages, setpackages] = useState([]);
  const [chosenPackage, setchosenPackage] = useState({});
  const handleClose = () => setOpen(false);

  //Get Packages on load
  useEffect(() => {
    //Check if user is already subscribed then redirect to news page
    const subscribedCustomer = getValueFromLocalStorage('auth');
    if (subscribedCustomer && checkArrayLength(subscribedCustomer.user_details) && subscribedCustomer.user_details[0].is_subscribed) {
      navigate('/news');
    }
    else {
      const fetchData = async () => {
        const res: any = await getPackages(subscribedCustomer)
          .then((res) => res)
        if (res.code == 401) {
          removeValueFromLocalStorage('auth');
          navigate('/login');
        }
        else {
          setpackages(res.data);
        }
      }
      fetchData();
    }
  }, []);

  //Set Chosen Package detail in variable for Payment Modal and open Payment Modal
  const handleOnClick = (el: any) => {
    setchosenPackage(packages[el.target.id]);
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
            Packages
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" component="p">
            Get subscribed to the number #1 News Application in the world and Stay tuned with all the latest News.
          </Typography>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {packages.map((tier: any, index: number) => (
              // Enterprise card is full width at sm breakpoint
              <Grid
                item
                key={tier.package_name}
                xs={12}
                sm={tier.package_name === 'Enterprise' ? 12 : 6}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={tier.package_name}
                    subheader={tier.package_name == 'Pro' ? 'Most Popular' : ''}
                    titleTypographyProps={{ align: 'center' }}
                    action={tier.package_name === 'Pro' ? <StarIcon /> : null}
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
                        ${tier.amount}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        /mo
                      </Typography>
                    </Box>
                    <ul>
                      {tier.package_desc.map((line: any) => (
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

      <PaymentModal open={open} handleClose={handleClose} package={chosenPackage} />
    </>
  );
}

export default React.memo(Payment)