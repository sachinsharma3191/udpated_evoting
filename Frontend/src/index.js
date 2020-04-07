import React,{Suspense} from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Root from './Root';
import Spinner from './UI/Spinner/Spinner';

const app = <Root shouldLog>
  <BrowserRouter>
    <Suspense fallback={<Spinner/>}>
      <App />
    </Suspense>
  </BrowserRouter>
</Root>

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
