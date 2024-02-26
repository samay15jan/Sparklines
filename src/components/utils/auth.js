import { auth, database } from './firebase.js'
import { GoogleAuthProvider, signOut, signInWithPopup } from "firebase/auth";
import { set, ref } from 'firebase/database';

const googleLogin = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        const userId = user.uid
        localStorage.setItem('username', user.displayName)
        localStorage.setItem('email', user.email)
        localStorage.setItem('photoURL', user.photoURL)
        set(ref(database, 'sparklines/users/' + userId), {
          name: user.displayName,
          email: user.email,
          profile : user.photoURL,
        })
      })
      .catch((error) => {
        console.error('Google login error:', error)
      })
}

const logout = async () => {
  try {
    await signOut(auth)
    console.log('signed out')
    return
  } 
  catch (error) {
    throw error
  }
}

export {googleLogin, logout}