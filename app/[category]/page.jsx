"use client"

import { useContext, useEffect, useState } from "react"
import styles from './category.module.css'
import { UserContext } from "../context/userContext"
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import Link from "next/link";
import { CartContext } from "../context/cartContext";

export default function CategoryProducts({ params }) {
  const { category } = params
  const [products, setProducts] = useState([])
  const { user } = useContext(UserContext)
  const { cartProducts, addToCart, removeFromCart } = useContext(CartContext)
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
          <div className="card" key={product.id}>
            <span>{product.title}</span>
            {product.picture &&
              <img src={product.picture} alt="Product Picture" />
            }
            <p>{product.description}</p>
            <span>{product.price} RSD</span>
            {user ?
              user.role === "ADMIN" ?
                <div className="card-actions">
                  <Link href={`/dashboard/edit/${product.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </div>
                :
                <div className="card-actions">
                  <Link href={`/${category}/${product.id}`}>
                    <button>View Details</button>
                  </Link>
                  {
                    cartProducts.some((item) => item.id === product.id) ?
                      <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
                      : <button onClick={() => addToCart(product)}>Add to Cart</button>
                  }
                </div> :
              <div className="card-actions">
                <Link href={`/${category}/${product.id}`}>
                  <button>View Details</button>
                </Link>
                <Link href={'/user/login'}>
                  <button>Login to Order</button>
                </Link>
              </div>

            }
          </div>
        ))}
      </div>
    </div>
  )
}