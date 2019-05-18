import React from 'react';
import ProductsContainer from './ProductsContainer';
import CartContainer from './CartContainer';

const App = () => (
  <div className="App">
    <main>
      <h2>Shopping Cart Example</h2>
      <ProductsContainer />
    </main>
    <CartContainer />
  </div>
);

export default App;
