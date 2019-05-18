import {
  ADD_TO_CART,
  ADD_ALL_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE,
  REMOVE_FROM_CART,
  EMPTY_CART
} from '../constants/ActionTypes';

const initialState = {
  addedIds: [],
  quantityById: {}
};

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
    case ADD_ALL_TO_CART:
      if (state.includes(action.productId)) {
        return state;
      }
      return [...state, action.productId];
    case REMOVE_FROM_CART:
      if (action.remainingAmount === 0) {
        return state.filter(productId => productId !== action.productId);
      }
      return state;
    default:
      return state;
  }
};

const quantityById = (state = initialState.quantityById, action) => {
  const { productId, amount } = action;
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        [productId]: (state[productId] || 0) + 1
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        [productId]: state[productId] - 1
      };
    case ADD_ALL_TO_CART:
      return {
        ...state,
        [productId]: (state[productId] || 0) + amount
      };
    default:
      return state;
  }
};

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0;

export const getAddedIds = state => state.addedIds;

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
    case EMPTY_CART:
      return initialState;
    case CHECKOUT_FAILURE:
      return action.cart;
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      };
  }
};

export default cart;
