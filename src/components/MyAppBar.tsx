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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#556b2f" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {roles?.find((role: Role) => role === "ADMIN") ? (
              <>
                <Link to="/linkpage">
                  <Button color="inherit">link page</Button>
                </Link>
              </>
            ) : null}

            <Link to="/">
              <Button color="inherit">Home</Button>
            </Link>
          </Typography>
          <Link to="/profile">
            <Button color="inherit">Profile</Button>
          </Link>

          {roles?.find((role: Role) => role === "ADMIN") ? (
            <>
              <Link to="/admin">
                <Button color="inherit">Admin</Button>
              </Link>
              <Link to="/add">
                <Button color="inherit">Add</Button>
              </Link>
            </>
          ) : null}

          <Button color="inherit" onClick={signOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MyAppBar;
