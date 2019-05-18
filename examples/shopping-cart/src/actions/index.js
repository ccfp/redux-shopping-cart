import shop from '../api/shop';
import * as types from '../constants/ActionTypes';

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products
});

export const getAllProducts = () => dispatch => {
  shop.getProducts(products => {
    dispatch(receiveProducts(products));
  });
};

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId
});

const addAllToCartUnsafe = (productId, amount) => ({
  type: types.ADD_ALL_TO_CART,
  productId,
  amount
});

export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId));
  }
};

export const removeFromCart = productId => ({
  type: types.REMOVE_FROM_CART,
  productId
});

export const addAllToCart = productId => (dispatch, getState) => {
  const remaingAmount = getState().products.byId[productId].inventory;
  if (remaingAmount > 0) {
    dispatch(addAllToCartUnsafe(productId, remaingAmount));
  }
};

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState();

  dispatch({
    type: types.CHECKOUT_REQUEST
  });
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    });
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  });
};
