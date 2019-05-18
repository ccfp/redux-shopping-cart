import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkout, removeFromCart, emptyCart } from '../actions';
import { getTotal, getCartProducts } from '../reducers';
import Cart from '../components/Cart';

const CartContainer = ({
  products,
  total,
  checkout,
  emptyCart,
  removeFromCart
}) => (
  <footer>
    <Cart
      products={products}
      total={total}
      onCheckoutClicked={() => checkout(products)}
      onEmptyCartClicked={() => {
        console.log('\n\n\nPRODUCTS');
        console.log(products);
        emptyCart(products);
      }}
      onRemoveClicked={removeFromCart}
    />
  </footer>
);

CartContainer.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired,
  emptyCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: getCartProducts(state),
  total: getTotal(state)
});

export default connect(
  mapStateToProps,
  { checkout, removeFromCart, emptyCart }
)(CartContainer);
