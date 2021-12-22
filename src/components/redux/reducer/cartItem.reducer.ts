import * as type from '../action/actionTypes';

export type Item = {
  description: string;
  imageUrl: string;
  price: number;
  totalPrice: number;
  totalItem: number;
  productId: string;
  productName: string;
};

export interface State {
  items: Item[];
  totalAmount: number;
  order: boolean;
}

const initialState: State = {
  items: [],
  totalAmount: 0,
  order: false,
};

const cartItemReducer = (state = initialState, action: any) => {
  // Action add item to cart
  if (action.type === type.ADD_ITEM) {
    const existing = state.items.findIndex((item: Item) => {
      return item.productId === action.item.productId;
    });

    const item: Item = state.items[existing];
    let updateItems: Item[];
    let newTotalAmount: number;

    if (item) {
      const updateItem = {
        ...item,
        totalPrice: item.totalPrice + action.item.totalPrice,
        totalItem: item.totalItem + action.item.totalItem,
      };

      newTotalAmount = state.totalAmount;
      updateItems = [...state.items];
      updateItems[existing] = updateItem;
    } else {
      updateItems = state.items.concat(action.item);
      newTotalAmount = state.totalAmount + 1;
    }

    return {
      items: updateItems,
      totalAmount: newTotalAmount,
      order: false,
    };
  }

  // Action decrease item
  if (action.type === type.DECREMENT) {
    const existingItem = state.items.findIndex((item) => {
      return item.productId === action.id;
    });

    const itemCart: Item = state.items[existingItem];
    let updateItems: Item[];

    if (itemCart) {
      const updateItem = {
        ...itemCart,
        totalItem: itemCart.totalItem - 1,
        totalPrice: itemCart.totalPrice - itemCart.price,
      };

      updateItems = [...state.items];
      updateItems[existingItem] = updateItem;
    } else {
      updateItems = state.items;
    }

    return {
      items: updateItems,
      totalAmount: state.totalAmount,
      order: state.order,
    };
  }

  // Action increase item
  if (action.type === type.INCREMENT) {
    const existingItem = state.items.findIndex((item) => {
      return item.productId === action.id;
    });

    const itemCart: Item = state.items[existingItem];
    let updateItems: Item[];

    if (itemCart) {
      const updateItem = {
        ...itemCart,
        totalItem: itemCart.totalItem + 1,
        totalPrice: itemCart.totalPrice + itemCart.price,
      };

      updateItems = [...state.items];
      updateItems[existingItem] = updateItem;
    } else {
      updateItems = state.items;
    }

    return {
      items: updateItems,
      totalAmount: state.totalAmount,
      order: state.order,
    };
  }

  // Action remove item
  if (action.type === type.REMOVE_ITEM) {
    const existing = state.items.findIndex((item) => {
      return item.productId === action.id;
    });

    let updateItems: Item[];
    let newTotalAmount: number;

    const itemCart = state.items[existing];

    if (itemCart) {
      updateItems = state.items.filter((item) => {
        return item.productId !== action.id;
      });
      newTotalAmount = state.totalAmount - 1;
    } else {
      updateItems = state.items;
      newTotalAmount = state.totalAmount;
    }

    return {
      items: updateItems,
      totalAmount: newTotalAmount,
      order: state.order,
    };
  }

  // Action clear item in cart
  if (action.type === type.CLEAR_CART) {
    return {
      items: [],
      totalAmount: 0,
      order: action.success,
    };
  }

  if (action.type === type.CART_EMPTY) {
    return {
      items: [],
      totalAmount: 0,
      order: false,
    };
  }

  return state;
};

export default cartItemReducer;
