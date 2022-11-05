import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB5PxaDn1ruSMLMqkDwTguGg3OCJegZbKY",

  authDomain: "projeto-desenvolvimento-ii.firebaseapp.com",

  databaseURL: "https://projeto-desenvolvimento-ii-default-rtdb.firebaseio.com",

  projectId: "projeto-desenvolvimento-ii",

  storageBucket: "projeto-desenvolvimento-ii.appspot.com",

  messagingSenderId: "741444501806",

  appId: "1:741444501806:web:b775681b09134241aa3abf",

  measurementId: "G-7RL61EEHMW",
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export {auth}
