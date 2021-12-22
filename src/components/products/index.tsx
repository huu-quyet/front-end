import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import * as type from '../redux/action/actionTypes';
import { cssTransition, Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../loading';
import { Item, State } from '../redux/reducer/cartItem.reducer';

const styled = makeStyles({
  container: {
    marginTop: '2rem',
    height: '85vh',
    maxHeight: '85vh',
  },

  detailImg: {
    marginRight: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2rem',
    height: '100%',
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 10px 0 #ccc',

    '& img': {
      width: '50%',
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },
  },

  listItems: {
    borderRadius: '8px',
    maxHeight: '85vh',
    overflowY: 'scroll',
  },

  box: {
    display: 'flex',
    padding: '0.5rem',
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 10px 0 #ccc',

    '&:not(:last-child)': {
      marginBottom: '1rem',
    },
  },

  img: {
    width: '30%',
    display: 'flex',
    alignItems: 'center',
    marginRight: '1rem',

    '& img': {
      width: '100%',
    },
  },
  price: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    width: '20%',
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
  toast: {
    background: '#198754',
    color: 'white',
    width: '15rem',
    textAlign: 'center',
  },

  toastOrder: {
    background: '#198754',
    color: 'white',
    width: '17rem',
    textAlign: 'center',
  },
});

type ItemState = {
  description: string;
  imageUrl: string;
  price: number;
  productId: string;
  productName: string;
};

const initialItem: ItemState[] = [
  {
    description: '',
    imageUrl: '',
    price: 0,
    productId: '',
    productName: '',
  },
];

const Products: React.FC = () => {
  const classes = styled();
  const [items, setItems] = useState(initialItem);
  const [idItemDetail, setIdItemDetail] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [numItem, setNumItem] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state: State) => state);

  useEffect(() => {
    (async () => {
      const response = await axios.get('http://localhost:4000/api/products');

      if (response.statusText !== 'OK') return;

      setItems(response.data);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (cart.order) {
      toast.success('👏  Thanks you for purchased!!!', {
        position: 'top-center',
        icon: false,
        className: classes.toastOrder,
      });
      dispatch({ type: type.CART_EMPTY });
    }
  }, [cart.order]);

  const onViewDetailHandler = (event: any) => {
    setIdItemDetail(event.currentTarget.dataset.id - 1);
    setNumItem(1);
  };

  const onDecrementItem = () => {
    if (numItem === 1) {
      return;
    }
    setNumItem(numItem - 1);
  };

  const onIncrementItem = () => {
    setNumItem(numItem + 1);
  };

  const onAddItem = () => {
    const item = {
      description: items[idItemDetail].description,
      imageUrl: items[idItemDetail].imageUrl,
      price: items[idItemDetail].price,
      totalPrice: Number((items[idItemDetail].price * numItem).toFixed(2)),
      totalItem: numItem,
      productId: items[idItemDetail].productId,
      productName: items[idItemDetail].productName,
    };

    dispatch({ type: type.ADD_ITEM, item: item });
    toast.success('👏  Added Successfully!!!', {
      position: 'bottom-left',
      icon: false,
      className: classes.toast,
    });
  };

  const classButtonIncre = numItem === 1 ? classes['hidden'] : classes['show'];
  const classButtonDecre = numItem === 99 ? classes['hidden'] : classes['show'];

  return (
    <React.Fragment>
      <Container>
        {!isLoading && (
          <Grid className={classes.container} container columnSpacing={3}>
            <Grid item xs={12} md={7}>
              <Box className={classes.detailImg}>
                <Box sx={{ flexGrow: 1 }}>
                  <img src={`${items[idItemDetail].imageUrl}`} />
                </Box>
                <Box>
                  <Typography fontWeight="700" fontSize="3rem">
                    {items[idItemDetail].productName}
                  </Typography>
                  <Typography mb="2rem">
                    {items[idItemDetail].description}
                  </Typography>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Box className={classes.button}>
                      <button
                        className={classButtonIncre}
                        onClick={onDecrementItem}
                      >
                        -
                      </button>
                      <Typography m="0 1rem">{numItem}</Typography>
                      <button
                        className={classButtonDecre}
                        onClick={onIncrementItem}
                      >
                        +
                      </button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography mr="1rem" fontWeight="700" fontSize="1.5rem">
                        ${(items[idItemDetail].price * numItem).toFixed(2)}
                      </Typography>
                      <Button
                        sx={{ textTransform: 'capitalize' }}
                        color="primary"
                        variant="contained"
                        startIcon={<ShoppingCartIcon />}
                        onClick={onAddItem}
                      >
                        Add to cart
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid className={classes.listItems} item xs={12} md={5}>
              {items.map((item: ItemState) => (
                <Box key={item.productId} className={classes.box}>
                  <Box className={classes.img}>
                    <img src={item.imageUrl} />
                  </Box>
                  <Box sx={{ width: '60%' }}>
                    <Typography fontWeight="700" fontSize="1.5rem">
                      {item.productName}
                    </Typography>
                    <Typography m="0.6rem 0">{item.description}</Typography>
                    <Box className={classes.price}>
                      <Typography fontWeight="700" fontSize="1.5rem">
                        ${item.price}
                      </Typography>
                      <Typography
                        onClick={onViewDetailHandler}
                        data-id={item.productId}
                        sx={{ cursor: 'pointer' }}
                        color="blue"
                      >
                        Details
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Grid>
          </Grid>
        )}

        <ToastContainer
          autoClose={3000}
          pauseOnFocusLoss={false}
          closeButton={false}
        />
      </Container>
      {isLoading && <Loading />}
    </React.Fragment>
  );
};

export default Products;
