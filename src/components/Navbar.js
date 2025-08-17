import { showPage } from '../router.js';

const Navbar = () => {
    const navbar = document.createElement('nav');
    navbar.className = 'bg-white shadow-md sticky top-0 z-10';

    const container = document.createElement('div');
    container.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

    const logo = document.createElement('div');
    logo.className = 'flex items-center justify-between h-16';
    logo.innerHTML = '<h1 class="text-xl font-bold">Belajar</h1>';

    const links = document.createElement('div');
    links.className = 'flex space-x-4';

    const pages = [
        { name: 'Home', id: 'home' },
        { name: 'Materi', id: 'materi' },
        { name: 'Tugas', id: 'tugas' },
        { name: 'Quiz', id: 'quiz' },
        { name: 'Profil', id: 'profil' },
        { name: 'Logout', id: 'logout' }
    ];

    pages.forEach(page => {
        const link = document.createElement('a');
        link.href = '#';
        link.innerText = page.name;
        link.className = 'text-gray-700 hover:text-blue-500 transition duration-300';
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(page.id);
        });
        links.appendChild(link);
    });

    logo.appendChild(links);
    container.appendChild(logo);
    navbar.appendChild(container);

    return navbar;
};

export default Navbar;