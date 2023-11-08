/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { logOut } from "../../stores/slices/authSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import CardMedia from "@mui/material/CardMedia";
import MyAppBar from "../../components/MyAppBar";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Role } from "../../interfaces/Role";

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
  _id: string;
}

const Home = () => {
  const axiosPrivate = useAxiosPrivate();
  const roles = useAppSelector((state) => state.auth.roles);
  const dispatcher = useAppDispatch();
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  

  const signOut = async () => {
    dispatcher(logOut());
    await axiosPrivate.post("/auth/logout");
  };

  const handleDelete = async (bookId: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete this book!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "No, cancel",
      });

      if (result.isConfirmed) {
        await axiosPrivate.delete(`/books/${bookId}`);
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book._id !== bookId)
        );
        Swal.fire("Deleted!", "The book has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "The book deletion has been cancelled.", "info");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      Swal.fire("Error", "An error occurred while deleting the book.", "error");
    }
  };


  
  const handleImageClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleClosePopup = () => {
    setSelectedBook(null);
  };

  useEffect(() => {
    (async () => {
      const res = await axiosPrivate("/books");
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
              maxWidth: 200,
              width: "30%",
              marginTop: "6rem",
              borderRadius: "1px",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          >
            <CardMedia
              component="img"
              alt={book.title}
              image={book.profileUrl}
              onClick={() => handleImageClick(book)}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {book.title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Price: ${book.price}
              </Typography>
            </CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                {roles?.find((role: Role) => role === "ADMIN") ? (
                  <Link
                    to={`/update/${book._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button style={{ color: "green" }}>Update</Button>
                  </Link>
                ) : null}
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                {roles?.find((role: Role) => role === "ADMIN") ? (
                  <DeleteIcon
                    sx={{
                      color: "red",
                      "&:hover": {
                        color: "black",
                      },
                    }}
                    onClick={() => handleDelete(book._id)}
                  />
                ) : null}
              </Grid>
            </Grid>
          </Card>
        ))}
      </div>
      {selectedBook && (
        <Dialog open={Boolean(selectedBook)} onClose={handleClosePopup}>
          <DialogTitle>{selectedBook.title}</DialogTitle>
          <DialogContent>
            <img src={selectedBook.profileUrl} alt={selectedBook.title} />
            <Typography variant="body2" color="text.secondary">
              ISBN: {selectedBook.ISBN}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Author: {selectedBook.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description: {selectedBook.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: ${selectedBook.price}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePopup} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Home;
