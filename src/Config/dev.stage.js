const firebaseConfig = {
  apiKey: "AIzaSyANfwdWKYwSTf63baW5i4rNCfWPaAgeZag",
  authDomain: "bookhere-denv.firebaseapp.com",
  projectId: "bookhere-denv",
  storageBucket: "bookhere-denv.appspot.com",
  messagingSenderId: "520515165513",
  appId: "1:520515165513:web:6bbe85d13c79f0af420e98",
  measurementId: "G-Y978GRWY06"
};


const serverEndPoint = `https://z106z5xn7d.execute-api.ap-south-1.amazonaws.com/dev/api`;

const fcmKey = "BG0F86558JoTX1F1wkmZBeBnnMkH4Jxym6-exK3yICCP1kp_zjSWz6DvdF4PLoIdiFdkiF8wlHiQ82BWIeoYH8o";

export default {
  firebaseConfig,
  serverEndPoint,
  fcmKey,
}