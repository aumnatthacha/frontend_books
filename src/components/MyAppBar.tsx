import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/useStore";
import { Role } from "../interfaces/Role";

interface AppBarProps {
  signOut: () => void;
}

const MyAppBar: React.FC<AppBarProps> = ({ signOut }) => {
  const roles = useAppSelector((state) => state.auth.roles);

  const buttonHoverStyles = {
    "&:hover": {
      backgroundColor: "#013220",
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#556b2f", height: "80px"}}>
        <Toolbar sx={{ paddingTop: "6px" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Link to="/">
              <img
                src="https://cdn-icons-png.flaticon.com/512/562/562132.png"
                alt="Home"
                className="w-16 h-16"
              />
            </Link>

            {roles?.find((role: Role) => role === "ADMIN") && (
              <Link to="/linkpage">
                <Button sx={buttonHoverStyles} color="inherit">
                  link page
                </Button>
              </Link>
            )}
          </Typography>

          <Link to="/profile">
            <Button sx={buttonHoverStyles} color="inherit">
              Profile
            </Button>
          </Link>

          {roles?.find((role: Role) => role === "ADMIN") ? (
            <>
              <Link to="/admin">
                <Button sx={buttonHoverStyles} color="inherit">
                  Admin
                </Button>
              </Link>
              <Link to="/add">
                <Button sx={buttonHoverStyles} color="inherit">
                  Add
                </Button>
              </Link>
            </>
          ) : null}

          <Button sx={buttonHoverStyles} color="inherit" onClick={signOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};


export default MyAppBar;
