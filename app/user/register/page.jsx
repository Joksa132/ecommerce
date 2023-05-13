"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function Register() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(null)

  const onSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:3000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const response = await res.json()

      if (response.success) {
        router.push('/user/login')
      } else {
        setError(response.error)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="outer-container">
      <div className="form-container">
        <div className="form-container-header">
          <h2>Register</h2>
          <span className="link-msg">Already have an account? <Link href="/user/login" className="link-click">Login here!</Link></span>
        </div>
        <form className="form-input-container" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="first-name">First Name *</label>
          <input
            type="text"
            name="first-name"
            id="first-name"
            required
            {...register("firstName", { required: true })}
          />
          <label htmlFor="last-name">Last Name *</label>
          <input
            type="text"
            name="last-name"
            id="last-name"
            required
            {...register("lastName", { required: true })}
          />
          <label htmlFor="address">Address *</label>
          <input
            type="text"
            name="address"
            id="address"
            required
            {...register("address", { required: true })}
          />
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="number"
            name="phone"
            id="phone"
            required
            {...register("phone", { required: true })}
          />
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            {...register("email", { required: true })}
          />
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            {...register("password", { required: true })}
          />
          {error ?
            <span style={{ color: 'red', fontWeight: "600" }}>{error}</span>
            : <></>}
          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    </div>
  )
}