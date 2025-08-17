import { useEffect, useState } from 'react';
import { dbGet } from '../utils/db';
import Card from '../components/Card';

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const data = await dbGet('/poin');
            const sortedData = Object.entries(data)
                .map(([uid, points]) => ({ uid, ...points }))
                .sort((a, b) => b.absen - a.absen); // Sort by attendance points
            setLeaderboardData(sortedData);
        };

        fetchLeaderboard();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Leaderboard Aktivitas</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leaderboardData.map((user, index) => (
                    <Card key={user.uid} className="shadow-lg p-4 rounded-2xl">
                        <h2 className="font-semibold">{index + 1}. {user.nama}</h2>
                        <p>Absensi: {user.absen}</p>
                        <p>Tugas Tepat Waktu: {user.tugasOnTime}</p>
                        <p>Nilai Kuis: {user.kuisNilai}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;