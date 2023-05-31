"use client"

import { useContext, useEffect, useState } from 'react';
import styles from './home.module.css';
import Link from 'next/link';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { UserContext } from './context/userContext';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState();
  const [randomProducts, setRandomProducts] = useState([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    async function fetchRandomProducts() {
      try {
        const res = await fetch('http://localhost:3000/api/products/random', {
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
      pageUrl: '/laptops',
      alt: 'laptop image',
      name: 'Laptops',
    },
    {
      url: 'https://images.pexels.com/photos/7679474/pexels-photo-7679474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      pageUrl: '/phones',
      alt: 'phone image',
      name: 'Phones',
    },
    {
      url: 'https://images.pexels.com/photos/1251844/pexels-photo-1251844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      pageUrl: '/tablets',
      alt: 'tablet image',
      name: 'Tablets',
    },
    {
      url: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      pageUrl: '/computers',
      alt: 'computer image',
      name: 'Computers',
    },
    {
      url: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      pageUrl: '/gaming',
      alt: 'gaming image',
      name: 'Gaming',
    },
  ]

  function handleChange(index) {
    setCurrentIndex(index);
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
                <Link href={'/user/login'}>
                  <button>Login for Actions</button>
                </Link>
              }
            </div>
          ))
        ) : <></>}
      </div>
    </main>
  )
}
