"use client"

import { useEffect, useState } from 'react';
import styles from './home.module.css';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [randomProducts, setRandomProducts] = useState([])

  useEffect(() => {
    async function fetchRandomProducts() {
      try {
        const res = await fetch(`/api/products/random?timestamp=' + ${Date.now()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json();
        setRandomProducts(data.randomProducts)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchRandomProducts()
  }, [])

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/products/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()

      setRandomProducts(randomProducts.filter(product => product.id !== id))
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <main className={styles["home-container"]}>
      <div className={styles["image-container"]}>
        <img className={styles['cover-image']} src='/home-page-cover.jpg' alt='Cover image' />
        <button className={styles['cover-button']}>SHOP NOW</button>
      </div>
      <div className={styles["top-text"]}>
        <p>Brand new online technology store bringing you only the finest of products.</p>
      </div>
      <div className={styles["heading-container"]}>
        <h2>Check some of our products</h2>
      </div>
      <div className={styles['card-container']}>
        {randomProducts && randomProducts.length > 0 ? (
          randomProducts.map(product => (
            <ProductCard product={product} key={product.id} isCart={false} handleDelete={handleDelete} />
          ))
        ) : <></>}
      </div>
    </main>
  )
}