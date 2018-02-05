import React from 'react';
import { render } from 'react-dom';

const App = () => {
  return (
    <div>
      App component
    </div>
  );
};

render(<App />, document.querySelector('.container'));
