"use client"

import { useContext, useState } from 'react';
import { CartContext } from '../../context/cartContext';
import Link from 'next/link';
import { UserContext } from '../../context/userContext';
import ProductCard from '../../components/ProductCard';

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
    return totalPrice.toFixed(3);
  }

  const handleOrderClick = async () => {
    try {
      const products = cartProducts.map((product) => ({
        ...product,
        quantity: productQuantities[product.id] || 1,
      }))

      const res = await fetch('/api/transactions/new', {
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

  const totalPrice = calculateTotalPrice();

  return (
    <div className="card-outer-container container">
      <div className="product-page-header">
        <h2>Cart</h2>
      </div>
      {cartProducts.length ?
        <>
          <div className="total-price">
            <span>Total Price: {totalPrice} RSD</span>
            <button onClick={handleOrderClick}>Order</button>
          </div>
          <div className="card-container">
            {cartProducts.map(product => (
              <ProductCard
                product={product}
                key={product.id}
                isCart={true}
                handleQuantityChange={handleQuantityChange}
                productQuantities={productQuantities}
              />
            ))
            }
          </div>
        </>
        : <div className="empty-cart">
          {successMessage ?
            <>
              <span>{successMessage}</span>
              <Link className='cart-button-container' href={"/orders"}>
                <button>Track your order status</button>
              </Link>
            </> :
            <>
              <span>Your Cart is currently empty</span>
              <Link className='cart-button-container' href={"/"}>
                <button>Return to home page</button>
              </Link>
            </>
          }
        </div>
      }
    </div>
  )
}