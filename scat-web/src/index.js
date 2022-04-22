import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
//import reportWebVitals from './reportWebVitals';
import {BrowserRouter, HashRouter} from 'react-router-dom'
import "@fontsource/mulish";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter baseName={process.env.PUBLIC_URL}>
      <App />
    </HashRouter>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
