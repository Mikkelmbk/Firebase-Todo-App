var firebaseConfig = {
    apiKey: "AIzaSyCSg3TdChazPCF5mQZx4zKyedeRglNeVrg",
    authDomain: "mytodoapp-bf38f.firebaseapp.com",
    databaseURL: "https://mytodoapp-bf38f.firebaseio.com",
    projectId: "mytodoapp-bf38f",
    storageBucket: "mytodoapp-bf38f.appspot.com",
    messagingSenderId: "952967961983",
    appId: "1:952967961983:web:fc7770f308b196c0134e4a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const functions = firebase.functions();