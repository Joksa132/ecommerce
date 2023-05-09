"use client"

import { useEffect, useState } from "react"
import styles from '../../products.module.css'

export default function EditProduct({ params }) {
  const { productId } = params
  const [product, setProduct] = useState({})
  const [categories, setCategories] = useState([])
  const [productName, setProductName] = useState('')
  const [productDesc, setProductDesc] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productImage, setProductImage] = useState(null)
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
        setProduct(data.product)
        setProductName(data.product.title)
        setProductDesc(data.product.description)
        setProductPrice(data.product.price)
        setProductCategory(data.product.category)
        setProductImage(data.product.image)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:3000/api/products/edit/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName, productDesc, productPrice, productCategory, productImage })
      })
      const data = await res.json();

      console.log(data)

      if (data.success) {
        setSuccess(`Product ${data.updatedProduct.title} successfully updated`)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='outer-container'>
      <form className='form-container' style={{ gap: "10px" }} onSubmit={handleSubmit}>
        <h2>Change product info</h2>
        <label htmlFor='product-name'>Product name</label>
        <input
          type="text"
          name="product-name"
          id="product-name"
          required
          className={styles["form-input"]}
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
        />
        <label htmlFor='description'>Product description</label>
        <input
          type="text"
          name="description"
          id="description"
          required
          className={styles["form-input"]}
          onChange={(e) => setProductDesc(e.target.value)}
          value={productDesc}
        />
        <label htmlFor='price'>Product price</label>
        <input
          type="number"
          name="price"
          id="price"
          required
          className={styles["form-input"]}
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
        />
        <label htmlFor="product-category">Product category</label>
        <select name="product-category" id="product-category" onChange={(e) => setProductCategory(e.target.value)}>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
        <input type="file" accept="image/*" onChange={(e) => setProductImage(e.target.files[0])} />
        <button type="submit" className="submit-button">Save</button>
        {success ?
          <span style={{ color: 'green', fontWeight: "600" }}>{success}</span>
          : <></>
        }
      </form>
    </div>
  )
}