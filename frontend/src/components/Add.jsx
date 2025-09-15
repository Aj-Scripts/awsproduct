import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosinterceptor';
import PrivateRoutes from './PrivateRoutes';

const Add = () => {
    const [form, setForm] = useState({
        Product_title: "",
        Product_description: "",
        status: "",
        imageurl: ""
    });

    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location.state != null) {
            axiosInstance.put(`/product/update/${location.state.product._id}`, form)
                .then(() => {
                    alert('Product Updated Successfully');
                    navigate('/');
                })
                .catch((err) => {
                    console.error(err);
                    alert("Failed to update product");
                });
        } else {
            axiosInstance.post("/product/add", form)
                .then((res) => {
                    setForm({
                        Product_title: "",
                        Product_description: "",
                        status: "",
                        imageurl: ""
                    });
                    alert('Product Added Successfully');
                    navigate('/');
                })
                .catch((err) => {
                    console.error(err);
                    alert("Failed to add product");
                });
        }
    };

    useEffect(() => {
        if (location.state != null) {
            setForm({
                Product_title: location.state.product.Product_title,
                Product_description: location.state.product.Product_description,
                status: location.state.product.status,
                imageurl: location.state.product.imageurl
            });
        }
    }, []);

    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="100vh"
            bgcolor="#f9f9f9"
        >
            <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 3 }}>
                <h2 style={{ textAlign: "center" }}>
                    {location.state ? "Edit Product" : "Add Product"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField 
                            label="Product Title"
                            name="Product_title"
                            value={form.Product_title}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField 
                            label="Product Description"
                            name="Product_description"
                            value={form.Product_description}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            fullWidth
                        />
                        <TextField 
                            label="Status"
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField 
                            label="Image URL"
                            name="imageurl"
                            value={form.imageurl}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Button variant="contained" type="submit" size="large">
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
};

export default Add;
