import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function AddPage() {

    let initialdata= {
        name: "", 
        description: "",
        category : "",
        image: "",
        location: "",
        postedAt: "",
        price: ""
    }
  const [formData, setFormData] = useState(initialdata);
  const navigate = useNavigate();

  const handleInputChange = (e) => {


    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log(formData)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `https://ill-cyan-sawfish-yoke.cyclic.app/products/add`
    let { name, description, category, image, location, postedAt, price } = formData

    axios.post(
        url,
        {
            name,
            description,
            category,
            image,
            location,
            postedAt,
            price
        }
    ).then((response) =>{
        console.log(response)
        if(response.data.message == "Product added successfully"){
            alert("Product added successfully")
            // navigate('/')
        }
    });
  };

  return (
    <div>
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Category:
          <select
            name="category"
            onChange={handleInputChange}
            required
          >
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="url"
            name="image"
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="postedAt"
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddPage;
