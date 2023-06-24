"use client"

import { useEffect, useState } from 'react'
import styles from '../products.module.css'
import { useForm } from 'react-hook-form';

export default function AdminProducts() {
  const [categories, setCategories] = useState([])
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories', {
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
      formData.append("productName", data.productName)
      formData.append("productDesc", data.productDesc);
      formData.append("productPrice", data.productPrice);
      formData.append("productCategory", data.productCategory);

      if (data.productImage[0]) {
        const imageUrl = await uploadImage(data.productImage[0]);
        formData.append('productImage', imageUrl);
      }

      const productInfo = {
        ram: data.productRam,
        storage: data.productStorage,
        processor: data.productProcessor,
        battery: data.productBattery,
        camera: data.productCamera,
        os: data.productOs,
        display: data.productDisplay,
      }

      formData.append("productInfo", JSON.stringify(productInfo))

      const res = await fetch('/api/products/new', {
        method: 'POST',
        body: formData
      })

      const response = await res.json();
      if (response.success) {
        setSuccess(`Product ${response.product.title} successfully created`)
        setError(null)
      } else {
        setError(response.error)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleAdditionalInfo = () => {
    setShowAdditionalInfo(!showAdditionalInfo)
  }

  return (
    <div className='outer-container'>
      <form className='form-container' style={{ gap: "10px" }} onSubmit={handleSubmit(onSubmit)}>
        <h2>Add a new product</h2>
        <div className="main-info">
          <label htmlFor='product-name'>Product name</label>
          <input
            type="text"
            name="product-name"
            id="product-name"
            required
            className={styles["form-input"]}
            {...register("productName", { required: true })}
          />
          <label htmlFor='description'>Product description</label>
          <input
            type="text"
            name="description"
            id="description"
            required
            className={styles["form-input"]}
            {...register("productDesc", { required: true })}
          />
          <label htmlFor='price'>Product price</label>
          <input
            type="text"
            name="price"
            id="price"
            min="1"
            required
            className={styles["form-input"]}
            {...register("productPrice", { required: true })}
          />
          <label htmlFor="product-category">Product category</label>
          <select
            name="product-category"
            id="product-category"
            {...register("productCategory", { required: true })}
            className={styles["form-select"]}
            style={{ padding: "0.5rem", border: "1px solid black", borderRadius: "5px" }}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
          <input type="file" name="productImage" accept="image/*" {...register("productImage")} />
        </div>
        <button type='button' className='additional-info-button' onClick={handleAdditionalInfo}>Additional Info</button>
        {showAdditionalInfo &&
          <div className="additional-info">
            <div className="input-group">
              <label htmlFor='product-ram'>RAM memory</label>
              <input
                type="text"
                name="product-ram"
                id="product-ram"
                min="1"
                required
                className={styles["form-input"]}
                {...register("productRam", { required: true })}
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
              />
            </div>
            <div className="input-group">
              <label htmlFor='product-battery'>Battery</label>
              <input
                type="text"
                name="product-battery"
                id="product-battery"
                min="1"
                required
                className={styles["form-input"]}
                {...register("productBattery", { required: true })}
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
              />
            </div>
          </div>}

        <button type="submit" className="submit-button">Submit</button>
        {error ?
          <span style={{ color: 'red', fontWeight: "600" }}>{error}</span>
          : <></>}
        {success ?
          <span style={{ color: 'green', fontWeight: "600" }}>{success}</span>
          : <></>
        }
      </form>
    </div>
  )
}