
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFk8llD8RZuxTW6U9PhBezDu3bhtPLoZA",
  authDomain: "animeflix-2eccc.firebaseapp.com",
  projectId: "animeflix-2eccc",
  storageBucket: "animeflix-2eccc.firebasestorage.app",
  messagingSenderId: "51506533479",
  appId: "1:51506533479:web:4f5b1655b84cd0dd7c70c2"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app)


const signup = async (name,email,password) => {
    try{
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider : "local",
            email,
        })
    }catch (error){
        console.log(error);
        alert(error);

    }
}

const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth , email, password);

    } catch (error) {
        console.log(error);
        alert(error);

    }
}

const logout = () =>{
    signOut(auth);
}

export {auth, db , login, signup, logout};
