import { dbRef, dbOn, dbPush } from '../utils/db.js';
import { sendTelegram } from '../utils/telegram.js';

const Chat = () => {
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container p-4';

    const chatHeader = document.createElement('h2');
    chatHeader.className = 'text-2xl font-bold mb-4';
    chatHeader.innerText = 'Chat Room';

    const messageList = document.createElement('div');
    messageList.className = 'message-list mb-4 overflow-y-auto h-64 border border-gray-300 rounded-lg p-2';

    const messageInput = document.createElement('input');
    messageInput.type = 'text';
    messageInput.placeholder = 'Type your message...';
    messageInput.className = 'border border-gray-300 rounded-lg p-2 w-full';

    const sendButton = document.createElement('button');
    sendButton.innerText = 'Send';
    sendButton.className = 'bg-blue-500 text-white rounded-lg p-2 ml-2';

    sendButton.addEventListener('click', () => {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const uid = localStorage.getItem('uid');
            const messageData = {
                uid,
                text: messageText,
                timestamp: Date.now(),
            };
            dbPush(dbRef('chat/public'), messageData);
            sendTelegram(`📩 New message from ${uid}: ${messageText}`);
            messageInput.value = '';
        }
    });

    dbOn(dbRef('chat/public'), (snapshot) => {
        messageList.innerHTML = '';
        snapshot.forEach((childSnapshot) => {
            const message = childSnapshot.val();
            const messageItem = document.createElement('div');
            messageItem.className = 'message-item p-2 my-1 bg-gray-100 rounded-lg';
            messageItem.innerText = `${message.uid}: ${message.text}`;
            messageList.appendChild(messageItem);
        });
    });

    chatContainer.appendChild(chatHeader);
    chatContainer.appendChild(messageList);
    chatContainer.appendChild(messageInput);
    chatContainer.appendChild(sendButton);

    return chatContainer;
};

export default Chat;