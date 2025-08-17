import { dbGet } from '../utils/db.js';
import { useEffect, useState } from 'react';

const Jadwal = () => {
    const [jadwal, setJadwal] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJadwal = async () => {
            try {
                const response = await dbGet('/jadwal');
                setJadwal(response);
            } catch (error) {
                console.error('Error fetching jadwal:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJadwal();
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Jadwal Pelajaran</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Hari</th>
                        <th className="border px-4 py-2">Jam</th>
                        <th className="border px-4 py-2">Mata Pelajaran</th>
                        <th className="border px-4 py-2">Guru</th>
                    </tr>
                </thead>
                <tbody>
                    {jadwal.map((item, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{item.hari}</td>
                            <td className="border px-4 py-2">{item.jam}</td>
                            <td className="border px-4 py-2">{item.mapel}</td>
                            <td className="border px-4 py-2">{item.guru}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Jadwal;