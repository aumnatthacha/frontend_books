/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { logOut } from "../../stores/slices/authSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import CardMedia from "@mui/material/CardMedia";
// import { Role } from "../../interfaces/Role";
import MyAppBar from "../../components/MyAppBar";
// import Collapse from "@mui/material/Collapse";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// import CardActions from "@mui/material/CardActions";

// type Props = {};
interface Book {
  expanded: boolean;
  ISBN: string;
  author: string;
  createdAt: string;
  description: string;
  price: number;
  profileUrl: string;
  title: string;
  updatedAt: string;
  // __v: 0;
  _id: string;
}

const Home = () => {
  const axiosPrivate = useAxiosPrivate();
  const roles = useAppSelector((state) => state.auth.roles);
  console.log(roles);
  const dispatcher = useAppDispatch();
  const [books, setBooks] = useState<Book[]>([]);

  const signOut = async () => {
    dispatcher(logOut());
    await axiosPrivate.post("/auth/logout");
  };

  const handleDelete = async (bookId: string) => {
    try {
      await axiosPrivate.delete(`/books/${bookId}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await axiosPrivate("/books");
      console.log("DEBUG", res.data);
      setBooks(res.data);
    })();
  }, []);

  return (
    <>
     <MyAppBar signOut={signOut} />
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {books.map((book) => (
          <Card
            key={book._id}
            sx={{
              maxWidth: 250,
              width: "30%",
              marginTop: "2rem",
              borderRadius: "8px",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          >
            <CardMedia
              component="img"
              alt={book.title}
              image={book.profileUrl}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ISBN: {book.ISBN}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Author: {book.author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {book.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: ${book.price}
              </Typography>
            </CardContent>
            <Link to={`/update/${book._id}`}>
              <Button color="inherit">Update</Button>
            </Link>
            <DeleteIcon
              sx={{
                color: "red",
                "&:hover": {
                  color: "blue",
                },
              }}
              onClick={() => handleDelete(book._id)}
            />
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
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;
