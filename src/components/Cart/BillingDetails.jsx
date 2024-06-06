import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const BillingDetails = () => {
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

  return (
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
  );
};

export default BillingDetails;
