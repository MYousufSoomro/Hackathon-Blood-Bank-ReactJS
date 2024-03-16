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
import { registerUser, writeUserData } from "../config/firebase";
import { toast, ToastContainer } from "react-toastify";

const defaultTheme = createTheme();

export default function Register() {
  const [bloodGroup, setBloodGroup] = React.useState("");
  //   const [userData, setUserData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

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

    registerUser(userData.email, userData.password)
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
            Sign up
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
                  autoComplete="full-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
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
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Type
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="type"
                  >
                    <FormControlLabel
                      value="donor"
                      control={<Radio />}
                      label="Donor"
                    />
                    <FormControlLabel
                      value="recipient"
                      control={<Radio />}
                      label="Recipient"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="bloodGroup-label">Blood Group</InputLabel>
                  <Select
                    labelId="bloodGroup-label"
                    id="bloodGroup"
                    value={bloodGroup}
                    label="Blood Group"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {blood_groups.map((el, i) => {
                      return (
                        <MenuItem key={i} value={el}>
                          {el}
                        </MenuItem>
                      );
                    })}

                    {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {!isLoading ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
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
                  Already have an account?{" "}
                  <Typography
                    onClick={() => navigationHandler("/login")}
                    variant="span"
                    color="primary"
                    sx={{ cursor: "pointer" }}
                  >
                    Sign in
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
