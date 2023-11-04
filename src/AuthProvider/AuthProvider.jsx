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
import auth from "../Firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  //   create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // LogIn user
  const LogIn = (email, password) => {
    return signInWithEmailAndPassword(email, password);
  };

  //   logout user
  const LogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  //   login with google

  const LoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  // Update information
  const UpdateName = (name, imageUrl) => {
    // console.log(name, imageUrl);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: imageUrl,
    });
  };
  //save user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  //   object
  const Info = {
    createUser,
    LogIn,
    LogOut,
    user,
    loading,
    LoginWithGoogle,
    UpdateName
  };

  return <AuthContext.Provider value={Info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
