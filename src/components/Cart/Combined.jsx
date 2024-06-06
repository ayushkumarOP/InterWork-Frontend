import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  max-width: 400px; 
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

    
    const [data, setData] = useState([
      {
        image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg',
        description: 'A01-0321 Push Pull Switch (On Off) 1 × ₹0',
        total: '₹ 100',
      },
    ]);
  
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://api.example.com/orders');
          setData(response.data);
          calculateTotals(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const calculateTotals = (data) => {
      const subtotal = data.reduce((sum, item) => {
        const itemPrice = parseFloat(item.total.replace('₹ ', ''));
        return sum + itemPrice;
      }, 0);
  
      const finalTotal = subtotal * 1.05;
  
      setSubtotal(subtotal.toFixed(2));
      setTotal(finalTotal.toFixed(2));
    };
  
    return (
        <Container>
            <FormContainer>
                <Form>
                    <Heading>Billing Details</Heading>
                    <Label>Full Name</Label>
                    <Input type="text" name="name" />
                    
                    <Label>Email Address</Label>
                    <Input type="email" name="email" />
                    
                    <Label>Phone</Label>
                    <Input type="text" name="phone" />
                    
                    <Label>Country</Label>
                    <Select name="country">
                        <option value="">Select Country</option>
                        {countries.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                        ))}
                    </Select>
                    
                    <Label>Street Address</Label>
                    <Input type="text" name="address" />
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
                <TableHeader>TOTAL</TableHeader>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                <TableRow key={index}>
                    <ImageCell>
                    <Image src={item.image} alt="Product" />
                    </ImageCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.total}</TableCell>
                </TableRow>
                ))}
            </tbody>
            </Table>
            <p>Subtotal: ₹ {subtotal}</p>
            <p>TOTAL: ₹ {total}</p>
            <Buttonq>QUOTATION REQUEST &gt;&gt;</Buttonq>
            <Button>PLACE ORDER &gt;&gt;</Button>
        </Summary>
      </SummaryContainer>
      </Container>
    );
  };
  
export default Combined;
