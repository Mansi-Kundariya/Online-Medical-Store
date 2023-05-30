import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import MUIDrawer from "./MUIDrawer";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { UserContext } from "../context/UserContext";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import Profile from "../Users/Profile";
// import { hover } from '@testing-library/user-event/dist/hover';
// import { BorderAllRounded } from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const [profileopen, setProfileOpen] = useState(false);

  const [value, setValue] = useState();
  // console.log(context);
  let role;
  if (context.user) {
    role = context.user.type;
    // console.log(context.user);
  }

  const ViewProfile = () => {
    setProfileOpen(!profileopen);
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") && context.user == null) {
      axios
        .get(
          `https://localhost:7156/api/Users/${localStorage.getItem("userId")}`
        )
        .then(
          (response) => {
            // console.log(response);
            context.setUser(response.data);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, []);

  const onLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("userId");
    localStorage.removeItem("medId");
    context.setUser(null);
    navigate("/login");
  };

  const ButtonToggle = () => {
    if (context.user) {
      // role = context.role;
      return (
        <>
          <Button sx={{ color: "white" }} onClick={onLogout}>
            Logout
          </Button>
          <IconButton onClick={ViewProfile}>
            <Avatar>{context.user.firstName[0]}</Avatar>
          </IconButton>
        </>
      );
    } else {
      // role = "user";
      return (
        <Button sx={{ color: "white" }} onClick={() => navigate("/login")}>
          Login
        </Button>
      );
    }
  };
  // const role = "admin";
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Profile isProfileOpen={profileopen} onClose={ViewProfile} />
      <AppBar sx={{ background: "#008080" }}>
        <Toolbar>
          {!isMatch ? (
            <MedicalServicesIcon fontSize="large" />
          ) : (
            <MedicalServicesIcon sx={{ display: "none" }} />
          )}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 2,
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Online Medical Store
          </Typography>
          {isMatch ? (
            <>
              <MUIDrawer />
            </>
          ) : (
            <Tabs
              textColor="white"
              sx={{ mx: "auto" }}
              value={value}
              onChange={(e, value) => setValue(value)}
            >
              <Tab
                sx={{
                  "&:hover": {
                    color: "white",
                    backgroundColor: "#009999",
                    borderRadius: 2,
                  },
                  color: "white",
                }}
                label="Home"
                component={Link}
                to="/"
              />

              <Tab
                sx={{
                  "&:hover": {
                    color: "white",
                    backgroundColor: "#009999",
                    borderRadius: 2,
                  },
                }}
                label="Profile"
                component={Link}
                onClick={ViewProfile}
              />

              {role === "user" && (
                <Tab
                  sx={{
                    "&:hover": {
                      color: "white",
                      backgroundColor: "#009999",
                      borderRadius: 2,
                    },
                  }}
                  label="My Orders"
                  component={Link}
                  to="/orders"
                />
              )}

              {role === "admin" && (
                <Tab
                  sx={{
                    "&:hover": {
                      color: "white",
                      backgroundColor: "#009999",
                      borderRadius: 2,
                    },
                  }}
                  label="Add Medicine"
                  component={Link}
                  to="/addmedicine"
                />
              )}
            </Tabs>
          )}
          {!isMatch && <ButtonToggle />}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
