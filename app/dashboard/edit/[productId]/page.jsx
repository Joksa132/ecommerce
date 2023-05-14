"use client"

import { useEffect, useState } from "react"
import styles from '../../products.module.css'
import { useForm } from 'react-hook-form';

export default function EditProduct({ params }) {
  const { productId } = params
  const [product, setProduct] = useState({})
  const [categories, setCategories] = useState([])
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:3000/api/products/get/${productId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const data = await res.json();
        setProduct({
          title: data.product.title,
          description: data.product.description,
          price: data.product.price,
          category: data.product.category,
          image: data.product.image
        })
      }
      catch (error) {
        console.log(error)
      }
    }

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

    fetchProduct()
    fetchCategories()
  }, [])

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`http://localhost:3000/api/products/edit/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const response = await res.json();

      console.log(response)

      if (response.success) {
        setSuccess(`Product ${response.updatedProduct.title} successfully updated`)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='outer-container'>
      <form className='form-container' style={{ gap: "10px" }} onSubmit={handleSubmit(onSubmit)}>
        <h2>Change product info</h2>
        <label htmlFor='product-name'>Product name</label>
        <input
          type="text"
          name="product-name"
          id="product-name"
          required
          className={styles["form-input"]}
          {...register("productName", { required: true })}
          value={product.title || ''}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
        />
        <label htmlFor='description'>Product description</label>
        <input
          type="text"
          name="description"
          id="description"
          required
          className={styles["form-input"]}
          {...register("productDesc", { required: true })}
          value={product.description || ''}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />
        <label htmlFor='price'>Product price</label>
        <input
          type="number"
          name="price"
          id="price"
          required
          className={styles["form-input"]}
          {...register("productPrice", { required: true })}
          value={product.price || ''}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <label htmlFor="product-category">Product category</label>
        <select name="product-category" id="product-category" {...register("productCategory", { required: true })}>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
        <input type="file" accept="image/*" {...register("productImage")} />
        <button type="submit" className="submit-button">Save</button>
        {success ?
          <span style={{ color: 'green', fontWeight: "600" }}>{success}</span>
          : <></>
        }
      </form>
    </div>
  )
}