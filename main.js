import { Mistral } from "@mistralai/mistralai";
import { systemInstruction } from "./system_instruction";

// Initialize the client
const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
const client = new Mistral({ apiKey: apiKey });

// console.log(systemInstruction);

// Load conversation context from LocalStorage if it exists
let conversationContext = JSON.parse(localStorage.getItem('conversationContext')) || [
  {
    role: "system",
    content: JSON.stringify(systemInstruction), // Convert to JSON string
  },
];

// Enhanced Validation Function for Better Error Reporting
function validateContext(context) {
  let isValid = true;

  context.forEach((msg, index) => {
    if (!msg || typeof msg !== "object") {
      console.error(`Validation failed at index ${index}: Message is not a valid object.`);
      isValid = false;
    } else if (!msg.role || typeof msg.role !== "string") {
      console.error(`Validation failed at index ${index}: "role" is missing or is not a string.`);
      isValid = false;
    } else if (!msg.content || typeof msg.content !== "string") {
      console.error(`Validation failed at index ${index}: "content" is missing or is not a string.`);
      isValid = false;
    }
  });

  return isValid;
}

// Save conversation context to LocalStorage
function saveConversationContext() {
  localStorage.setItem('conversationContext', JSON.stringify(conversationContext));
}

// Handle Send Button Click
document
  .getElementById("send-button")
  .addEventListener("click", async function () {
    const userMessage = document.getElementById("user-message").value;
    const chatBox = document.getElementById("chat-box");

    if (userMessage.trim()) {
      // Create User Message Element
      const userMessageElement = document.createElement("div");
      userMessageElement.className = "notification is-link is-light";
      userMessageElement.style.marginBottom = "10px";
      userMessageElement.innerHTML = `<strong>User:</strong> ${userMessage}`;

      // Append User Message to Chat Box
      chatBox.appendChild(userMessageElement);

      // Create AI Response Placeholder Element
      const aiMessageElement = document.createElement("div");
      aiMessageElement.className = "notification is-info is-light";
      aiMessageElement.style.marginBottom = "10px";
      aiMessageElement.innerHTML = `<strong>Assistant:</strong> Assistant is thinking...`;
      chatBox.appendChild(aiMessageElement);

      // Clear the input box
      document.getElementById("user-message").value = "";

      // Append user message to conversation context
      conversationContext.push({ role: "user", content: userMessage });

      // Validate the conversation context
      if (!validateContext(conversationContext)) {
        aiMessageElement.innerHTML = `<strong>Assistant:</strong> Error: Validation failed. Please check your input.`;
        return; // Exit early if validation fails
      }

      // Save the updated conversation context to LocalStorage
      saveConversationContext();

      // Send User Message to MistralAI and Get Response
      try {
        const response = await client.chat.complete({
          model: "mistral-large-latest",
          messages: conversationContext,
          temperature: .8,
        });

        // Update AI response with the result
        const aiResponse = response.choices[0].message.content;
        aiMessageElement.innerHTML = `<strong>Assistant:</strong> ${aiResponse}`;

        // Append AI response to conversation context
        conversationContext.push({ role: "assistant", content: aiResponse });

        // Save the updated conversation context to LocalStorage
        saveConversationContext();
      } catch (error) {
        aiMessageElement.innerHTML = `<strong>Assistant:</strong> Error fetching response. Please try again.`;
        console.error("Error connecting to MistralAI:", error);
      }
    }
  });

// Load previous messages from conversationContext on page load
document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.getElementById("chat-box");

  // Append each message in conversationContext to the chat box
  conversationContext.forEach((msg) => {
    if (msg.role !== "system") { // Skip the system instruction from being displayed
      const messageElement = document.createElement("div");
      messageElement.className = msg.role === "user" ? "notification is-link is-light" : "notification is-info is-light";
      messageElement.style.marginBottom = "10px";
      messageElement.innerHTML = `<strong>${msg.role === "user" ? "User" : "Assistant"}:</strong> ${msg.content}`;
      chatBox.appendChild(messageElement);
    }
  });
});
