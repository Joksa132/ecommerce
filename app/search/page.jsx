"use client"

import { useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import Link from "next/link";
import { CartContext } from '../context/cartContext';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const productQuery = searchParams.get('product');
  const [products, setProducts] = useState([])
  const { user } = useContext(UserContext)
  const { cartProducts, addToCart, removeFromCart } = useContext(CartContext)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/get/all/${productQuery}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await res.json();

        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
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

      setProducts(products.filter(product => product.id !== id))
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='card-outer-container'>
      <h1 style={{ marginTop: "20px" }}>Search results for {productQuery}</h1>
      {products.length ?
        <div className='card-container'>
          {products.map(product => (
            <div className="card" key={product.id}>
              <span>{product.title}</span>
              {product.picture &&
                <img src="" alt="" />
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
                    <Link href={`${product.categories[0].name}/${product.id}`}>
                      <button>View Details</button>
                    </Link>
                    {
                      cartProducts.some((item) => item.id === product.id) ?
                        <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
                        : <button onClick={() => addToCart(product)}>Add to Cart</button>
                    }
                  </div> :
                <Link href={'/user/login'}>
                  <button>Login for Actions</button>
                </Link>
              }
            </div>
          ))}
        </div> :
        <div style={{ fontSize: "2rem", marginTop: "30px" }}>
          No products matching <span style={{ fontWeight: "bold" }}>{productQuery}</span>
        </div>
      }
    </div>
  )
}