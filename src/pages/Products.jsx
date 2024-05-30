import React from 'react'
// import Table from '../components/Table'
import Sidebar from '../components/Sidebar'
import NavbarAdmin from '../components/Navbar_admin'
import ManageProduct from '../components/Products/ManageProduct'

const Products = () => {
  return (
    <div >
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2}}>
      <NavbarAdmin />
    </div>
    <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, zIndex: 1}} >
       <Sidebar/>
    </div>
    <ManageProduct/>
  </div>
  )
}

export default Products
