import { dbRef, dbGet, dbPush, dbSet } from '../utils/db.js';
import { sendTelegram } from '../utils/telegram.js';

const Tugas = {
    async render() {
        return `
            <div class="container mx-auto p-4">
                <h1 class="text-2xl font-bold mb-4">Tugas</h1>
                <div id="tugas-list" class="space-y-4"></div>
                <button id="add-tugas" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Tambah Tugas</button>
            </div>
        `;
    },

    async afterRender() {
        this.loadTugas();
        document.getElementById('add-tugas').addEventListener('click', this.addTugas);
    },

    async loadTugas() {
        const tugasList = document.getElementById('tugas-list');
        const tugasRef = dbRef('tugas');
        const snapshot = await dbGet(tugasRef);
        const tugasData = snapshot.val();

        tugasList.innerHTML = '';
        for (const id in tugasData) {
            const tugas = tugasData[id];
            tugasList.innerHTML += `
                <div class="bg-white shadow rounded-lg p-4">
                    <h2 class="font-semibold">${tugas.judul}</h2>
                    <p>${tugas.deskripsi}</p>
                    <p class="text-gray-500">Deadline: ${tugas.deadline}</p>
                </div>
            `;
        }
    },

    async addTugas() {
        const judul = prompt('Masukkan judul tugas:');
        const deskripsi = prompt('Masukkan deskripsi tugas:');
        const deadline = prompt('Masukkan deadline tugas:');

        if (judul && deskripsi && deadline) {
            const tugasRef = dbRef('tugas');
            const newTugas = {
                judul,
                deskripsi,
                deadline,
                createdAt: new Date().toISOString()
            };

            await dbPush(tugasRef, newTugas);
            sendTelegram(`📚 Tugas Baru: ${judul}`);
            alert('Tugas berhasil ditambahkan!');
            this.loadTugas();
        } else {
            alert('Semua field harus diisi!');
        }
    }
};

export default Tugas;