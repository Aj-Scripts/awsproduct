import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../axiosinterceptor';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token=localStorage.getItem('token')

  useEffect(() => {
    fetchProducts();
  }, []);
  

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:4900/product/');
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Delete product
  const deleteProduct = (id) => {
    axiosInstance.delete("http://localhost:4900/product/delete/" + id)
      .then(() => {
        alert("Product deleted");
        fetchProducts(); // refresh list without reloading page
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Update product (navigate to Add with state)
  const updateProduct = (product) => {
    navigate("/add", { state: { product } });
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {products.map((productz) => (
        <Card key={productz._id} sx={{ maxWidth: 345, marginTop: 5 }}>
          <CardMedia
            component="img"
            height="250"
            image={productz.imageurl}
            title={productz.Product_title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {productz.Product_title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {productz.Product_description}
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Status: {productz.status}
            </Typography>
          </CardContent>
          <CardActions>
            {token && (<>
            <Button size="small" onClick={() => updateProduct(productz)}>Edit</Button>
            <Button size="small" color="error" onClick={() => deleteProduct(productz._id)}>Delete</Button></>)}
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default Home;
