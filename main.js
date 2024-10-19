import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';
import axios from 'axios'; // Import Axios for HTTP requests

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

// Example of using Axios to make a GET request
axios.get('https://restcountries.com/v3.1/name/canada')
  .then(response => {
    console.log('API Data:', response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

setupCounter(document.querySelector('#counter'));
