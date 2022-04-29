import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Qr from './QR';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

window.addEventListener("load", function() {

  let camElement = React.createElement(App, {name: "App"});
  const camContainer = document.getElementById("react-cam");
  ReactDOM.render(camElement, camContainer);

  // var Text = "1234456";
  // let qrElement = React.createElement(Qr("123456"), {name: "Qr"} );
  // const qrContainer = document.getElementById("react-qr");
  // ReactDOM.render(qrElement, qrContainer);
});

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Qr text = "1235"/>
  </React.StrictMode>,
  document.getElementById('react-qr')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
