"use client"

import Link from "next/link"
import { useContext, useState } from "react"
import { useRouter } from 'next/navigation';
import { UserContext } from "../../context/userContext";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3000/api/user/login', {
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
        const userInfo = {
          userId: data.userId,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phone: data.phone,
          role: data.role
        }
        setUser(userInfo)
        Cookies.set('user-info', JSON.stringify(userInfo), { expires: 1 })
        userInfo.role === "ADMIN" ? router.push('/dashboard/products') : router.push('/');
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
          <span className="link-msg">Don't have an account? <Link href="/user/register" className="link-click">Register here!</Link></span>
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
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
  )
}