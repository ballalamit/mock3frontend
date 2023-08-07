import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GetProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByDate, setSortByDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const navigate = useNavigate();



  const handlePageChangePrev = () => {
    setCurrentPage(currentPage => currentPage-1)
  }

  const handlePageChangeNext = () => {
    setCurrentPage(currentPage => currentPage+1)
  }

  

  const getProducts = (queryParams) => {

    console.log("queryParms",queryParams)

    const url = `https://ill-cyan-sawfish-yoke.cyclic.app/products?${queryParams}`;
    axios.get(url).then((response) => {
      setProducts(response.data.products);
    });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams({
      page: currentPage,
      category: categoryFilter,
      search: searchTerm,
      sortBy: 'date',
      sortOrder: sortByDate ? 'desc' : 'asc',
    }).toString();

    getProducts(queryParams);
  }, [currentPage, categoryFilter, searchTerm, sortByDate]);



  const handleBuyClick = (productId) => {
    const deleteUrl = `https://ill-cyan-sawfish-yoke.cyclic.app/products/delete/${productId}`;
    axios.delete(deleteUrl).then((response) => {
        if(response.data.message=="Product deleted successfully"){
            alert("Product deleted successfully")
          }
          getProducts();
    });
   
  };



  return (
    <div>
      <div>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
    <label>
    Sort by Date:
    <button onClick={() => setSortByDate(false)}>Sort by Old First</button>
    <button onClick={() => setSortByDate(true)}>Sort by New First</button>
    </label>


      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto' }}>
        {products.map((product) => (
          <div key={product._id} style={{ borderRadius: '10px', padding: '10px',margin: "auto", boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', width:"600px" }}>
            <img src={product.image} alt={product.image} style={{width:"300px"}} />
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Posted At: {product.postedAt}</p>
            <p>Price: {product.price}</p>
            <button onClick={() => handleBuyClick(product._id)}>Buy</button>
          </div>
        ))}
      </div>

      <div>
        <button disabled={currentPage ==1} onClick={() => handlePageChangePrev()}>Previous</button>
        <p>{currentPage}</p>
        <button   disabled={products.length < productsPerPage} onClick={() => handlePageChangeNext()}>Next</button>
      </div>
    </div>
  );
}

export default GetProducts;
