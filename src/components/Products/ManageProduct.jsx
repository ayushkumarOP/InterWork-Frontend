import React, { useState, useEffect } from 'react';
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

const SelectField = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 300px;
`;

const SelectWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
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

const CategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [variants, setVariants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    // Fetch categories from the server
    axios.get('http://localhost:5005/apii/categories')
      .then(response =>
         setCategories(response.data)
        )
      .catch(error => console.error(error));
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    // Fetch subcategories based on the selected category
    axios.get(`http://localhost:5005/apii/subcategories?category=${encodeURIComponent(category)}`)
      .then(response => setSubcategories(response.data))
      .catch(error => console.error(error));

    setSelectedSubcategory('');
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleAddVariant = () => {
    setVariants([...variants, { type: '', options: '' }]);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
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

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', encodeURIComponent(name));
    formData.append('description', description);
    formData.append('variants', JSON.stringify(variants));
    formData.append('category', selectedCategory);
    formData.append('subcategory', selectedSubcategory);
    formData.append('price', price);
    formData.append('myfile', image);
    

    try {
      const response = await axios.post('http://localhost:5005/apu/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setName('');
        setDescription('');
        setImage(null);
        setVariants([]);
        setSelectedCategory('');
        setSelectedSubcategory('');
        setPrice('');
        alert("Product added successfully");
        document.getElementById('file-upload').value = ''; 
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
    setSelectedCategory('');
    setSelectedSubcategory('');
    setPrice('');
    document.getElementById('file-upload').value = ''; 

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
        <Title>Price</Title>
        <InputField
          type="text"
          placeholder="Enter price"
          value={price}
          onChange={handlePriceChange}
          required
        />
        <Title>Category Selection</Title>
        <SelectWrapper>
              <SelectField value={selectedCategory} onChange={handleCategoryChange} required>
              <option value="" disabled>Select category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{decodeURIComponent(category)}</option>
              ))}
            </SelectField>
          <SelectField value={selectedSubcategory} onChange={handleSubcategoryChange} required>
            <option value="" disabled>Select subcategory</option>
            {subcategories.map((subcategory, index) => (
              <option key={index} value={subcategory}>{decodeURIComponent(subcategory)}</option>
            ))}
          </SelectField>
        </SelectWrapper>
        <Title>Product Description</Title>
        <Editor
          apiKey="cihhcazgrqyhznr0a50t28r0l0j6dc8z6z683qpyu1dzmzb9" 
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

export default CategoryForm;

