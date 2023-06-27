 document.addEventListener('DOMContentLoaded', function() {
      const chatbot = document.getElementById('chatbot');
      chatbot.style.display = 'block';
    });

    const chatlog = document.getElementById('chatlog');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    // Function to handle user messages
    function handleUserMessage() {
      const message = userInput.value;
      displayUserMessage(message);
      processMessage(message);
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

    // Function to process user message and generate bot response
    function processMessage(message) {
      // Convert the user message to lowercase for easier comparison
      const lowerCaseMessage = message.toLowerCase();

      // Check for different HR-related queries and generate bot response accordingly
      if (lowerCaseMessage.includes('vacation')) {
        displayBotMessage("To request vacation, please reach out to your manager or HR department.");
      } else if (lowerCaseMessage.includes('salary')) {
        displayBotMessage("For salary-related inquiries, please contact the HR department.");
      } 
      else if (lowerCaseMessage.includes('leaves')) {
        displayBotMessage("For leaves-related inquiries, please contact the HR department.");
      }
      else if (lowerCaseMessage.includes('benefits')) {
        displayBotMessage("Our company provides various benefits, including health insurance, retirement plans, and more. For specific details, please refer to the employee handbook or contact the HR department.");
      } else {
        displayBotMessage("I'm sorry, I don't have the answer to that question. Please contact the HR department for further assistance.");
      }
    }

    // Event listener for send button click
    sendButton.addEventListener('click', handleUserMessage);

    // Event listener for enter key press in the input field
    userInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        handleUserMessage();
      }
    });