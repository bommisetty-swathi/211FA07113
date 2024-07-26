// src/pages/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../services/api';
import { Card, CardContent, Typography } from '@mui/material';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProducts('AMZ', 'Laptop', 1, 0, 10000);
      const selectedProduct = data.find((p) => p.productName === id);
      setProduct(selectedProduct);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{product.productName}</Typography>
        <Typography variant="subtitle1">{product.price}</Typography>
        <Typography variant="subtitle1">{product.rating}</Typography>
        <Typography variant="subtitle1">{product.discount}</Typography>
        <Typography variant="subtitle1">{product.availability}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductDetail;
