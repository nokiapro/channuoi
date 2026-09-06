const firebaseConfig = {
  apiKey: "AIzaSyAsEBynbRvfLo7gfh0Rt6KeKLkc-tpEQFA",
  authDomain: "banhang-f7d5f.firebaseapp.com",
  databaseURL: "https://banhang-f7d5f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "banhang-f7d5f",
  storageBucket: "banhang-f7d5f.firebasestorage.app",
  messagingSenderId: "617344459330",
  appId: "1:617344459330:web:0adf0a8d95e9aef99443db"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

try {
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
} catch (e) { console.warn('auth persistence', e); }
