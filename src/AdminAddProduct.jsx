import React, { useState } from "react";
import axios from "./api/axios";
import "./AdminAddProduct.css";

function AdminAddProduct() {

  const [form,setForm] = useState({
    name:"",
    category:"veg",
    price:"",
    description:"",
    rating:""
  });

  const [image,setImage] = useState(null);
  const [loading,setLoading] = useState(false);

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    if(!image) return;

    try{

      setLoading(true);

      const imgData = new FormData();
      imgData.append("file",image);

      const imgRes = await axios.post("/images/upload",imgData,{
        headers:{ "Content-Type":"multipart/form-data"}
      });

      await axios.post("/products",{
        ...form,
        price:Number(form.price),
        rating:Number(form.rating),
        imageurl:imgRes.data
      });

      alert("Product added successfully!");

      setForm({
        name:"",
        category:"veg",
        price:"",
        description:"",
        rating:""
      });

      setImage(null);

    }catch(err){
      console.error(err);
      alert("Error adding product");
    }finally{
      setLoading(false);
    }
  };

  return(
    <div className="container my-5">
      <h3>Add New Product</h3>

      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AdminAddProduct;