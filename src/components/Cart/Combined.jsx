import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const FormContainer = styled.div`
  flex: 2;
  max-width: 600px; 
  margin-right: 20px;
`;

const SummaryContainer = styled.div`
  flex: 1;
  max-width: 520px; 
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
`;

const Summary = styled.div`
  padding: 20px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: white;
  background-color: #ff0000;
  padding: 10px 20px;
  border-radius: 8px 8px 0 0;
  margin: -20px -20px 20px -20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  font-weight: bold;
  text-align: left;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
`;

const ImageCell = styled.td`
  padding: 10px;
  width: 50px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Buttonq = styled.button`
  width: 100%;
  padding: 10px;
  background-color: red;
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Combined = () => {
  const [countries, setCountries] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const cart = useSelector(state => state.cart);
  console.log(cart);
  

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countryNames = response.data.map(country => country.name.common);
        setCountries(countryNames.sort());
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  useEffect(() => {
    calculateTotals(cart.products);
  }, [cart]);

  const calculateTotals = (data) => {
    const subtotal = data.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const finalTotal = subtotal * 1.05;

    setSubtotal(subtotal.toFixed(2));
    setTotal(finalTotal.toFixed(2));
  };

  const handleQuotationRequest = async () => {
    try {
      const formData = {
        products: cart.products.map(product => ({
          productId: product._id || product.productId,
          quantity: product.quantity,
        })),
        total,
        billingDetails: {fullName, email, phone, country, address},
      };
      const response = await axios.post('http://localhost:5005/api/quotation/quotation-request', formData);
      console.log('Quotation request submitted successfully:', response.data);
      alert("Quotation Request is send")
    } catch (err) {
      console.error('Failed to submit quotation request:', err);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const formData = {
        products: cart.products.map(product => ({
          productId: product._id,
          quantity: product.quantity,
        })),
        total,
      };
      
      const response = await axios.post('http://localhost:5005/api/orders/place-order', formData);
      console.log('Order placed successfully:', response.data);
      alert("Order is placed");
    } catch (err) {
      console.error('Failed to place order:', err);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Form>
          <Heading>Billing Details</Heading>
          <Label>Full Name</Label>
          <Input type="text" name="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />

          <Label>Email Address</Label>
          <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <Label>Phone</Label>
          <Input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

          <Label>Country</Label>
          <Select name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </Select>

          <Label>Street Address</Label>
          <Input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form>
      </FormContainer>
      <SummaryContainer>
        <Summary>
          <Title>YOUR ORDER</Title>
          <Table>
            <thead>
              <tr>
                <TableHeader>IMAGE</TableHeader>
                <TableHeader>DESCRIPTION</TableHeader>
                <TableHeader>QUANTITY</TableHeader>
                <TableHeader>TOTAL</TableHeader>
              </tr>
            </thead>
            <tbody>
              {cart.products.map((item, index) => (
                <TableRow key={index}>
                  <ImageCell>
                    <Image src={item.image} alt="Product" />
                  </ImageCell>
                  <TableCell>
                    {decodeURIComponent(item.name)}
                  </TableCell>
                  <TableCell>
                    {item.quantity}
                  </TableCell>
                  <TableCell>
                    ₹ {(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
          <p>Subtotal: ₹ {subtotal}</p>
          <p>TOTAL: ₹ {total}</p>
          <Buttonq onClick={handleQuotationRequest}>QUOTATION REQUEST &gt;&gt;</Buttonq>
          <Button onClick={handlePlaceOrder}>PLACE ORDER &gt;&gt;</Button>
        </Summary>
      </SummaryContainer>
    </Container>
  );
};

export default Combined;
