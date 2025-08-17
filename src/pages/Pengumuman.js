import { dbGet } from '../utils/db.js';
import { sendTelegram } from '../utils/telegram.js';

const Pengumuman = () => {
    const announcementsContainer = document.createElement('div');
    announcementsContainer.className = 'p-4';

    const title = document.createElement('h1');
    title.className = 'text-2xl font-bold mb-4';
    title.textContent = 'Pengumuman Terbaru';
    announcementsContainer.appendChild(title);

    const announcementsList = document.createElement('ul');
    announcementsList.className = 'space-y-2';

    const loadAnnouncements = async () => {
        const announcements = await dbGet('/pengumuman');
        announcements.forEach(announcement => {
            const listItem = document.createElement('li');
            listItem.className = 'p-4 border rounded-lg shadow-md';
            listItem.innerHTML = `
                <h2 class="font-semibold">${announcement.judul}</h2>
                <p>${announcement.text}</p>
                <small class="text-gray-500">${new Date(announcement.createdAt).toLocaleString()}</small>
            `;
            announcementsList.appendChild(listItem);
        });
    };

    loadAnnouncements();

    announcementsContainer.appendChild(announcementsList);
    return announcementsContainer;
};

export default Pengumuman;