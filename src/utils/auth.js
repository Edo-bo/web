const firebaseConfig = {
    apiKey: "AIzaSyB_1FfccKqXdet00LJyYLY7K4FenvgerhU",
    authDomain: "webku-bf4dd.firebaseapp.com",
    databaseURL: "https://webku-bf4dd-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "webku-bf4dd",
    storageBucket: "webku-bf4dd.appspot.com",
    messagingSenderId: "873622953345",
    appId: "1:873622953345:web:50b0dcfc58b27b9b1c5c80",
    measurementId: "G-30ZPKLVZYE"
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
    return dbRef(path).off();
};

const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const sendTelegram = async (text) => {
    const url = `https://api.telegram.org/bot8027103117:AAFtb-89vyGOe_gwG-5P7lczgEkyL7308Io/sendMessage`;
    const payload = {
        chat_id: 7412906249,
        text: text
    };
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
};

const guardAdmin = (user) => {
    if (user.role !== 'admin') {
        throw new Error('Access denied');
    }
};

const guardLogin = (user) => {
    if (!user) {
        throw new Error('User not logged in');
    }
};