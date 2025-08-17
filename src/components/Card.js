import { html } from '../utils/helpers.js';

const Card = ({ title, content, onClick }) => {
    return html`
        <div class="bg-white rounded-2xl shadow-lg p-4 transition-transform transform hover:scale-105" onclick="${onClick}">
            <h3 class="text-lg font-semibold text-gray-800">${title}</h3>
            <p class="text-gray-600 mt-2">${content}</p>
        </div>
    `;
};

export default Card;