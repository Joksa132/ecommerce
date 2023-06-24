"use client"

import Link from "next/link"
import { useContext, useState } from "react"
import { useRouter } from 'next/navigation';
import { UserContext } from "../../context/userContext";
import Cookies from "js-cookie";
import { useForm } from 'react-hook-form';

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext)

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const response = await res.json();

      if (response.error) {
        setError(response.error);
      } else {
        const userInfo = {
          userId: response.userId,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          address: response.address,
          phone: response.phone,
          role: response.role
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
        <form className="form-input-container" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email address *</label>
          <input
            type="text"
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
          {errors.password && <span style={{ color: 'red', fontWeight: "600" }}>Please enter a password</span>}
          {error ?
            <span style={{ color: 'red', fontWeight: "600" }}>{error}</span>
            : <></>}
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
  )
}