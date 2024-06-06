import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
const Container = styled.div`
  margin: 0 0 100px 0;
  height: 0px;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({padding:"10px 0px"})}
`;
const Left = styled.div`
  flex: 1;
  margin-top: 5px;
  display: flex;
  align-items: center;
`;
const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const Logo = styled.img`
  margin-top: -20px;  
  margin-bottom: -20px;
  width: 35%;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  white-space: nowrap; 
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const linkStyle = {
  textDecoration: 'none', 
  color: 'inherit'
};

const Button = styled.button`
  background: ${props => (props.$primary ? "#1881e9" : "white")};
  color: ${props => (props.$primary ? "white" : "#1881e9")};
  font-size: 1em;
  margin: 1px 20px 1px 1px;
  padding: 10.5px 39.5px 10.5px 39.5px;
  border: 2px solid #1881e9;
  border-radius: 3px;
`;
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #0a0909; 
  margin: 0;
`;


const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
        <Link to="/" style={linkStyle}><Logo src="https://i.ibb.co/sWyFHjw/parter.png" /></Link>
        </Left>

        <Center>
          <Link to="/" style={linkStyle}> <MenuItem>Home</MenuItem> </Link>
          <Link to="/Company" style={linkStyle}> <MenuItem>Company</MenuItem></Link>
          <Link to="/Production Facilities" style={linkStyle}> <MenuItem>Production Facilities</MenuItem> </Link>
          <Link to="/Product Catalogue" style={linkStyle}> <MenuItem>Product Catalogue</MenuItem></Link>
          <Link to="/Contact Us" style={linkStyle}> <MenuItem>Contact Us</MenuItem> </Link>
        </Center>

        <Right>
            <Button $primary>B2B Login</Button>
            <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={1} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          </Link>
        </Right>

        
       
      </Wrapper>
      <Divider/>
    </Container>
  );
};

export default Navbar;
