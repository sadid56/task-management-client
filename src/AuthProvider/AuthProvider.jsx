/* eslint-disable react/prop-types */
import {
    GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user
  const creteUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // update profile
  const profileUpdate = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // login user
  const loginUser =(email, password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  // logOut user
  const logOut =()=>{
    setLoading(true)
    return signOut(auth)
  }

// google login
const provider = new GoogleAuthProvider()
const googleLogin = ()=>{
    setLoading(true)
    return signInWithPopup(auth, provider)
}

  // observer
  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            setLoading(false)
            setUser(currentUser)
    })
    return()=> unSubscribe()
  },[])

  const authInfo = {
    user,
    loading,
    creteUser,
    profileUpdate,
    loginUser,
    logOut,
    googleLogin
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
