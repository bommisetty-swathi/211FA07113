import React from 'react';
import { TextField, Select, MenuItem, Button } from '@mui/material';

const Filter = ({ filters, handleFilterChange, handleSortChange, fetchProducts }) => (
  <div>
    <TextField label="Min Price" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} />
    <TextField label="Max Price" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} />
    <TextField label="Rating" name="rating" value={filters.rating} onChange={handleFilterChange} />
    <Select name="availability" value={filters.availability} onChange={handleFilterChange}>
      <MenuItem value="">All</MenuItem>
      <MenuItem value="yes">Available</MenuItem>
      <MenuItem value="no">Out of Stock</MenuItem>
    </Select>
    <Select name="sort" value={filters.sort} onChange={handleSortChange}>
      <MenuItem value="price">Price</MenuItem>
      <MenuItem value="rating">Rating</MenuItem>
      <MenuItem value="discount">Discount</MenuItem>
    </Select>
    <Button onClick={fetchProducts}>Apply Filters</Button>
  </div>
);

export default Filter;
