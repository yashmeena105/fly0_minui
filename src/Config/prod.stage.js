const firebaseConfig = {
  apiKey: "AIzaSyA13mKS7Q-j1K4jZR44pCxc6hs8z7uBLA0",
  authDomain: "bookhere-penv.firebaseapp.com",
  projectId: "bookhere-penv",
  storageBucket: "bookhere-penv.appspot.com",
  messagingSenderId: "828507045965",
  appId: "1:828507045965:web:7d6f57708b188593325c04",
  measurementId: "G-CRHTWXPME6"
};


const serverEndPoint = `https://3jmnwr0xu4.execute-api.ap-south-1.amazonaws.com/prod/api`;

const fcmKey = "BBwrvWzIYlHQq-7v8TQy-huHimTLY-sQEVw5ec4IywnptXBgt5sC8P7nGUXi015ijQTptBfkpXeYI7JOfkkmMMI";

export default {
  firebaseConfig,
  serverEndPoint,
  fcmKey,
}