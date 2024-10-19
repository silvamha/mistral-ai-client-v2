import { Mistral } from '@mistralai/mistralai';
import { systemInstruction } from './system_instruction';

// console.log(systemInstruction)

// Initialize the client
const apiKey = import.meta.env.VITE_MISTRAL_API_KEY; // Vite-specific syntax to read env variable
const client = new Mistral({ apiKey: apiKey });

// Store the system instructions separately
// const systemInstruction = `Your detailed system instructions go here...`;

// Initialize the conversation with system instructions
let conversationContext = [
    { role: 'system', content: systemInstruction }
];

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

        // Create AI Response Placeholder Element
        const aiMessageElement = document.createElement('div');
        aiMessageElement.className = 'notification is-info is-light';
        aiMessageElement.style.marginBottom = '10px';
        aiMessageElement.innerHTML = `<strong>Assistant:</strong> Assistant is thinking...`;
        chatBox.appendChild(aiMessageElement);

        // Clear the input box
        document.getElementById('user-message').value = '';

        // Append user message to conversation context
        conversationContext.push({ role: 'user', content: userMessage });

        // Send User Message to MistralAI and Get Response
        try {
            const response = await client.chat.complete({
                model: 'mistral-large-latest',
                messages: conversationContext,
            });

            // Update AI response with the result
            const aiResponse = response.choices[0].message.content;
            aiMessageElement.innerHTML = `<strong>Assistant:</strong> ${aiResponse}`;

            // Append AI response to conversation context
            conversationContext.push({ role: 'assistant', content: aiResponse });

        } catch (error) {
            aiMessageElement.innerHTML = `<strong>Assistant:</strong> Error fetching response. Please try again.`;
            console.error('Error connecting to MistralAI:', error);
        }
    }
});
