import React from 'react'
import {Routes, Route} from 'react-router-dom'
import AddPage from '../Pages/AddPage'
import GetProducts from '../Pages/GetProducts'

function AllRoutes() {
  return (
    <div>
          <Routes >
            <Route path='/' element={<GetProducts />} />
            <Route path='/add' element={<AddPage/>} />
        </Routes>
    </div>
  )
}

export default AllRoutes