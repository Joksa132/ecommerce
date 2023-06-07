"use client"

import { useContext, useEffect, useState } from "react"
import styles from './product.module.css'
import { CartContext } from "@/app/context/cartContext"
import { UserContext } from "@/app/context/userContext"
import Link from "next/link"

export default function ProductDetails({ params }) {
  const { id } = params
  const [product, setProduct] = useState({})
  const { cartProducts, addToCart, removeFromCart } = useContext(CartContext)
  const { user } = useContext(UserContext)

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
        <img src={product.picture} alt={product.title} />
      </div>
      <div className={styles["product-info"]}>
        <h2 style={{ marginBottom: "30px" }}>{product.title}</h2>
        <p style={{ marginBottom: "30px" }}>Description: {product.description}</p>
        {product.info &&
          <div className={styles["product-additional-info"]}>
            <span>RAM memory: {product.info.ram}GB</span>
            <span>Storage memory: {product.info.storage}</span>
            <span>Resolution: {product.info.display}</span>
            <span>Camera: {product.info.camera}</span>
            <span>Battery: {product.info.battery}mAh</span>
            <span>Operating system: {product.info.os}</span>
            <span>Processor: {product.info.processor}</span>
          </div>
        }
        <span>Price: {product.price} RSD</span>
        {
          user ? <>
            {
              cartProducts.some((item) => item.id === product.id) ?
                <button onClick={() => removeFromCart(product.id)} className={styles["cart-button"]}>Remove from Cart</button>
                : <button onClick={() => addToCart(product)} className={styles["cart-button"]}>Add to Cart</button>}
          </>
            : <Link href={'/user/login'}>
              <button className={styles["login-button"]}>Login to Order</button>
            </Link>
        }
      </div>
    </div>
  )
}