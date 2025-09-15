import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/api/product/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
      <Card sx={{ maxWidth: 600, p: 2 }}>
        <CardMedia
          component="img"
          height="300"
          image={product.imageurl}
          alt={product.Product_title}
        />
        <CardContent>
          <Typography variant="h4">{product.Product_title}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {product.Product_description}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Status: {product.status}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
