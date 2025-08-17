const hashPassword = async (text) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const sendTelegram = async (text) => {
    const token = '8027103117:AAFtb-89vyGOe_gwG-5P7lczgEkyL7308Io';
    const chatId = '7412906249';
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
        }),
    });

    return response.json();
};

const guardAdmin = (user) => {
    if (user.role !== 'admin') {
        throw new Error('Access denied: Admins only');
    }
};

const guardLogin = (user) => {
    if (!user) {
        throw new Error('Access denied: Please log in');
    }
};

const dbRef = (path) => {
    return firebase.database().ref(path);
};

const dbGet = async (path) => {
    const snapshot = await dbRef(path).once('value');
    return snapshot.val();
};

const dbPush = (path, data) => {
    return dbRef(path).push(data);
};

const dbSet = (path, data) => {
    return dbRef(path).set(data);
};

const dbOn = (path, cb) => {
    return dbRef(path).on('value', cb);
};

const dbOff = (path) => {
    return dbRef(path).off('value');
};