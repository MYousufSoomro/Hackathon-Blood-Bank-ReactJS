import React, { useState } from "react";
import { auth } from "../config/firebase";

const Profile = () => {
  const [usersData, setUsersData] = useState([]);
  const getUsersData = () => {
    const userId = auth.onAuthStateChanged((user) => {
      if (user) {
        // User logged in already or has just logged in.
        return user.uid;
      } else {
        // User not logged in or has just logged out.
      }
    });

    const usersRef = ref(database, `users/${userId}`);

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      const arr = [];
      Object.keys(data).forEach((key) => {
        arr.push(data[key]);
      });

      console.log(arr);

      setUsersData(arr);
    });
  };

  return <div>Profile</div>;
};

export default Profile;
