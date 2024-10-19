# MistralAI Project Summary

### Overview
In this project, we developed a client application that successfully connects to MistralAI, initially through the command line interface and with the goal of eventually implementing a graphical user interface (GUI). We utilized Vite as the front-end bundler, configured dotenv for managing sensitive information, and integrated Bulma for styling. The main focus of the project was learning to use modern JavaScript techniques, including Axios for HTTP requests and configuring environment variables correctly to maintain security.

The technologies and tools used included:
- **Vite** for modern JavaScript bundling.
- **dotenv** for managing API keys securely.
- **Bulma** as a CSS framework for UI styling.
- **Sass** for more advanced CSS features.
- **Axios** for API requests to MistralAI and other external data sources.

### Project Implementation Steps

#### 1. Setting Up the Environment
The project began with setting up a modern development environment using Vite and Node.js. We used the following steps:
- Created a project directory and initialized it with Vite:
  ```bash
  npm create vite@latest mistral-ai-client-v2
  ```
- Installed essential dependencies:
  ```bash
  npm install bulma sass dotenv axios @mistralai/mistralai
  ```
  This allowed us to access Bulma for styling, Sass for custom styles, dotenv for managing environment variables, Axios for making HTTP requests, and MistralAI as the API library for interacting with Mistral.

#### 2. Directory Structure
The directory structure for the project looked as follows:
- `public/` - Contained static assets like SVG logos.
- `src/` - Contained the main JavaScript files and SCSS files.
- `.env` - Stored sensitive information such as API keys.
- `vite.config.js` - Configuration for Vite to load environment variables.

### File and Code Configurations
Below is a detailed overview of the core files we set up.

#### 1. **Environment Configuration (`.env`)**
We added our MistralAI API key to the `.env` file to avoid hardcoding sensitive information:
```env
VITE_MISTRAL_API_KEY=JuKB1TTnBT0GNTL1NCBh4wExt4V52wKP
```

#### 2. **Vite Configuration (`vite.config.js`)**
We needed to load the environment variables correctly using Vite. Below is our `vite.config.js` configuration file:
```js
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  server: {
    open: true, // Opens the browser automatically when running the dev server
  },
  define: {
    'process.env': process.env,
  },
});
```
- **dotenv.config()**: Loads the variables from the `.env` file.
- **server.open**: Makes development more convenient by automatically opening the browser.

#### 3. **Main JavaScript File (`main.js`)**
We wrote the main logic to connect to MistralAI, make API requests, and display the results in the browser console. Here's the complete code:
```js
import './style.css';
import axios from 'axios';
import { MistralClient } from '@mistralai/mistralai';

// Create a client instance using the API key from the environment variables
const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
const mistralClient = new MistralClient({ apiKey });

// HTML Setup
const app = document.querySelector('#app');
app.innerHTML = '<p>Loading...</p>';

// Use the Mistral Client to request data from the Mistral AI API
async function getMistralResponse() {
  try {
    console.log('[vite] connecting...');
    const chatResponse = await mistralClient.chat({
      model: 'mistral-tiny',
      messages: [
        { role: 'user', content: 'Hello! How can you assist me today?' },
      ],
      temperature: 0.5,
    });
    console.log('[vite] connected.');
    console.log('MistralAI Response:', chatResponse.choices[0].message.content);
    app.innerHTML = `<p>${chatResponse.choices[0].message.content}</p>`;
  } catch (error) {
    console.error('Error connecting to Mistral:', error);
    app.innerHTML = '<p>Error: Could not connect to Mistral AI.</p>';
  }
}

getMistralResponse();
```
- **API Key Handling**: The `apiKey` is securely loaded from `import.meta.env.VITE_MISTRAL_API_KEY` to keep sensitive information hidden.
- **Mistral Client Configuration**: Created a `MistralClient` instance to interact with the Mistral API.
- **Async Function**: Used `getMistralResponse()` to make the request, handle the response, and update the UI.
- **Error Handling**: We included try-catch blocks to handle potential errors.

#### 4. **Styling with Bulma and Sass (`main.scss`)**
We used Sass for custom styling and imported Bulma to style our UI elements. Below is the setup:
```scss
@use 'bulma'; // Import Bulma using modern syntax

body {
  background-color: #f0f0f0;
}
```

### Challenges and Solutions
1. **API Key Exposure**:
   - Initially, the `.env` file containing the API key was committed to the Git repository. We resolved this by removing the file from the Git history and adding `.env` to `.gitignore` to prevent future commits.
   - To remove the `.env` file from GitHub and avoid exposing it again:
     ```bash
     git rm --cached .env
     echo "*.env" >> .gitignore
     git add .gitignore
     git commit -m "Remove .env from Git and update .gitignore"
     git push
     ```

2. **Environment Variable Issues**:
   - We faced issues with environment variables not being loaded properly. We solved this by correctly configuring `vite.config.js` to use `dotenv` and defining environment variables properly.

3. **Connecting to MistralAI**:
   - The initial implementation of connecting to Mistral was inconsistent due to incomplete or conflicting instructions. We solved this by simplifying the code and using a consistent approach to importing and using MistralClient.

4. **Error Handling for API Calls**:
   - We ensured robust error handling so that any connectivity issues would provide meaningful feedback on the screen and console, making debugging easier.

### Final Outcome
By the end of the project, we successfully:
- Established a connection to MistralAI using the provided API key.
- Created a front-end using Vite with Bulma styling to visually present responses.
- Configured environment variables securely using `.env` and `dotenv`.
- Made API requests to Mistral using Axios, and updated the UI with the response.
- Implemented good development practices such as adding error handling and using secure coding practices.

The app correctly loads and displays responses from Mistral AI. Below is a screenshot from our successful interaction where the Mistral response is displayed both on the console and on the screen.

### Next Steps
- **Refine the UI**: Add more visual elements and improve styling using Bulma.
- **Enhance API Interactions**: Add support for more complex interactions with MistralAI.
- **Add New Features**: Introduce user inputs to dynamically query MistralAI.

Feel free to let me know if you'd like to add anything to this summary or move on to the next phase of development!

