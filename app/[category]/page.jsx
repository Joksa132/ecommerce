"use client"

import { useEffect, useState } from "react"
import styles from './category.module.css'
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import ProductCard from "../components/ProductCard";

export default function CategoryProducts({ params }) {
  const { category } = params
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState(null)

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

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/products/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      setMessage(data.deletedProduct)
      setProducts(products.filter(product => product.id !== id))
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="card-outer-container">
      <h1 style={{ marginTop: "20px" }}>{category}</h1>
      <div className="filter-container">

      </div>
      {message ?
        <div className={styles["message-container"]}>
          <span>{message.title} has been deleted!</span>
          <Icon
            path={mdiClose}
            size={1}
            style={{ cursor: "pointer" }}
            onClick={() => setMessage(null)}
          />
        </div> : <></>}
      <div className='card-container'>
        {products.map(product => (
          <ProductCard product={product} key={product.id} isCart={false} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}