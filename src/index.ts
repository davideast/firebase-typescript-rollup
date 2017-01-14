import * as firebase from 'firebase/app';
import 'firebase/storage';

const app = firebase.initializeApp({
  apiKey: "AIzaSyDlx0e9BbZoLxU9EcwA7aDc2IvtJoKP1Mc",
  storageBucket: "fir-rollup.appspot.com",
});

const storage = app.storage();