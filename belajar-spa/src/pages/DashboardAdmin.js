import { useEffect, useState } from 'react';
import { dbGet, dbOn, dbOff } from '../utils/db';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

const DashboardAdmin = () => {
    const [users, setUsers] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const usersRef = dbGet('/users');
        const announcementsRef = dbGet('/pengumuman');
        const scheduleRef = dbGet('/jadwal');

        const unsubscribeUsers = dbOn(usersRef, (snapshot) => {
            const data = snapshot.val();
            setUsers(data ? Object.values(data) : []);
        });

        const unsubscribeAnnouncements = dbOn(announcementsRef, (snapshot) => {
            const data = snapshot.val();
            setAnnouncements(data ? Object.values(data) : []);
        });

        const unsubscribeSchedule = dbOn(scheduleRef, (snapshot) => {
            const data = snapshot.val();
            setSchedule(data ? Object.values(data) : []);
        });

        return () => {
            dbOff(usersRef, unsubscribeUsers);
            dbOff(announcementsRef, unsubscribeAnnouncements);
            dbOff(scheduleRef, unsubscribeSchedule);
        };
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-grow">
                <Sidebar />
                <main className="flex-grow p-4">
                    <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card title="Total Users" value={users.length} />
                        <Card title="Total Announcements" value={announcements.length} />
                        <Card title="Class Schedule" value={schedule.length} />
                    </div>
                    {/* Additional management features can be added here */}
                </main>
            </div>
        </div>
    );
};

export default DashboardAdmin;