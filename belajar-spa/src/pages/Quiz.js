import { dbGet, dbPush } from '../utils/db.js';
import { sendTelegram } from '../utils/telegram.js';

const Quiz = {
    async render() {
        return `
            <div class="container mx-auto p-4">
                <h1 class="text-2xl font-bold mb-4">Quiz</h1>
                <div id="quiz-container" class="space-y-4">
                    <!-- Quiz questions will be dynamically inserted here -->
                </div>
                <button id="submit-quiz" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Submit Quiz</button>
            </div>
        `;
    },

    async afterRender() {
        const quizContainer = document.getElementById('quiz-container');
        const quizData = await dbGet('/quiz'); // Fetch quiz data from the database

        quizData.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.innerHTML = `
                <h2 class="font-semibold">${index + 1}. ${question.text}</h2>
                <div class="options space-y-2">
                    ${question.options.map((option, i) => `
                        <label class="block">
                            <input type="radio" name="question-${index}" value="${option}" class="mr-2">
                            ${option}
                        </label>
                    `).join('')}
                </div>
            `;
            quizContainer.appendChild(questionElement);
        });

        document.getElementById('submit-quiz').addEventListener('click', this.submitQuiz);
    },

    async submitQuiz() {
        const answers = [];
        const questions = document.querySelectorAll('.question');

        questions.forEach((question, index) => {
            const selectedOption = question.querySelector(`input[name="question-${index}"]:checked`);
            answers.push(selectedOption ? selectedOption.value : null);
        });

        await dbPush('/quiz_submissions', { uid: localStorage.getItem('uid'), answers });
        sendTelegram(`Quiz submitted by user ${localStorage.getItem('uid')}`);
        alert('Quiz submitted successfully!');
    }
};

export default Quiz;