import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  margin-top: 120px;
  /* margin-left: 235px; */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const ProductContainer = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  return (
    <ProductContainer>
      <Circle />
      <Image src={item.image} alt={item.name} />
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </ProductContainer>
  );
};

const Categorybar = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5005/apii/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      axios
        .get(`http://localhost:5005/apu/productsByCategory?categories=${selectedCategories.join(',')}`)
        .then((response) => setProducts(response.data))
        .catch((error) => console.error(error));
    } else {
      setProducts([]); // Clear products when no categories are selected
    }
  }, [selectedCategories]);

  return (
    <Wrapper>
      <Container>
        <Autocomplete
          multiple
          id="fixed-tags-demo"
          options={categories}
          getOptionLabel={(option) => option}
          value={selectedCategories}
          onChange={(event, newValue) => {
            setSelectedCategories(newValue);
          }}
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField {...params} label="Select categories" placeholder="Categories" />
          )}
        />

        <ProductList>
          {products.map((product) => (
            <Product key={product._id} item={product} />
          ))}
        </ProductList>
      </Container>
    </Wrapper>
  );
};

export default Categorybar;