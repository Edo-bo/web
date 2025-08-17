import { useEffect, useState } from 'react';
import { dbGet, dbOn, dbOff } from '../utils/db';
import { sendTelegram } from '../utils/telegram';

const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const uid = localStorage.getItem('uid');

    useEffect(() => {
        const postsRef = dbGet('/forum');
        dbOn(postsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setPosts(Object.values(data));
            }
        });

        return () => {
            dbOff(postsRef);
        };
    }, []);

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (newPost.trim() === '') return;

        const postData = {
            uid,
            content: newPost,
            createdAt: new Date().toISOString(),
        };

        await dbPush('/forum', postData);
        setNewPost('');
        sendTelegram(`🗨️ New Forum Post: ${newPost}`);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Forum Diskusi</h1>
            <form onSubmit={handlePostSubmit} className="mb-4">
                <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Tulis pesan baru..."
                    rows="4"
                />
                <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">
                    Kirim
                </button>
            </form>
            <div className="space-y-4">
                {posts.map((post, index) => (
                    <div key={index} className="p-4 border rounded shadow">
                        <p>{post.content}</p>
                        <span className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forum;