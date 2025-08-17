const firebaseConfig = {
    apiKey: "AIzaSyB_1FfccKqXdet00LJyYLY7K4FenvgerhU",
    authDomain: "webku-bf4dd.firebaseapp.com",
    databaseURL: "https://webku-bf4dd-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "webku-bf4dd",
    storageBucket: "webku-bf4dd.appspot.com",
    messagingSenderId: "873622953345",
    appId: "1:873622953345:web:50b0dcfc58b27b9b1c5c80",
    measurementId: "G-30ZPKLVZYE"
};

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { showPage } from './router.js';
import { sendTelegram } from './utils/telegram.js';
import './styles/custom.css';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token) {
        showPage('Home');
    } else {
        showPage('Login');
    }

    // Add event listeners for navigation
    document.querySelectorAll('a[data-page]').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const pageId = event.target.getAttribute('data-page');
            showPage(pageId);
        });
    });
});

// Function to hash password
async function hashPassword(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Function to send notifications to Telegram
async function notifyAdmin(message) {
    await sendTelegram(message);
}

// Export functions for use in other modules
export { hashPassword, notifyAdmin };