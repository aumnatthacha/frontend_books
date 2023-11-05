import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid, Button, Typography } from "@mui/material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import MyAppBar from "../Home/test";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';


interface FormData {
  author: string;
  ISBN: string;
  profileUrl: string;
  title: string;
  description: string;
  price: number;
}

function Add() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [formData, setFormData] = useState<FormData>({
    author: "",
    ISBN: "",
    profileUrl: "",
    title: "",
    description: "",
    price: 0,
  });

  const handleAdd = async () => {
    try {
      const res = await axiosPrivate.post("/books", formData);
      console.log(res.data);

      Swal.fire("Good job!", "You Add Books success!", "success").then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      console.error("An error occurred:", error);
      Swal.fire("Error", "An error occurred!", "error");
    }
  };

  const handleCancel = () => {
    navigate('/');
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
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" gutterBottom>
          ADD A BOOK
        </Typography>
        <Grid container spacing={2}>
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
              onClick={handleAdd}
              fullWidth
              sx={{
                backgroundColor: "#000033",
                color: "white",
                "&:hover": {
                  backgroundColor: "#33FF33",
                },
              }}
            >
              Add
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleCancel}
            >
              ยกเลิก
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Add;
