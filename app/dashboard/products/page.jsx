"use client"

import { useContext, useEffect, useState } from 'react'
import styles from '../products.module.css'
import { UserContext } from '@/app/context/userContext'
import { useForm } from 'react-hook-form';

export default function AdminProducts() {
  const { user } = useContext(UserContext)
  const [categories, setCategories] = useState([])
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  if (user?.role !== "ADMIN") throw new Error("ERROR TEST")

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('http://localhost:3000/api/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const data = await res.json();
        setCategories(data.categories)
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchCategories()
  }, [])

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append("productName", data.productName)
      formData.append("productDesc", data.productDesc);
      formData.append("productPrice", data.productPrice);
      formData.append("productCategory", data.productCategory);
      formData.append("productImage", data.productImage[0]);

      const res = await fetch('http://localhost:3000/api/products/new', {
        method: 'POST',
        body: formData
      })
      const response = await res.json();

      if (response.success) {
        setSuccess(`Product ${response.product.title} successfully created`)
        setError(null)
      } else {
        setError(response.error)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='outer-container'>
      <form className='form-container' style={{ gap: "10px" }} onSubmit={handleSubmit(onSubmit)}>
        <h2>Add a new product</h2>
        <label htmlFor='product-name'>Product name</label>
        <input
          type="text"
          name="product-name"
          id="product-name"
          required
          className={styles["form-input"]}
          {...register("productName", { required: true })}
        />
        <label htmlFor='description'>Product description</label>
        <input
          type="text"
          name="description"
          id="description"
          required
          className={styles["form-input"]}
          {...register("productDesc", { required: true })}
        />
        <label htmlFor='price'>Product price</label>
        <input
          type="number"
          name="price"
          id="price"
          required
          className={styles["form-input"]}
          {...register("productPrice", { required: true })}
        />
        <label htmlFor="product-category">Product category</label>
        <select
          name="product-category"
          id="product-category"
          {...register("productCategory", { required: true })}
          style={{ padding: "0.5rem", border: "1px solid black", borderRadius: "5px" }}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
        <input type="file" name="productImage" accept="image/*" {...register("productImage")} />
        <button type="submit" className="submit-button">Submit</button>
        {error ?
          <span style={{ color: 'red', fontWeight: "600" }}>{error}</span>
          : <></>}
        {success ?
          <span style={{ color: 'green', fontWeight: "600" }}>{success}</span>
          : <></>
        }
      </form>
    </div>
  )
}