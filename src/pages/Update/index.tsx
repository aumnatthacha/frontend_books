/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";

interface FormData {
  author: string;
  ISBN: string;
  profileUrl: string;
  title: string;
  description: string;
  price: number;
}

function UpdateBook() {
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
        console.log("Book updated successfully.");
      } else {
        console.error("Failed to update the book.");
      }
    } catch (error) {
      console.error("An error occurred while updating the book:", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate(`/books/${id}`);
        if (response.status === 200) {
          const bookData = response.data;
          console.log(response.data)
          setFormData({
            author: bookData.author,
            ISBN: bookData.ISBN,
            profileUrl: bookData.profileUrl,
            title: bookData.title,
            description: bookData.description,
            price: bookData.price,
          });
        } else {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูลหนังสือ');
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลหนังสือ:', error);
      }
    })();
  }, [id]);
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      maxWidth="400px"
      mx="auto"
      p={2}
    >
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
      <Button variant="contained" color="primary" onClick={handleUpdate} fullWidth>
        Update
      </Button>
    </Box>
  );
}

export default UpdateBook;
