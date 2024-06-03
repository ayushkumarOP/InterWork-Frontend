import React from 'react'
import Navbar from '../components/Navbar'
import EndCredit from "../components/EndCredit"
import Footer from "../components/Footer"
import Categorybar from '../components/Category/Categorybar'

const CategoryFilter = () => {
  return (
    <>
      <Navbar/>
      <Categorybar/>
      <Footer/>
      <EndCredit/>
    </>
  )
}

export default CategoryFilter
