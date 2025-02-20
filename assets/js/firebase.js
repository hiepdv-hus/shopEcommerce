// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCVVd7HDo-_j_pIA_p7RAjtSvfJtBbFTZ0",
    authDomain: "shopecommerce-a5a35.firebaseapp.com",
    projectId: "shopecommerce-a5a35",
    storageBucket: "shopecommerce-a5a35.firebasestorage.app",
    messagingSenderId: "811523264533",
    appId: "1:811523264533:web:955262441df0629def7e1c",
    measurementId: "G-NBN8G7JZ2Y",
    databaseURL: "https://shopecommerce-a5a35-default-rtdb.firebaseio.com",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = firebase.database();
