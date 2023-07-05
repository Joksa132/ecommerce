"use client"

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const productQuery = searchParams.get('product');
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products/get/all/${productQuery}`, {
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
  }, [productQuery])

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/products/delete/${id}`, {
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
      <div className="heading-container">
        <h1>Search results for <span style={{ fontStyle: "italic" }}>{productQuery}</span></h1>
      </div>
      {products.length ?
        <div className='card-container'>
          {products.map(product => (
            < ProductCard product={product} key={product.id} isCart={false} handleDelete={handleDelete} />
          ))}
        </div> :
        <div style={{ fontSize: "2rem", marginTop: "30px" }}>
          No products matching <span style={{ fontWeight: "bold" }}>{productQuery}</span>
        </div>
      }
    </div>
  )
}