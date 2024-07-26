import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

const ProductCard = ({ product }) => (
  <Card>
    <CardContent>
      <Typography variant="h5">{product.productName}</Typography>
      <Typography variant="subtitle1">Price: ${product.price}</Typography>
      <Typography variant="subtitle1">Rating: {product.rating}</Typography>
      <Typography variant="subtitle1">Discount: {product.discount}%</Typography>
      <Typography variant="subtitle1">Availability: {product.availability}</Typography>
      <Link to={`/product/${product.productName}`}>View Details</Link>
    </CardContent>
  </Card>
);

export default ProductCard;
