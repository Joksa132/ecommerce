"use client"

import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import Link from 'next/link';

export default function Cart() {
  const { cartProducts, removeFromCart } = useContext(CartContext)

  return (
    <div className="card-outer-container">
      <h1 style={{ marginTop: "20px" }}>Cart</h1>
      {cartProducts.length ?
        <div className="card-container">
          {cartProducts.map(product => (
            <div className="card" key={product.id}>
              <span>{product.title}</span>
              {product.picture &&
                <img src="" alt="" />
              }
              <p>{product.description}</p>
              <span>{product.price} RSD</span>
              <div className="card-actions">
                <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
              </div>
            </div>
          ))
          }
        </div>
        : <div className="empty-cart">
          <span>Your Cart is currently empty</span>
          <Link href={"/"}>
            <button>Return to home page</button>
          </Link>
        </div>
      }
    </div>
  )
}