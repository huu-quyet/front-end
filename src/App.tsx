import { Container } from '@mui/material';
import {
  BrowserRouter,
  Route,
  Switch,
  NavLink,
  Link,
  Redirect,
} from 'react-router-dom';
import { Typography } from '@mui/material';
import Coming from './components/ignore/index';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from '@mui/system';
import Products from './components/products/index';
import Checkout from './components/checkout/index';
import { useSelector } from 'react-redux';
import { State } from './components/redux/reducer/cartItem.reducer';

const theme = createTheme({
  typography: {
    fontFamily: 'Fira Sans, sans-serif',
  },
});

const styled = makeStyles({
  nav: {
    background: 'white',
    boxShadow: '1px 0 10px 1px #ccc',

    '& p': {
      display: 'inline',
    },
  },

  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  link: {
    display: 'inline',
    '& a': {
      color: 'black',
      fontWeight: 500,
      marginRight: '1rem',
      display: 'inline',
      textDecoration: 'none',
      opacity: '0.6',
    },
  },

  cartItem: {
    color: 'white',
    background: 'red',
    textDecoration: 'none',
    width: '1.6rem',
    height: '1.6rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    position: 'absolute',
    top: '-50%',
    right: '-20%',
    transform: 'translate(20%,50%)',
  },

  active: {
    opacity: '1 !important',
    borderBottom: '3px solid #1976d2',
  },
});

function App() {
  const classes = styled();
  const cartItem = useSelector((state: State) => state.totalAmount);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Box className={classes.nav}>
          <Container>
            <Box className={classes.container}>
              <Box className={classes.link} position="static">
                <NavLink activeClassName={classes.active} to="/home">
                  Home
                </NavLink>
                <NavLink activeClassName={classes.active} to="/products">
                  Products
                </NavLink>
                <NavLink activeClassName={classes.active} to="/reviews">
                  Reviews
                </NavLink>
              </Box>

              <Typography
                sx={{
                  fontSize: '1.6rem',
                  color: '#1976d2',
                  fontWeight: '900',
                  display: 'inline',
                  margin: '0.5rem 0',
                  width: '20rem',
                }}
                component="h2"
              >
                Beauty.bd
              </Typography>
              <Box position="relative">
                <Link to="/checkout">
                  <ShoppingCartIcon
                    sx={{ fontSize: '2.2rem', cursor: 'pointer' }}
                    color="primary"
                  />
                  {cartItem > 0 && (
                    <Box className={classes.cartItem}>{cartItem}</Box>
                  )}
                </Link>
              </Box>
            </Box>
          </Container>
        </Box>

        <Switch>
          <Route exact path="/">
            <Redirect to="/products" />
          </Route>
          <Route exact path="/home">
            <Coming />
          </Route>
          <Route exact path="/reviews">
            <Coming />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
