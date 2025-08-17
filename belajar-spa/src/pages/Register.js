import { useState } from 'react';
import { hashPassword } from '../utils/hash';
import { dbRef, dbPush } from '../utils/db';
import { sendTelegram } from '../utils/telegram';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        password: '',
        email: '',
        whatsapp: '',
        code: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const { fullName, username, password, email, whatsapp, code } = formData;

        if (!fullName || !username || !password || !email || !whatsapp) {
            setError('All fields are required.');
            return;
        }

        const hashedPassword = await hashPassword(password);
        const role = code === 'JADIADMIN' ? 'admin' : 'user';
        const uid = Date.now().toString(); // Simple UID generation

        const userData = {
            fullName,
            username,
            email,
            whatsapp,
            passHash: hashedPassword,
            role,
            createdAt: new Date().toISOString()
        };

        try {
            await dbPush(dbRef(`/users/${uid}`), userData);
            setSuccess('Registration successful!');

            const message = `🆕 Registrasi: ${fullName} (${role})`;
            sendTelegram(message);
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <input
                    type="text"
                    name="fullName"
                    placeholder="Nama Lengkap"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="border rounded p-2 mb-4 w-full"
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username (unik)"
                    value={formData.username}
                    onChange={handleChange}
                    className="border rounded p-2 mb-4 w-full"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border rounded p-2 mb-4 w-full"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border rounded p-2 mb-4 w-full"
                    required
                />
                <input
                    type="text"
                    name="whatsapp"
                    placeholder="Nomor WhatsApp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="border rounded p-2 mb-4 w-full"
                    required
                />
                <input
                    type="text"
                    name="code"
                    placeholder="Kode Opsional"
                    value={formData.code}
                    onChange={handleChange}
                    className="border rounded p-2 mb-4 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white rounded p-2 w-full">Register</button>
            </form>
        </div>
    );
};

export default Register;