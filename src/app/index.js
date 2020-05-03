import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './components/Routes';

import { apiSetup } from '~config/api';
import store from '~redux/store';

function App() {
  useEffect(() => {
    apiSetup(store.dispatch);
  }, []);

  return (
    <Provider store={store}>
      <Routes />
      <ToastContainer />
    </Provider>
  );
}

export default App;
