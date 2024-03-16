import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, writeUserData } from "../config/firebase";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "../config/store/slices/userData";

const defaultTheme = createTheme();

export default function Login() {
  const [bloodGroup, setBloodGroup] = React.useState("");
  //   const [userData, setUserData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useDispatch();
  const handleChange = (event) => {
    setBloodGroup(event.target.value);
  };

  const navigate = useNavigate();
  const navigationHandler = (url) => {
    console.log("first");
    navigate(url);
  };

  const showToast = (msg) => {
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const blood_groups = [
    "O-Negative",
    "O-Positive",
    "A-Negative",
    "A-Positive",
    "B-Negative",
    "B-Positive",
    "AB-Negative",
    "AB-Positive",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
      fullName: data.get("fullName"),
      type: data.get("type"),
      bloodGroup: bloodGroup,
    };

    loginUser(userData.email, userData.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        const userId = user.uid;
        console.log("user >> ", user.uid);

        userData.userId = userId;
        writeUserData(userId, userData)
          .then((res) => {
            console.log(res);
            setIsLoading(false);
            dispatch(setUserData(true));
          })
          .catch((error) => {
            const errorMessage = error.message;
            showToast(errorMessage);
            setIsLoading(false);
          });
        // console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        // console.log(errorMessage);
        showToast(errorMessage);
        setIsLoading(false);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            {!isLoading ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            ) : (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            )}
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Typography
                    onClick={() => navigationHandler("/register")}
                    variant="span"
                    color="primary"
                    sx={{ cursor: "pointer" }}
                  >
                    Register here
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
