import React from 'react';
import AutoComplete from './AutoComplete';

const App = () => {
  const suggestions = ['White', 'Black', 'Green', 'Blue', 'Yellow', 'Red'];
  return (
    <div className="App">
      <AutoComplete suggestions={suggestions} />
    </div>
  );
};

export default App;
