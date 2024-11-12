import { db } from '../firebase/config'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //cleanup //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  //register

  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);

    try {
        const {user} = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
        )

        await updateProfile(user, {
            displayName: data.displayName
        })

        setLoading(false)

        return user

    } catch (error) {
        console.log(error.message)
        console.log(typeof error.message)

        let systemErrorMessage

        if(error.message.includes("Password")){
          systemErrorMessage = "Password must contain at least 6 characters."
        } else if (error.message.includes("email-already")){
          systemErrorMessage = "Email already registered."
        } else {
          systemErrorMessage = "An error has occurred. Please try again."
        }
        setLoading(false)
        setError(systemErrorMessage)
    }
  };

  //logout
  const logout = () => {
    checkIfIsCancelled()
    signOut(auth)
  }

  //log in
  const login = async(data) => {
    checkIfIsCancelled()

    setLoading(true)
    setError(false)

    try{
      await signInWithEmailAndPassword(auth, data.email, data.password)
      setLoading(false)
    } catch(error){
      if (error.message.includes("user-not-found")){
        systemErrorMessage = "User not found"
      } else if (error.message.includes("wrong-password")){
        systemErrorMessage = "Wrong password"
      } else {
        systemErrorMessage = "An error has occurred. Please try again."
      }
      setError(systemErrorMessage)
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return{
    auth,
    createUser,
    error,
    loading,
    logout,
    login
  }
};
