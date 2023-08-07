import React from 'react'
import { Link as ReactLink } from 'react-router-dom'

function Navbar() {
  return (
    <div style={{display: "flex" , justifyContent: "space-evenly" , border: "1px solid black"}}>
        <ReactLink to={"/"} >All Products</ReactLink>
        <ReactLink to={"/add"} >Add Products</ReactLink>
    </div>
  )
}

export default Navbar