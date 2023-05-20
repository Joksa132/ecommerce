"use client"

import { useContext, useState } from 'react';
import { CartContext } from '../context/cartContext';
import Link from 'next/link';
import { UserContext } from '../context/userContext';

export default function Cart() {
  const { cartProducts, removeFromCart } = useContext(CartContext)
  const [productQuantities, setProductQuantities] = useState({})
  const { user } = useContext(UserContext)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleQuantityChange = (event, productId) => {
    const newQuantities = { ...productQuantities }
    newQuantities[productId] = event.target.value
    setProductQuantities(newQuantities)
  }

  const calculateTotalPrice = () => {
    let totalPrice = 0
    for (const product of cartProducts) {
      const quantity = productQuantities[product.id] || 1
      const productPrice = product.price * quantity
      totalPrice += productPrice
    }
    return totalPrice;
  }

  const handleOrderClick = async () => {
    try {
      const products = cartProducts.map((product) => ({
        ...product,
        quantity: productQuantities[product.id] || 1,
      }))

      const res = await fetch('http://localhost:3000/api/transactions', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.userId,
          products
        })
      })
      const data = await res.json();
      console.log(data)

      if (data.success) {
        cartProducts.forEach((product) => removeFromCart(product.id))
        setSuccessMessage("Order successfully created");
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="card-outer-container">
      <h1 style={{ marginTop: "20px" }}>Cart</h1>
      {cartProducts.length ?
        <>
          <div className="total-price">
            <span>Total Price: {calculateTotalPrice()} RSD</span>
            <button onClick={handleOrderClick}>Order</button>
          </div>
          <div className="card-container">
            {cartProducts.map(product => (
              <div className="card" key={product.id}>
                <span>{product.title}</span>
                {product.picture &&
                  <img src="" alt="" />
                }
                <p>{product.description}</p>
                <span>{product.price} RSD</span>
                <div className="product-quantity">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="number"
                    value={productQuantities[product.id] || 1}
                    onChange={(event) => handleQuantityChange(event, product.id)}
                    min={1}
                    id='quantity'
                    style={{ marginBottom: "10px" }}
                  />
                </div>
                <div className="card-actions">
                  <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
                </div>
              </div>
            ))
            }
          </div>
        </>
        : <div className="empty-cart">
          {successMessage ?
            <>
              <span>{successMessage}</span>
              <Link href={"/orders"}>
                <button>Track your order status</button>
              </Link>
            </> :
            <>
              <span>Your Cart is currently empty</span>
              <Link href={"/"}>
                <button>Return to home page</button>
              </Link>
            </>
          }
        </div>
      }
    </div>
  )
}