"use client"

import { useContext, useEffect, useState } from "react"
import styles from './category.module.css'
import { UserContext } from "../context/userContext"

export default function CategoryProducts({ params }) {
  const { category } = params
  const [products, setProducts] = useState([])
  const { user } = useContext(UserContext)

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
            {
              user.role === "ADMIN" ?
                <div className={styles["admin-actions"]}>
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
                :
                <button>Add to cart</button>
            }
          </div>
        ))}
      </div>
    </div>
  )
}