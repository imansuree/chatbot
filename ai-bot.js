const chatlog = document.getElementById('chatlog');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// Define your OpenAI API key
const apiKey = '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';

// Function to handle user messages
async function handleUserMessage() {
  const message = userInput.value;
  displayUserMessage(message);
  await processMessage(message);
  userInput.value = '';
}

// Function to display user message in the chat log
function displayUserMessage(message) {
  const chatMessage = document.createElement('div');
  chatMessage.classList.add('chat-message', 'user');
  chatMessage.innerHTML = `<p>${message}</p>`;
  chatlog.appendChild(chatMessage);
}

// Function to display bot message in the chat log
function displayBotMessage(message) {
  const chatMessage = document.createElement('div');
  chatMessage.classList.add('chat-message', 'bot');
  chatMessage.innerHTML = `<p>${message}</p>`;
  chatlog.appendChild(chatMessage);
}

// Function to make an API request with retries
async function makeAPIRequest(payload) {
  const maxRetries = 3;
  const retryDelay = 1000; // Delay in milliseconds

  for (let retry = 0; retry < maxRetries; retry++) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
      });

      return await response.json();
    } catch (error) {
      console.error('Error making API request:', error);

      // Check if the error is due to rate limiting
      if (error.status === 429) {
        // Retry the request after a delay
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      } else {
        throw error; // Rethrow other errors
      }
    }
  }

  throw new Error('API request failed after max retries');
}

// Function to process user message and generate bot response
async function processMessage(message) {
  const payload = {
    messages: [{ role: 'system', content: 'You are a user' }, { role: 'user', content: message }],
    model: 'gpt-3.5-turbo' // Specify the desired ChatGPT model
  };

  try {
    const response = await makeAPIRequest(payload);
    console.log(response);

    if (response.choices && response.choices.length > 0) {
      const botMessage = response.choices[0].message.content;
      displayBotMessage(botMessage);
    } else {
      console.error('Invalid API response:', response);
    }
  } catch (error) {
    console.error('Error processing message:', error);
  }
}


// Event listener for send button click
sendButton.addEventListener('click', handleUserMessage);

// Event listener for enter key press in the input field
userInput.addEventListener('keypress', async function(event) {
  if (event.key === 'Enter') {
    await handleUserMessage();
  }
});
