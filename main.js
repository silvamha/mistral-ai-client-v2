import { Mistral } from '@mistralai/mistralai';  // Use a named import

// Initialize the client (no 'new' keyword here)
const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;  // Vite-specific syntax to read env variable
const client = new Mistral({ apiKey: apiKey });  // Initialize without 'new'

// Handle Send Button Click
document.getElementById('send-button').addEventListener('click', async function () {
    const userMessage = document.getElementById('user-message').value;
    const chatBox = document.getElementById('chat-box');

    if (userMessage.trim()) {
        // Create User Message Element
        const userMessageElement = document.createElement('div');
        userMessageElement.className = 'notification is-link is-light';
        userMessageElement.style.marginBottom = '10px';
        userMessageElement.innerHTML = `<strong>User:</strong> ${userMessage}`;

        // Append User Message to Chat Box
        chatBox.appendChild(userMessageElement);

        // Create AI Response Element (placeholder until actual response comes in)
        const aiMessageElement = document.createElement('div');
        aiMessageElement.className = 'notification is-info is-light';
        aiMessageElement.style.marginBottom = '10px';
        aiMessageElement.innerHTML = `<strong>Assistant:</strong> Assistant is thinking...`;

        // Append AI Response to Chat Box
        chatBox.appendChild(aiMessageElement);

        // Clear the input box
        document.getElementById('user-message').value = '';

        // Send User Message to MistralAI and Get Response
        try {
            const response = await client.chat.complete({
                model: 'mistral-large-latest',
                messages: [{ role: 'user', content: userMessage }],
            });

            // Update AI response with the result
            aiMessageElement.innerHTML = `<strong>Assistant:</strong> ${response.choices[0].message.content}`;
        } catch (error) {
            aiMessageElement.innerHTML = `<strong>Assistant:</strong> Error fetching response. Please try again.`;
            console.error('Error connecting to MistralAI:', error);
        }
    }
});

// Event to handle Load Document button click
document.getElementById('load-document-button').addEventListener('click', function () {
    // Simulate opening a file dialog
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.style.display = 'none';
    document.body.appendChild(inputElement);
    inputElement.click();
    inputElement.addEventListener('change', function () {
        alert('File selected: ' + inputElement.files[0].name);
        document.body.removeChild(inputElement);
    });
});
