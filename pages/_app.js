import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/pokemon';
import PokemonList from '../components/List';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <PokemonList />
      </div>
    </Provider>
  );
};

export default App;
