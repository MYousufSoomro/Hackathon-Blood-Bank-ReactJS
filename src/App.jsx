import RouterApp from "./config/RouterApp";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./config/firebase";
import { setUserData } from "./config/store/slices/userData";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        dispatch(setUserData(true));
        // ...
      } else {
        // User is signed out
        // ...
        console.log("user is not signed");
      }
    });
  }, []);

  return <RouterProvider router={RouterApp} />;
};

export default App;
