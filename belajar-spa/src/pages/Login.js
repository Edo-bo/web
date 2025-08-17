import { useState } from 'react';
import { hashPassword } from '../utils/hash';
import { dbRef, dbSet } from '../utils/db';
import { sendTelegram } from '../utils/telegram';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const hashedPassword = await hashPassword(password);
            const userRef = dbRef(`/users/${username}`);
            const userSnapshot = await userRef.once('value');

            if (userSnapshot.exists()) {
                const userData = userSnapshot.val();
                if (userData.passHash === hashedPassword) {
                    localStorage.setItem('token', JSON.stringify({ uid: username, role: userData.role }));
                    // Redirect to home or dashboard
                } else {
                    setError('Invalid username or password');
                }
            } else {
                setError('User not found');
            }
        } catch (err) {
            setError('An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-500 text-white font-bold py-2 rounded-md ${loading ? 'opacity-50' : ''}`}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;