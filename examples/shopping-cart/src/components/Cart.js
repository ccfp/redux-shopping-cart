import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Product from './Product';

const Cart = ({
  products,
  total,
  onCheckoutClicked,
  onRemoveClicked,
  onEmptyCartClicked
}) => {
  const hasProducts = products.length > 0;
  const nodes = hasProducts ? (
    products.map(product => (
      <Fragment key={product.id}>
        <Product
          title={product.title}
          price={product.price}
          quantity={product.quantity}
        />
        <button onClick={() => onRemoveClicked(product.id)}>Remove</button>
      </Fragment>
    ))
  ) : (
    <em>Please add some products to cart.</em>
  );

  return (
    <div>
      <h3>Your Cart</h3>
      <div>{nodes}</div>
      <p>
        Total: &#36;
        {total}
      </p>
      <button
        onClick={onCheckoutClicked}
        disabled={hasProducts ? '' : 'disabled'}
      >
        Checkout
      </button>
      <button
        onClick={onEmptyCartClicked}
        disabled={hasProducts ? '' : 'disabled'}
      >
        Empty cart
      </button>
    </div>
  );
};

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func,
  onRemoveClicked: PropTypes.func,
  onEmptyCartClicked: PropTypes.func
};

export default Cart;
