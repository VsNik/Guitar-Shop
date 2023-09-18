import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import {ToastContainer} from 'react-toastify';
import {App} from "./app/app";
import {store} from "./app/store";
import {checkAuth} from './app/store/auth/api-actions';
import {ScrollTop} from './app/component/scrol-top';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/style.css';

store.dispatch(checkAuth());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollTop/>
        <ToastContainer/>
        <App/>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
