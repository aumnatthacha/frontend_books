/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid, Typography } from "@mui/material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import MyAppBar from "../../components/MyAppBar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface FormData {
  author: string;
  ISBN: string;
  profileUrl: string;
  title: string;
  description: string;
  price: number;
}

function UpdateBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [formData, setFormData] = useState<FormData>({
    author: "",
    ISBN: "",
    profileUrl: "",
    title: "",
    description: "",
    price: 0,
  });

  const handleUpdate = async () => {
    try {
      const res = await axiosPrivate.patch(`/books/${id}`, formData);
      if (res.status === 200) {
        Swal.fire("Success", "Book updated successfully", "success").then(
          () => {
            window.location.href = "/";
            console.log("Book updated successfully.");
          }
        );
      } else {
        Swal.fire("Error", "Failed to update the book", "error");
        console.error("Failed to update the book.");
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred while updating the book", "error");
      console.error("An error occurred while updating the book:", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate(`/books/${id}`);
        if (response.status === 200) {
          const bookData = response.data;
          console.log(response.data);
          setFormData({
            author: bookData.author,
            ISBN: bookData.ISBN,
            profileUrl: bookData.profileUrl,
            title: bookData.title,
            description: bookData.description,
            price: bookData.price,
          });
        } else {
          console.error("เกิดข้อผิดพลาดในการดึงข้อมูลหนังสือ");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลหนังสือ:", error);
      }
    })();
  }, [id]);

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <MyAppBar signOut={() => {}} />
      <Box
        component="form"
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "800px",
          mx: "auto",
          p: 2,
          border: "1px solid #ccc",
          borderRadius: "16px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#bcb88a ",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          style={{ marginBottom: "50px", fontWeight: "bold"}}
        >
          UPDATE A BOOK
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {formData.profileUrl && (
                <img
                  src={formData.profileUrl}
                  alt="Book Cover"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                  }}
                />
              )}
              <TextField
                id="profileUrl"
                label="Profile URL"
                variant="outlined"
                value={formData.profileUrl}
                onChange={(e) => {
                  setFormData({ ...formData, profileUrl: e.target.value });
                }}
                fullWidth
                sx={{ marginTop: 2 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="author"
              label="Author"
              variant="outlined"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              id="ISBN"
              label="ISBN"
              variant="outlined"
              value={formData.ISBN}
              onChange={(e) =>
                setFormData({ ...formData, ISBN: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              id="price"
              label="Price"
              variant="outlined"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              fullWidth
              sx={{
                backgroundColor: "#faebd7 ",
                color: "black",
                "&:hover": {
                  backgroundColor: "#32cd32    ",
                },
              }}
            >
              Update
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#808000  ",
                color: "white",
                "&:hover": {
                  backgroundColor: "#8b0000 ",
                },
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default UpdateBook;
