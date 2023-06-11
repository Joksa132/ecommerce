"use client"

import { useEffect, useState } from "react"
import styles from '../../products.module.css'
import { useForm } from 'react-hook-form';

export default function EditProduct({ params }) {
  const { productId } = params
  const [product, setProduct] = useState({})
  const [categories, setCategories] = useState([])
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:3000/api/products/get/${productId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const data = await res.json();
        setProduct({
          title: data.product.title,
          description: data.product.description,
          price: data.product.price,
          category: data.product.category,
          image: data.product.image,
          info: data.product.info,
        })
      }
      catch (error) {
        console.log(error)
      }
    }

    async function fetchCategories() {
      try {
        const res = await fetch('http://localhost:3000/api/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const data = await res.json();
        setCategories(data.categories)
      }
      catch (error) {
        console.log(error)
      }
    }

    fetchProduct()
    fetchCategories()
  }, [])

  const uploadImage = async (imageFile) => {
    const imageFormData = new FormData();
    imageFormData.append('file', imageFile);
    imageFormData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET);

    const imageUpload = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/upload`, {
      method: 'POST',
      body: imageFormData,
    });
    const imageResponse = await imageUpload.json();
    return imageResponse.url
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()

      if (data.productImage[0]) {
        const imageUrl = await uploadImage(data.productImage[0]);
        setProduct({ ...product, picture: imageUrl })
      }

      formData.append("product", JSON.stringify(product))

      const res = await fetch(`http://localhost:3000/api/products/edit/${productId}`, {
        method: 'PUT',
        body: formData
      })
      const response = await res.json();

      if (response.success) {
        setSuccess(`Product ${response.updatedProduct.title} successfully updated`)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='outer-container'>
      <form className='form-container' style={{ gap: "10px" }} onSubmit={handleSubmit(onSubmit)}>
        <h2>Change product info</h2>
        <div className="main-info">
          <label htmlFor='product-name'>Product name</label>
          <input
            type="text"
            name="product-name"
            id="product-name"
            required
            className={styles["form-input"]}
            {...register("productName", { required: true })}
            value={product.title || ''}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
          />
          <label htmlFor='description'>Product description</label>
          <input
            type="text"
            name="description"
            id="description"
            required
            className={styles["form-input"]}
            {...register("productDesc", { required: true })}
            value={product.description || ''}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
          <label htmlFor='price'>Product price</label>
          <input
            type="number"
            name="price"
            id="price"
            min="1"
            required
            className={styles["form-input"]}
            {...register("productPrice", { required: true })}
            value={product.price || ''}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
          <label htmlFor="product-category">Product category</label>
          <select
            name="product-category"
            id="product-category"
            {...register("productCategory", { required: true })}
            className={styles["form-select"]}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
          <input type="file" accept="image/*" {...register("productImage")} />
        </div>
        <div className="additional-info">
          <div className="input-group">
            <label htmlFor='product-ram'>RAM memory</label>
            <input
              type="number"
              name="product-ram"
              id="product-ram"
              min="1"
              required
              className={styles["form-input"]}
              {...register("productRam", { required: true })}
              value={product.info?.ram || ''}
              onChange={(e) => setProduct({ ...product, info: { ...product.info, ram: e.target.value } })}
            />
          </div>
          <div className="input-group">
            <label htmlFor='product-storage'>Storage memory</label>
            <input
              type="text"
              name="product-storage"
              id="product-storage"
              required
              className={styles["form-input"]}
              {...register("productStorage", { required: true })}
              value={product.info?.storage || ''}
              onChange={(e) => setProduct({ ...product, info: { ...product.info, storage: e.target.value } })}
            />
          </div>
          <div className="input-group">
            <label htmlFor='product-cpu'>Processor</label>
            <input
              type="text"
              name="product-cpu"
              id="product-cpu"
              required
              className={styles["form-input"]}
              {...register("productProcessor", { required: true })}
              value={product.info?.processor || ''}
              onChange={(e) => setProduct({ ...product, info: { ...product.info, processor: e.target.value } })}
            />
          </div>
          <div className="input-group">
            <label htmlFor='product-battery'>Battery</label>
            <input
              type="number"
              name="product-battery"
              id="product-battery"
              min="1"
              required
              className={styles["form-input"]}
              {...register("productBattery", { required: true })}
              value={product.info?.battery || ''}
              onChange={(e) => setProduct({ ...product, info: { ...product.info, battery: e.target.value } })}
            />
          </div>
          <div className="input-group">
            <label htmlFor='product-camera'>Camera</label>
            <input
              type="text"
              name="product-camera"
              id="product-camera"
              required
              className={styles["form-input"]}
              {...register("productCamera", { required: true })}
              value={product.info?.camera || ''}
              onChange={(e) => setProduct({ ...product, info: { ...product.info, camera: e.target.value } })}
            />
          </div>
          <div className="input-group">
            <label htmlFor='product-os'>Operating system</label>
            <input
              type="text"
              name="product-os"
              id="product-os"
              required
              className={styles["form-input"]}
              {...register("productOs", { required: true })}
              value={product.info?.os || ''}
              onChange={(e) => setProduct({ ...product, info: { ...product.info, os: e.target.value } })}
            />
          </div>
          <div className="input-group">
            <label htmlFor='product-display'>Display</label>
            <input
              type="text"
              name="product-display"
              id="product-display"
              required
              className={styles["form-input"]}
              {...register("productDisplay", { required: true })}
              value={product.info?.display || ''}
              onChange={(e) => setProduct({ ...product, info: { ...product.info, display: e.target.value } })}
            />
          </div>
        </div>

        <button type="submit" className="submit-button">Save</button>
        {success ?
          <span style={{ color: 'green', fontWeight: "600" }}>{success}</span>
          : <></>
        }
      </form>
    </div>
  )
}