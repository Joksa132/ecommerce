"use client"

import { useEffect, useState } from "react"
import styles from './category.module.css'
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import ProductCard from "../../components/ProductCard";

export default function CategoryProducts({ params }) {
  const { category } = params
  const [products, setProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [message, setMessage] = useState(null)
  const [filters, setFilters] = useState({})
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const queryString = new URLSearchParams(filters).toString();

        const res = await fetch(`/api/products/${category}?${queryString}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const data = await res.json();
        setProducts(data.products)
        setAllProducts(data.allProducts)
        setPageLoading(false)
      }
      catch (error) {
        console.log(error)
      }
    }

    fetchProducts()
  }, [filters])

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/products/delete/${id}`, {
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

  const infoFields = ['ram', 'storage', 'display', 'os', 'battery'];
  const availableInfoValues = infoFields.reduce((values, field) => {
    const uniqueValues = Array.from(new Set(allProducts.map(product => product.info?.[field]))).filter(Boolean);
    const sortedValues = uniqueValues.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    return {
      ...values,
      [field]: sortedValues
    };
  }, {});

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (value) {
        updatedFilters[field] = value;
      } else {
        delete updatedFilters[field];
      }

      return updatedFilters;
    });
  };

  return (
    <div className="card-outer-container">
      <div className={styles["heading-container"]}>
        <h1>{category}</h1>
      </div>
      {pageLoading ?
        <div className="loading-spinner"></div>
        :
        <>
          <div className="filter-container">
            {infoFields.map(field => (
              <div key={field} className="filter-group">
                <span>{field.toUpperCase()}:</span>
                {availableInfoValues[field]?.map((value) => (
                  <label key={value}>
                    <input
                      type="checkbox"
                      checked={filters[field] === value}
                      id={value}
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
        </>
      }
    </div >
  )
}