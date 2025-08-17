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

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

export const dbRef = (path) => database.ref(path);

export const dbGet = async (path) => {
    const snapshot = await dbRef(path).once('value');
    return snapshot.val();
};

export const dbPush = (path, data) => {
    return dbRef(path).push(data);
};

export const dbSet = (path, data) => {
    return dbRef(path).set(data);
};

export const dbOn = (path, callback) => {
    return dbRef(path).on('value', callback);
};

export const dbOff = (path) => {
    return dbRef(path).off();
};