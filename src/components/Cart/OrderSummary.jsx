import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const OrderSummary = () => {
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
    );
  };
  
export default OrderSummary;
