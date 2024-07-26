import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import Filter from '../components/Filter';
import ProductCard from '../components/ProductCard';
import { Grid, TextField, Select, MenuItem, Button, Card, CardContent, Typography } from '@mui/material';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'Laptop',
    company: 'AMZ',
    rating: '',
    minPrice: '',
    maxPrice: '',
    availability: ''
  });
  const [sort, setSort] = useState('');

  const fetchProducts = async () => {
    const data = await getProducts(filters.company, filters.category, 10, filters.minPrice, filters.maxPrice);
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div>
      <h1>All Products</h1>
      <div>
        <TextField label="Min Price" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} />
        <TextField label="Max Price" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} />
        <TextField label="Rating" name="rating" value={filters.rating} onChange={handleFilterChange} />
        <Select name="availability" value={filters.availability} onChange={handleFilterChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="yes">Available</MenuItem>
          <MenuItem value="no">Out of Stock</MenuItem>
        </Select>
        <Select name="sort" value={sort} onChange={handleSortChange}>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="discount">Discount</MenuItem>
        </Select>
        <Button onClick={fetchProducts}>Apply Filters</Button>
      </div>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.productName} xs={12} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllProducts;
