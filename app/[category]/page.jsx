"use client"

import { useEffect, useState } from "react"
import styles from './category.module.css'

export default function CategoryProducts({ params }) {
  const { category } = params
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${category}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json();
        setProducts(data.products)
      }
      catch (error) {
        console.log(error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className={styles.container}>
      <h1 style={{ marginTop: "20px" }}>{category}</h1>
      <div className={styles['card-container']}>
        {products.map(product => (
          <div className={styles.card} key={product.id}>
            <span>{product.title}</span>
            {product.picture &&
              <img src="" alt="" />
            }
            <p>{product.description}</p>
            <span>{product.price} RSD</span>
            <button>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}