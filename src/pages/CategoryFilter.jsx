import React from 'react'
import Navbar from '../components/Navbar'
import Footer from "../components/Footer"
import Categorybar from '../components/Category/Categorybar'
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  min-height: 98.5vh;
  flex-direction: column;
  padding-top:70px;
`

const CategoryFilter = () => {
  return (
    <Container>
      <Navbar/>
      <Categorybar/>
      <Footer/>
    </Container>
  )
}

export default CategoryFilter
