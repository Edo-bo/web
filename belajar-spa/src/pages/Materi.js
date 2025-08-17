import { dbGet } from '../utils/db.js';
import { useEffect, useState } from 'react';

const Materi = () => {
    const [materiList, setMateriList] = useState([]);

    useEffect(() => {
        const fetchMateri = async () => {
            const data = await dbGet('/materi');
            setMateriList(data);
        };

        fetchMateri();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Materi Belajar</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {materiList.map((materi) => (
                    <div key={materi.id} className="bg-white rounded-2xl shadow p-4">
                        <h2 className="font-semibold">{materi.judul}</h2>
                        <p>{materi.deskripsi}</p>
                        <a href={materi.url} className="text-blue-500 hover:underline">
                            Lihat Materi
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Materi;