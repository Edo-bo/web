const routes = [
    {
        path: '/',
        component: () => import('./pages/Home.js'),
        name: 'Home',
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        component: () => import('./pages/Login.js'),
        name: 'Login',
        meta: { requiresAuth: false }
    },
    {
        path: '/register',
        component: () => import('./pages/Register.js'),
        name: 'Register',
        meta: { requiresAuth: false }
    },
    {
        path: '/absen',
        component: () => import('./pages/Absen.js'),
        name: 'Absen',
        meta: { requiresAuth: true }
    },
    {
        path: '/jadwal',
        component: () => import('./pages/Jadwal.js'),
        name: 'Jadwal',
        meta: { requiresAuth: true }
    },
    {
        path: '/pengumuman',
        component: () => import('./pages/Pengumuman.js'),
        name: 'Pengumuman',
        meta: { requiresAuth: true }
    },
    {
        path: '/materi',
        component: () => import('./pages/Materi.js'),
        name: 'Materi',
        meta: { requiresAuth: true }
    },
    {
        path: '/tugas',
        component: () => import('./pages/Tugas.js'),
        name: 'Tugas',
        meta: { requiresAuth: true }
    },
    {
        path: '/quiz',
        component: () => import('./pages/Quiz.js'),
        name: 'Quiz',
        meta: { requiresAuth: true }
    },
    {
        path: '/chat',
        component: () => import('./pages/Chat.js'),
        name: 'Chat',
        meta: { requiresAuth: true }
    },
    {
        path: '/forum',
        component: () => import('./pages/Forum.js'),
        name: 'Forum',
        meta: { requiresAuth: true }
    },
    {
        path: '/profil',
        component: () => import('./pages/Profil.js'),
        name: 'Profil',
        meta: { requiresAuth: true }
    },
    {
        path: '/leaderboard',
        component: () => import('./pages/Leaderboard.js'),
        name: 'Leaderboard',
        meta: { requiresAuth: true }
    },
    {
        path: '/kalender',
        component: () => import('./pages/Kalender.js'),
        name: 'Kalender',
        meta: { requiresAuth: true }
    },
    {
        path: '/dashboard-admin',
        component: () => import('./pages/DashboardAdmin.js'),
        name: 'DashboardAdmin',
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '*',
        redirect: '/login'
    }
];

export default routes;