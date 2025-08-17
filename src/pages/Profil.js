import { useEffect, useState } from 'react';
import { dbGet, dbSet } from '../utils/db';
import { hashPassword } from '../utils/hash';
import { sendTelegram } from '../utils/telegram';

const Profil = () => {
    const [user, setUser] = useState({
        nama: '',
        username: '',
        email: '',
        wa: '',
        passHash: '',
    });
    const [loading, setLoading] = useState(true);
    const uid = localStorage.getItem('uid');

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await dbGet(`/users/${uid}`);
            setUser(userData);
            setLoading(false);
        };

        fetchUserData();
    }, [uid]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = { ...user };
        if (updatedUser.passHash) {
            updatedUser.passHash = await hashPassword(updatedUser.passHash);
        }
        await dbSet(`/users/${uid}`, updatedUser);
        sendTelegram(`🔄 Profil diupdate: ${user.nama}`);
        alert('Profil berhasil diperbarui!');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Profil Saya</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="nama"
                    value={user.nama}
                    onChange={handleChange}
                    placeholder="Nama Lengkap"
                    className="input"
                    required
                />
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="input"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="input"
                    required
                />
                <input
                    type="text"
                    name="wa"
                    value={user.wa}
                    onChange={handleChange}
                    placeholder="Nomor WhatsApp"
                    className="input"
                />
                <input
                    type="password"
                    name="passHash"
                    onChange={handleChange}
                    placeholder="Ganti Password (kosongkan jika tidak ingin mengubah)"
                    className="input"
                />
                <button type="submit" className="btn">
                    Simpan Perubahan
                </button>
            </form>
        </div>
    );
};

export default Profil;