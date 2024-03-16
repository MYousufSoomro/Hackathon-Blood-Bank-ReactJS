import React, { useEffect, useState } from "react";
import MediaCard from "../components/MediaCard";
import { Container, Grid } from "@mui/material";
import userData from "../config/store/slices/userData";
import { Navigate } from "react-router-dom";
import { database } from "../config/firebase";
import { onValue, ref } from "firebase/database";

const Donors = () => {
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    getUsersData();
  }, []);

  const user = userData.isLoggedIn;

  const getUsersData = () => {
    const usersRef = ref(database, "users");
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

  return (
    <div>
      {!user ? (
        <Container>
          <Grid display={"flex"} gap={2} mt={2}>
            {usersData.length > 0 &&
              usersData.map((user, index) => {
                return user.type === "donor" ? (
                  <MediaCard
                    key={user.userId}
                    name={user.fullName}
                    bloodGroup={user.bloodGroup}
                    email={user.email}
                  />
                ) : null;
              })}

            {/* <MediaCard
              name="Yousuf"
              bloodGroup="A-positive"
              email="yousuf@gmail.com"
            /> */}
          </Grid>
        </Container>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default Donors;
