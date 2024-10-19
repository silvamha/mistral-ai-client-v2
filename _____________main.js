// Import the Mistral client
// import { MistralClient } from '@mistralai/mistralai'; 
// import './style.css';
// import javascriptLogo from './javascript.svg';
// import viteLogo from '/vite.svg';
// import { setupCounter } from './counter.js';
// Import Axios for HTTP requests
// import axios from 'axios'; 

document.querySelector('#app').innerHTML = `
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

import axios from 'axios';
import MistralClient from '@mistralai/mistralai';

// Access the API key from environment variables
const apiKey = process.env.VITE_MISTRAL_API_KEY;

// Create a Mistral client instance
const client = new MistralClient(apiKey);

// Make a chat request using Mistral AI
async function chatWithMistral() {
  try {
    const chatResponse = await client.chat({
      model: 'mistral-tiny',
      messages: [
        { role: 'system', content: 'You are a friendly assistant.' },
        { role: 'user', content: 'What is the best French cheese?' },
      ],
      temperature: 0.5,
    });
    console.log('Chat Response:', chatResponse.choices[0].message.content);
  } catch (error) {
    console.error('Error with Mistral API:', error);
  }
}

chatWithMistral();




console.log('hello')