// Import the Mistral client
// import { MistralClient } from '@mistralai/mistralai'; 
// import './style.css';
// import javascriptLogo from './javascript.svg';
// import viteLogo from '/vite.svg';
// import { setupCounter } from './counter.js';
// Import Axios for HTTP requests
// import axios from 'axios'; 

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `;

// Example of using Axios to make a GET request
// axios.get('https://restcountries.com/v3.1/name/canada')
//   .then(response => {
//     console.log('API Data:', response.data);
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });

// setupCounter(document.querySelector('#counter'));

import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';
import axios from 'axios'; // Import Axios for HTTP requests
import { MistralClient } from '@mistralai/mistralai'; // Import the MistralClient

// Fetch the API key from environment variables
const apiKey = process.env.VITE_MISTRAL_API_KEY;

// Create a new Mistral client instance
const client = new MistralClient(apiKey);

// Use Axios to demonstrate a REST API call
axios.get('https://restcountries.com/v3.1/name/canada')
  .then(response => {
    console.log('REST API Data:', response.data);
  })
  .catch(error => {
    console.error('Error fetching REST data:', error);
  });

// Example of using MistralAI for a chat request
const getMistralResponse = async () => {
  try {
    const chatResponse = await client.chat({
      model: 'mistral-tiny', // replace with appropriate model
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'What is the best French cheese?' }
      ],
      temperature: 0.7
    });

    console.log('MistralAI Chat Response:', chatResponse.choices[0].message.content);
  } catch (error) {
    console.error('Error fetching Mistral response:', error);
  }
};

getMistralResponse();

// Existing Vite UI Setup
document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite with Mistral!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector('#counter'));

console.log('Hello World!');