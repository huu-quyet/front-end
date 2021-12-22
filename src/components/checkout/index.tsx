import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Item, State } from '../redux/reducer/cartItem.reducer';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import * as type from '../redux/action/actionTypes';
import { Link, useHistory } from 'react-router-dom';

const styled = makeStyles({
  title: {
    marginTop: '1rem',
    padding: '1rem 1rem',
    borderRadius: '6px',
    textAlign: 'center',
    fontWeight: '600',
    background: 'white',
    boxShadow: '0 6px 10px 0 #ccc',
  },

  text: {
    textAlign: 'center',
    margin: '3rem 0',
    fontSize: '2rem',
    fontWeight: '700',
  },

  container: {
    background: 'white',
    borderRadius: '6px',
    padding: '1rem 1rem',
    margin: '2rem 0 1rem 0',
  },

  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  itemDescription: {
    background: 'white',
    borderRadius: '6px',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '2rem 0',
    position: 'relative',

    '& img': {
      width: '25%',
      position: 'absolute',
      top: '50%',
      transform: 'translate(0, -50%)',
    },
  },

  itemTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& p': {
      fontSize: '1.6rem',
      fontWeight: '700',
    },

    '& svg': {
      color: 'red',
    },
  },

  itemPrice: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& > p': {
      fontSize: '2rem',
      fontWeight: '700',
    },
  },

  button: {
    width: '30%',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5e7eb',

    '& button': {
      cursor: 'pointer',
      fontSize: '2rem',
      border: 'none',
      backgroundColor: '#e5e7eb',
    },
  },

  hidden: {
    color: '#ccc',
  },

  show: {
    color: '#ff7300',
  },
});

const shippingCost = 10;

const Checkout: React.FC = () => {
  const classes = styled();
  const cartItems = useSelector((state: State) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const onDecrementItem = (event: any) => {
    const id = event.currentTarget.dataset.id;
    dispatch({ type: type.DECREMENT, id: id });
    const currentItem = cartItems.items.filter((item: Item) => {
      return item.productId === id;
    });

    if (currentItem[0].totalItem - 1 === 0) {
      dispatch({ type: type.REMOVE_ITEM, id: id });
    }
  };

  const onIncrementItem = (event: any) => {
    dispatch({ type: type.INCREMENT, id: event.currentTarget.dataset.id });
  };

  const onRemoveItem = (event: any) => {
    dispatch({ type: type.REMOVE_ITEM, id: event.currentTarget.dataset.id });
  };

  const onCheckout = () => {
    if (window.confirm('Do you want to purchase ?')) {
      const productInOrder = cartItems.items.reduce((acc: any, cur: Item) => {
        const order = {
          productId: cur.productId,
          quantity: cur.totalItem,
        };
        return acc.concat(order);
      }, []);
      dispatch({ type: type.CHECKOUT, payload: productInOrder });
    }
  };

  if (cartItems.order) {
    setTimeout(() => {
      history.push('/products');
    }, 100);
  }

  const subtotal = Number(
    cartItems.items
      .reduce((acc: number, cur: Item) => {
        return acc + cur.totalPrice;
      }, 0)
      .toFixed(2)
  );

  return (
    <Container>
      <Box component="p" className={classes.title}>
        My Shopping Cart
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {!cartItems.totalAmount && (
            <Box component="p" className={classes.text}>
              You have no product in cart
            </Box>
          )}
          {cartItems.items.map((item: Item, index: number) => {
            return (
              <Box key={index} className={classes.itemDescription}>
                <Box>
                  <img src={item.imageUrl} alt={item.productName}></img>
                </Box>
                <Box sx={{ width: '70%', padding: '1rem 0' }}>
                  <Box className={classes.itemTitle}>
                    <Typography>{item.productName}</Typography>
                    <DeleteForeverIcon
                      data-id={item.productId}
                      onClick={onRemoveItem}
                      sx={{ cursor: 'pointer' }}
                    />
                  </Box>
                  <Typography m="1rem 0">{item.description}</Typography>
                  <Box className={classes.itemPrice}>
                    <Box className={classes.button}>
                      <button
                        onClick={onDecrementItem}
                        data-id={item.productId}
                        disabled={item.totalItem > 0 ? false : true}
                        className={
                          item.totalItem === 0 ? classes.hidden : classes.show
                        }
                      >
                        -
                      </button>
                      <Typography m="0 2rem">{item.totalItem}</Typography>
                      <button
                        data-id={item.productId}
                        onClick={onIncrementItem}
                        disabled={item.totalItem < 99 ? false : true}
                        className={classes.show}
                      >
                        +
                      </button>
                    </Box>
                    <Typography>${item.totalPrice.toFixed(2)}</Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Grid>
        <Grid item xs={12} md={4} sx={{ '& a': { textDecoration: 'none' } }}>
          <Box className={classes.container}>
            <Typography sx={{ fontWeight: '600', marginBottom: '1rem' }}>
              Order Info
            </Typography>
            <Box className={classes.content}>
              <Typography>Subtotal:</Typography>
              <Typography>${subtotal}</Typography>
            </Box>
            <Box className={classes.content}>
              <Typography>Shipping Cost:</Typography>
              <Typography>${shippingCost}</Typography>
            </Box>
            <Box className={classes.content}>
              <Typography
                sx={{ fontWeight: '700', fontSize: '2rem', marginTop: '1rem' }}
              >
                Total:
              </Typography>
              <Typography
                sx={{ fontWeight: '700', fontSize: '2rem', marginTop: '1rem' }}
              >
                ${subtotal === 0 ? 0 : (subtotal + shippingCost).toFixed(2)}
              </Typography>
            </Box>
          </Box>
          <Button
            color="primary"
            variant="contained"
            sx={{
              width: '100%',
              marginTop: '1rem',
              textTransform: 'capitalize',
            }}
            disabled={!cartItems.totalAmount ? true : false}
            onClick={onCheckout}
          >
            Checkout
          </Button>
          <Link to="/products">
            <Button
              color="primary"
              variant="outlined"
              sx={{
                width: '100%',
                marginTop: '1rem',
                textTransform: 'capitalize',
                marginBottom: '2rem',
              }}
            >
              Continue shopping
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
