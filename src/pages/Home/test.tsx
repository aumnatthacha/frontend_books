import React from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useStore";
import { Role } from '../../interfaces/Role';

interface AppBarProps {
  signOut: () => void;
}

const MyAppBar: React.FC<AppBarProps> = ({ signOut }) => {
  const roles = useAppSelector((state) => state.auth.roles);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/linkpage">
              <Button color="inherit">link page</Button>
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

          <Link to="/test">
            <Button color="inherit">Test</Button>
          </Link>
          <Button color="inherit" onClick={signOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MyAppBar;

{/* <DeleteIcon
              sx={{
                color: "red",
                "&:hover": {
                  color: "blue",
                },
              }}
              onClick={() => handleDelete(book._id)}
            /> */}
            {/* <Button
              onClick={() => handleExpandClick(book)}
              aria-expanded={book.expanded}
            >
              {book.expanded ? "Collapse Details" : "Expand Details"}
              <ExpandMoreIcon />
            </Button>
            <Collapse in={book.expanded}>
              <CardContent>
                <Typography paragraph>Additional book details:</Typography>
                <Typography>Description: {book.description}</Typography>
              </CardContent>
            </Collapse> */}