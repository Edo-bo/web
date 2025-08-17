import { dbRef, dbGet } from '../utils/db.js';

const Kalender = () => {
    const calendarContainer = document.createElement('div');
    calendarContainer.className = 'p-4';

    const title = document.createElement('h1');
    title.className = 'text-2xl font-bold mb-4';
    title.textContent = 'Kalender Akademik';

    const calendarTable = document.createElement('table');
    calendarTable.className = 'min-w-full bg-white border border-gray-300';

    const tableHeader = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const headers = ['Tanggal', 'Kegiatan', 'Deskripsi'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.className = 'border px-4 py-2';
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    tableHeader.appendChild(headerRow);
    calendarTable.appendChild(tableHeader);

    const tableBody = document.createElement('tbody');
    calendarTable.appendChild(tableBody);

    const loadCalendarEvents = async () => {
        const eventsRef = dbRef('kalender');
        const eventsSnapshot = await dbGet(eventsRef);
        const events = eventsSnapshot.val();

        if (events) {
            Object.keys(events).forEach(date => {
                const event = events[date];
                const row = document.createElement('tr');

                const dateCell = document.createElement('td');
                dateCell.className = 'border px-4 py-2';
                dateCell.textContent = date;

                const activityCell = document.createElement('td');
                activityCell.className = 'border px-4 py-2';
                activityCell.textContent = event.kegiatan;

                const descriptionCell = document.createElement('td');
                descriptionCell.className = 'border px-4 py-2';
                descriptionCell.textContent = event.deskripsi;

                row.appendChild(dateCell);
                row.appendChild(activityCell);
                row.appendChild(descriptionCell);
                tableBody.appendChild(row);
            });
        }
    };

    loadCalendarEvents();

    calendarContainer.appendChild(title);
    calendarContainer.appendChild(calendarTable);

    return calendarContainer;
};

export default Kalender;