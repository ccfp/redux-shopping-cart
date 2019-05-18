import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';

const ProductItem = ({
  product,
  onAddToCartClicked,
  onAddAllToCartClicked
}) => (
  <div style={{ marginBottom: 20 }}>
    <Product
      title={product.title}
      price={product.price}
      quantity={product.inventory}
    />
    <button
      onClick={onAddToCartClicked}
      disabled={product.inventory > 0 ? '' : 'disabled'}
    >
      {product.inventory > 0 ? 'Add to cart' : 'Sold Out'}
    </button>
    <button
      onClick={onAddAllToCartClicked}
      disabled={product.inventory > 0 ? '' : 'disabled'}
    >
      {product.inventory > 0 ? 'Add all to cart' : 'Sold Out'}
    </button>
  </div>
);

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  }).isRequired,
  onAddAllToCartClicked: PropTypes.func.isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
};

export default ProductItem;
