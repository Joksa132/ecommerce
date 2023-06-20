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
  const [filters, setFilters] = useState({
    ram: '',
    storage: '',
    display: '',
    camera: '',
    battery: '',
    os: '',
    processor: '',
  })

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

  const infoFields = ['processor', 'display', 'ram', 'os', 'battery', 'camera', 'storage',];
  const availableInfoValues = infoFields.reduce((values, field) => {
    const uniqueValues = Array.from(new Set(products.map(product => product.info?.[field]))).filter(Boolean);
    return {
      ...values,
      [field]: uniqueValues
    };
  }, {});

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  console.log(filters)

  return (
    <div className="card-outer-container">
      <h1 style={{ marginTop: "20px" }}>{category}</h1>
      <div className="filter-container">
        {infoFields.map(field => (
          <div key={field} className="filter-group">
            <span>{field}:</span>
            {availableInfoValues[field]?.map((value) => (
              <label key={value}>
                <input
                  type="checkbox"
                  checked={filters[field] === value}
                  onChange={(e) =>
                    handleFilterChange(field, e.target.checked ? value : '')
                  }
                />
                {value}
              </label>
            ))}
          </div>
        ))}
      </div>
      {
        message ?
          <div className={styles["message-container"]}>
            <span>{message.title} has been deleted!</span>
            <Icon
              path={mdiClose}
              size={1}
              style={{ cursor: "pointer" }}
              onClick={() => setMessage(null)}
            />
          </div> : <></>
      }
      <div className='card-container'>
        {products.map(product => (
          <ProductCard product={product} key={product.id} isCart={false} handleDelete={handleDelete} />
        ))}
      </div>
    </div >
  )
}