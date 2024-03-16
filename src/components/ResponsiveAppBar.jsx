import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { setUserData } from "../config/store/slices/userData";

const pages = [
  { label: "Home", url: "/" },
  { label: "Donors", url: "/donors" },
  { label: "Recipents", url: "/recipents" },
  { label: "About", url: "/about" },
];
// const settings = [
//   { label: "Profile", url: "/profile" },
//   { label: "Account", url: "/account" },
//   { label: "Dashboard", url: "/dashboard" },
//   { label: "Logout", url: "/logout" },
// ];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const userData = useSelector((state) => state.userData);
  const user = userData.isLoggedIn;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const navigationHandler = (url) => {
    handleCloseNavMenu();
    handleCloseUserMenu();
    navigate(url);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(setUserData(false));
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log("error", error);
      });
  };

  return (
    <AppBar color="error" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BloodtypeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Blood Bank
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, i) => (
                <MenuItem key={i} onClick={() => navigationHandler(page.url)}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}

              {!user ? (
                <>
                  <MenuItem onClick={() => navigationHandler("/register")}>
                    <Typography textAlign="center">Register</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigationHandler("/login")}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                </>
              ) : (
                <MenuItem onClick={logoutHandler}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <BloodtypeIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Blood Bank
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, i) => (
              <Button
                key={i}
                onClick={() => navigationHandler(page.url)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.label}
              </Button>
            ))}

            {!user ? (
              <>
                <Button
                  onClick={() => navigationHandler("/register")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Register
                </Button>
                <Button
                  onClick={() => navigationHandler("/login")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Login
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigationHandler("/profile")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Profile
                </Button>
                <Button
                  onClick={logoutHandler}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, i) => (
                <MenuItem
                  key={i}
                  onClick={() => navigationHandler(setting.url)}
                >
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
