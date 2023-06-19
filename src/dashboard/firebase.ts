import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyARQsdCO7lrnEB5vWX9BsTKGcDwXyEZVyQ",
	authDomain: "rpitv-glimpse-graphics-schools.firebaseapp.com",
	projectId: "rpitv-glimpse-graphics-schools",
	storageBucket: "rpitv-glimpse-graphics-schools.appspot.com",
	messagingSenderId: "701315051935",
	appId: "1:701315051935:web:1f232e6c51b1c4c1880daa"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
