"use client"

import { useContext, useEffect, useState } from "react"
import styles from './product.module.css'
import { CartContext } from "@/app/context/cartContext"

export default function ProductDetails({ params }) {
  const { id } = params
  const [product, setProduct] = useState({})
  const { cartProducts, addToCart, removeFromCart } = useContext(CartContext)

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
        {
          cartProducts.some((item) => item.id === product.id) ?
            <button onClick={() => removeFromCart(product.id)} className={styles["cart-button"]}>Remove from Cart</button>
            : <button onClick={() => addToCart(product)} className={styles["cart-button"]}>Add to Cart</button>
        }
      </div>
    </div>
  )
}