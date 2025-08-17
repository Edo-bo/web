import { dbRef, dbPush } from '../utils/db.js';
import { getCurrentUser } from '../utils/auth.js';
import { sendTelegram } from '../utils/telegram.js';

const Absen = () => {
    const user = getCurrentUser();

    const handleAbsen = async () => {
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const time = now.toLocaleTimeString();
        const deviceInfo = navigator.userAgent;

        const absenData = {
            waktu: time,
            deviceInfo: deviceInfo
        };

        await dbPush(dbRef(`/absensi/${date}/${user.uid}`), absenData);
        sendTelegram(`✅ Absen: ${user.nama} ${date} ${time}`);
        alert('Absen berhasil!');
    };

    return `
        <div class="container mx-auto p-4">
            <h1 class="text-2xl font-bold mb-4">Absen Harian</h1>
            <button 
                class="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition" 
                onclick="handleAbsen()">
                Absen Sekarang
            </button>
        </div>
    `;
};

export default Absen;