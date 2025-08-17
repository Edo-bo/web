import { html } from 'lit-html';

const Sidebar = () => {
    return html`
        <aside class="bg-gray-800 text-white w-64 h-full shadow-lg">
            <div class="p-4">
                <h2 class="text-xl font-bold">Admin Dashboard</h2>
            </div>
            <nav class="mt-4">
                <ul>
                    <li class="hover:bg-gray-700 p-2">
                        <a href="#/dashboard" class="block">Dashboard</a>
                    </li>
                    <li class="hover:bg-gray-700 p-2">
                        <a href="#/users" class="block">Manajemen User</a>
                    </li>
                    <li class="hover:bg-gray-700 p-2">
                        <a href="#/jadwal" class="block">Manajemen Jadwal</a>
                    </li>
                    <li class="hover:bg-gray-700 p-2">
                        <a href="#/absensi" class="block">Manajemen Absensi</a>
                    </li>
                    <li class="hover:bg-gray-700 p-2">
                        <a href="#/pengumuman" class="block">Pengumuman</a>
                    </li>
                    <li class="hover:bg-gray-700 p-2">
                        <a href="#/materi" class="block">Materi Belajar</a>
                    </li>
                    <li class="hover:bg-gray-700 p-2">
                        <a href="#/tugas" class="block">Tugas & Penilaian</a>
                    </li>
                    <li class="hover:bg-gray-700 p-2">
                        <a href="#/quiz" class="block">Quiz/Ulangan</a>
                    </li>
                    <li class="hover:bg-gray-700 p-2">
                        <a href="#/chat" class="block">Chat Room</a>
                    </li>
                    <li class="hover:bg-gray-700 p-2">
                        <a href="#/forum" class="block">Forum Diskusi</a>
                    </li>
                    <li class="hover:bg-gray-700 p-2">
                        <a href="#/profil" class="block">Profil Saya</a>
                    </li>
                    <li class="hover:bg-gray-700 p-2">
                        <a href="#/leaderboard" class="block">Leaderboard Aktivitas</a>
                    </li>
                    <li class="hover:bg-gray-700 p-2">
                        <a href="#/kalender" class="block">Kalender Akademik</a>
                    </li>
                </ul>
            </nav>
        </aside>
    `;
};

export default Sidebar;