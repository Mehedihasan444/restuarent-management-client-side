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
import useAxios from "../CustomHooks/useAxios";

const provider = new GoogleAuthProvider();
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const axios = useAxios();
  //   create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // LogIn user
  const LogIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   logout user
  const LogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  //   login with google

  const LoginWithGoogle = () => {
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
      const userInfo = {
        name: user.displayName,
        image: user.photoURL,
        email: user.email,
        role:"user"
      };
     axios.post("/users", userInfo)
     .then(res=>console.log(res.data))
      setLoading(false);
    });

    return () => {
      return unsubscribe();
    };
  }, [axios,user]);

  //   object
  const Info = {
    createUser,
    LogIn,
    LogOut,
    user,
    loading,
    LoginWithGoogle,
    UpdateName,
  };

  return <AuthContext.Provider value={Info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
