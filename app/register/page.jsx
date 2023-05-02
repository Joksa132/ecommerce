"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          address,
          phone,
          email,
          password
        })
      })
      const data = await res.json()

      if (data.success) {
        router.push('/login')
      } else {
        setError(data.error)
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
          <span className="link-msg">Already have an account? <Link href="/login" className="link-click">Login here!</Link></span>
        </div>
        <form className="form-input-container" onSubmit={handleSubmit}>
          <label htmlFor="first-name">First Name *</label>
          <input
            type="text"
            name="first-name"
            id="first-name"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="last-name">Last Name *</label>
          <input
            type="text"
            name="last-name"
            id="last-name"
            required
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="address">Address *</label>
          <input
            type="text"
            name="address"
            id="address"
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="number"
            name="phone"
            id="phone"
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {error ?
            <span style={{ color: 'red', fontWeight: "600" }}>{error}</span>
            : <></>}
          <button className="submit-button">Register</button>
        </form>
      </div>
    </div>
  )
}