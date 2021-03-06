import { combineReducers } from 'redux';
import {
  RECEIVE_PRODUCTS,
  ADD_TO_CART,
  ADD_ALL_TO_CART,
  REMOVE_FROM_CART,
  EMPTY_CART
} from '../constants/ActionTypes';

const products = (state, action) => {
  switch (action.type) {
    case REMOVE_FROM_CART:
      return {
        ...state,
        inventory: state.inventory + 1
      };
    case ADD_TO_CART:
      return {
        ...state,
        inventory: state.inventory - 1
      };
    case ADD_ALL_TO_CART:
      return {
        ...state,
        inventory: 0
      };

    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          obj[product.id] = product;
          return obj;
        }, {})
      };

    case EMPTY_CART:
      return {
        ...state,
        ...Object.entries(action.cart.quantityById).reduce((obj, [id, amt]) => {
          obj[id] = {
            ...state[id],
            inventory: (state[id].inventory || 0) + amt
          };
          return obj;
        }, {})
      };

    default:
      const { productId } = action;
      if (productId) {
        return {
          ...state,
          [productId]: products(state[productId], action)
        };
      }
      return state;
  }
};

const visibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products.map(product => product.id);
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  visibleIds
});

export const getProduct = (state, id) => state.byId[id];

export const getVisibleProducts = state =>
  state.visibleIds.map(id => getProduct(state, id));
