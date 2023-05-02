"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json();

      console.log(data)

      if (data.error) {
        setError(data.error);
      } else {
        router.push('/');
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
          <h2>Login</h2>
          <span className="link-msg">Don't have an account? <Link href="/register" className="link-click">Register here!</Link></span>
        </div>
        <form className="form-input-container" onSubmit={handleSubmit}>
          <label htmlFor="email">Email address *</label>
          <input
            type="text"
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
          <button className="submit-button">Login</button>
        </form>
      </div>
    </div>
  )
}