import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useDispatch} from 'react-redux';
import { addProduct } from "../../redux/cartRedux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  margin-top: 100px;
  margin-left: 50px;
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;



const SideNav = styled.h1`
  margin-left: 4rem;
  font-weight: 400;
  font-size: 15px;
  font-family: Lexend Deca, sans-serif;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
  gap: 0.5rem;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const Filter = styled.div`
  margin-bottom: 10px;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const Select = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const Option = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  margin-top: 20px;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  border: 1px solid teal;
  border-radius: 10px;
  padding: 5px;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const PriceText = styled.span`
  font-weight: bold;
  font-size: 30px;
`;

const VarText = styled.span`
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 15px;
`;

const QuantityButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const ProductE = () => {
  const [product, setProduct] = useState({});
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get("http://localhost:5005/apu/find/"+ id);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addProduct({...product ,quantity,selectedVariants})
    );
  };

  const createMarkup = (html) => ({ __html: html });

  const handleVariantChange = (type, value) => {
    if (!value) {
      // If value is empty, select the first option from the comma-separated list
      const firstOption = product.variants.find(variant => variant.type === type)?.options[0]?.split(',')[0];
      setSelectedVariants((prev) => ({ ...prev, [type]: firstOption }));
    } else {
      setSelectedVariants((prev) => ({ ...prev, [type]: value }));
    }
  };

  return (
    <Container>
      <SideNav>
        Home&nbsp;&nbsp;{'>'}&nbsp;&nbsp;Category&nbsp;&nbsp;{'>'}&nbsp;&nbsp;{decodeURIComponent(product.category)}&nbsp;&nbsp;{'>'}&nbsp;&nbsp;<span style={{ color: 'rgb(102, 102, 102)' }}>{decodeURIComponent(product.name)}</span>
      </SideNav>
      <Wrapper>
        <ImgContainer>
          <Image src={product.image} alt={product.name} />
        </ImgContainer>
        <InfoContainer>
          <Title>SKU: {decodeURIComponent(product.category)}</Title>
          <Title>{decodeURIComponent(product.name)}</Title>
         
          <Desc dangerouslySetInnerHTML={createMarkup(product.description)} />
          
          <Price><PriceText>Price:</PriceText>   ₹ {product.price}</Price>

          
          <FilterContainer>
          <VarText>Variants:</VarText>
            {product.variants?.map((variant) => (
              <Filter key={variant.type}>
                <FilterTitle>{variant.type}</FilterTitle>
                <Select
                  onChange={(e) =>
                    handleVariantChange(variant.type, e.target.value)
                  }
                >
                  {variant.options[0]
                    .split(',')
                    .map((option, index) => (
                      <Option key={index} value={option}>{option}</Option>
                    ))}
                </Select>
              </Filter>
            ))}
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <QuantityButton onClick={() => handleQuantity("dec")}><ArrowDropDownIcon/></QuantityButton>
              <Amount>{quantity}</Amount>
              <QuantityButton onClick={() => handleQuantity("inc")}><ArrowDropUpIcon/></QuantityButton>
            </AmountContainer>
            <Button onClick={handleAddToCart}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default ProductE;

