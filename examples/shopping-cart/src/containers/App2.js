import React, { useState } from 'react';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1;
//     case 'DECREMENT':
//       return state - 1;
//     default:
//       return state;
//   }
// };

function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);
  const dispatch = action => {
    const newState = reducer(state, action);
    setState(newState);
  };
  return [state, dispatch];
}

const reducer = (state, message) => {
  switch (message) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

export default function App() {
  const [state, setState] = useState(0);
  const dispatch = message => {
    const newState = reducer(state, message);
    setState(newState);
  };
  return (
    <>
      <h1>Hello from App2</h1>

      <h2>{state}</h2>
      <button onClick={() => dispatch('INCREMENT')}>+</button>
      <button onClick={() => dispatch('DECREMENT')}>-</button>
    </>
  );
}
