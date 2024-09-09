// import { createContext, ReactNode, useEffect, useState } from "react";
// import {
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithPopup,
//   signOut,
// //   updateProfile,
// } from "firebase/auth";
// import auth from "./firebase.config";
// import { useAppDispatch } from "@/redux/hooks";

// // import Swal from "sweetalert2";
// export const AuthContext = createContext(null);

// const AuthProvider = ({ children }:{children:ReactNode}) => {
//     const dispatch = useAppDispatch();

//   const [user, setUser] = useState();
//   const [loading, setLoading] = useState(true);
//   const googleProvider = new GoogleAuthProvider();


//   const googleLogin = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };

//   const logOut = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

// //   const updateUserProfile = (name, photo) => {
// //     return updateProfile(auth.currentUser, {
// //       displayName: name,
// //       photoURL: photo,
// //     });
// //   };


  
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

//       setUser(currentUser);
//     //   if (currentUser) {
//     //     // get token and store client
//     //     const userInfo = {
//     //       name: currentUser.displayName,
//     //       email: currentUser.email,
//     //     };
//     //     axiosPublic.post("/jwt", userInfo).then((res) => {
//     //       // console.log("hi",res.data.token)
//     //       if (res.data.token) {
//     //         localStorage.setItem("access-token", res.data.token);
//     //       }
//     //     });
//     //   } else {
//     //     // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
//     //     localStorage.removeItem("access-token");
//     //   }
//       setLoading(false);
//     });
//     return () => {
//       return unsubscribe();
//     };
//   }, []);

//   const authInfo = {
//     logOut,
//     // updateUserProfile,
//     googleLogin,
//     loading,
//   };
//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;