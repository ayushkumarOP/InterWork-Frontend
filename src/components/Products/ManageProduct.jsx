import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UploadIcon from '@mui/icons-material/Upload';
import { Editor } from '@tinymce/tinymce-react';

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  margin-top: 120px;
  margin-left: 235px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 300px;
`;

const ImageUpload = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UploadButton = styled.label`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FileInput = styled.input`
  display: none;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const ResetButton = styled(Button)`
  background-color: #ffa500;
  color: #fff;
`;

const AddProductButton = styled(Button)`
  background-color: #28a745;
  color: #fff;
`;

const VariantContainer = styled.div`
  margin-bottom: 20px;
`;

const VariantInputField = styled(InputField)`
  width: 250px;
`;

const AddVariantButton = styled(Button)`
  background-color: #007bff;
  color: #fff;
`;

const ManageProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [variants, setVariants] = useState([]);

  const handleAddVariant = () => {
    setVariants([...variants, { type: '', options: '' }]);
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const handleRemoveVariant = (index) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('variants', JSON.stringify(variants));
    formData.append('myfile', image);

    try {
      const response = await axios.post('http://localhost:5005/apu/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if(response.status === 200){
        setName(''); setDescription(''); setImage(null); setVariants([]);
        alert("Product added successfully");
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setName('');
    setDescription('');
    setImage(null);
    setVariants([]);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Wrapper>
      <Container>
        <Title>Manage Products</Title>
        <InputField
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Title>Product Description</Title>
        <Editor
          apiKey="cihhcazgrqyhznr0a50t28r0l0j6dc8z6z683qpyu1dzmzb9" // You can get an API key from the TinyMCE website
          value={description}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
          }}

          onEditorChange={(content) => setDescription(content)}
        />
        <Title>Product Image</Title>
        <ImageUpload>
          <UploadButton htmlFor="file-upload">
            <UploadIcon /> Upload
          </UploadButton>
          <FileInput
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <p>Recommended Size: 131x131 pixels</p>
        </ImageUpload>
        <VariantContainer>
          <Title>Variants</Title>
          {variants.map((variant, index) => (
            <div key={index}>
              <VariantInputField
                type="text"
                placeholder="Variant type (e.g., size)"
                value={variant.type}
                onChange={(e) => handleVariantChange(index, 'type', e.target.value)}
              />
              <VariantInputField
                type="text"
                placeholder="Options (comma separated, e.g., S,M,L,XL)"
                value={variant.options}
                onChange={(e) => handleVariantChange(index, 'options', e.target.value)}
              />
              <Button onClick={() => handleRemoveVariant(index)}>Remove</Button>
            </div>
          ))}
          <AddVariantButton onClick={handleAddVariant}>Add Variant</AddVariantButton>
        </VariantContainer>
        <ActionButtons>
          <ResetButton onClick={handleReset}>Reset</ResetButton>
          <AddProductButton onClick={handleSubmit}>Add Product</AddProductButton>
        </ActionButtons>
      </Container>
    </Wrapper>
  );
};

export default ManageProduct;
