import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid, Button, Typography } from "@mui/material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface FormData {
  author: string;
  ISBN: string;
  profileUrl: string;
  title: string;
  description: string;
  price: number;
}

function Add() {
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
    const res = await axiosPrivate.post("/books", formData);
    console.log(res.data);
  };

  return (
    <Box
      component="form"
      sx={{
        mt: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "400px",
        mx: "auto",
        p: 4,
        border: "1px solid #ccc",
        borderRadius: "24px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" gutterBottom>
        การเพิ่มข้อมูลหนังสือ
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          {formData.profileUrl && (
            <img
              src={formData.profileUrl}
              alt="Book Cover"
              style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
            />
          )}
        </Grid>
        <Grid item xs={9}>
          <TextField
            id="profileUrl"
            label="Profile URL"
            variant="outlined"
            value={formData.profileUrl}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                profileUrl: e.target.value,
              }));
            }}
            fullWidth
          />
        </Grid>
      </Grid>
      <TextField
        id="author"
        label="Author"
        variant="outlined"
        value={formData.author}
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            author: e.target.value,
          }));
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        id="ISBN"
        label="ISBN"
        variant="outlined"
        value={formData.ISBN}
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            ISBN: e.target.value,
          }));
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        id="title"
        label="Title"
        variant="outlined"
        value={formData.title}
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            title: e.target.value,
          }));
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        id="description"
        label="Description"
        variant="outlined"
        value={formData.description}
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            description: e.target.value,
          }));
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        id="price"
        label="Price"
        variant="outlined"
        type="number"
        value={formData.price}
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            price: parseFloat(e.target.value),
          }));
        }}
        fullWidth
        margin="normal"
      />
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
    </Box>
  );
}

export default Add;
