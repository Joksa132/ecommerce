"use client"

import { useState } from 'react';
import styles from './home.module.css';
import Link from 'next/link';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState();

  const images = [
    {
      url: 'https://images.pexels.com/photos/7679456/pexels-photo-7679456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      pageUrl: '/laptops',
      alt: 'laptop image'
    },
    {
      url: 'https://images.pexels.com/photos/7679474/pexels-photo-7679474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      pageUrl: '/phones',
      alt: 'phone image'
    },
    {
      url: 'https://images.pexels.com/photos/1251844/pexels-photo-1251844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      pageUrl: '/tablets',
      alt: 'tablet image'
    },
    {
      url: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      pageUrl: '/computers',
      alt: 'computer image'
    },
    {
      url: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      pageUrl: '/gaming',
      alt: 'gaming image'
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
            <img src={image.url} alt={image.alt} className='carousel-image' />
            <Link href={image.pageUrl}>
              <button className={styles['image-link']}></button>
            </Link>
          </div>
        ))}
      </Carousel>
    </main>
  )
}
