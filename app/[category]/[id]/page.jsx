"use client"

import { useEffect, useState } from "react"
import styles from './product.module.css'

export default function ProductDetails({ params }) {
  const { id } = params
  const [product, setProduct] = useState({})

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:3000/api/products/get/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json();
        setProduct(data.product)
      }
      catch (error) {
        console.log(error)
      }
    }

    fetchProduct()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles["product-image"]}>
        <span>Image Placeholder</span>
      </div>
      <div className={styles["product-info"]}>
        <h2 style={{ marginBottom: "30px" }}>{product.title}</h2>
        <p style={{ marginBottom: "30px" }}>Description: {product.description}</p>
        <span>Price: {product.price} RSD</span>
      </div>
    </div>
  )
}