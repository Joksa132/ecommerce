"use client"

import { useEffect, useState } from 'react';
import styles from './home.module.css';
import Link from 'next/link';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ProductCard from './components/ProductCard';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState();
  const [randomProducts, setRandomProducts] = useState([])

  useEffect(() => {
    async function fetchRandomProducts() {
      try {
        const res = await fetch('/api/products/random', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json();
        setRandomProducts(data.randomProducts)
      } catch (error) {
        console.log(error)
      }
    }

    fetchRandomProducts()
  }, [])

  const images = [
    {
      url: 'https://images.pexels.com/photos/7679456/pexels-photo-7679456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      pageUrl: '/Laptops',
      alt: 'laptop image',
      name: 'Laptops',
    },
    {
      url: 'https://images.pexels.com/photos/7679474/pexels-photo-7679474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      pageUrl: '/Phones',
      alt: 'phone image',
      name: 'Phones',
    },
    {
      url: 'https://images.pexels.com/photos/1251844/pexels-photo-1251844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      pageUrl: '/Tablets',
      alt: 'tablet image',
      name: 'Tablets',
    },
    {
      url: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      pageUrl: '/Computers',
      alt: 'computer image',
      name: 'Computers',
    },
  ]

  function handleChange(index) {
    setCurrentIndex(index);
  }

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
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        selectedItem={images[currentIndex]}
        onChange={handleChange}
        showThumbs={false}
        className={styles["carousel-container"]}
      >
        {images.map((image) => (
          <div key={image.alt}>
            <div className={styles['image-container']}>
              <img src={image.url} alt={image.alt} className={styles['carousel-image']} />
              <Link href={image.pageUrl}>
                <button className={styles['image-link']}>Check {image.name}!</button>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
      <h2 style={{ marginTop: "20px" }}>Check some of our products</h2>
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