"use client"

import { useContext, useState } from 'react'
import styles from './info.module.css'
import { UserContext } from '@/app/context/userContext'
import Cookies from "js-cookie";

export default function EditInfo() {
  const { user, setUser } = useContext(UserContext)
  const [firstName, setFirstName] = useState(user ? user.firstName : '')
  const [lastName, setLastName] = useState(user ? user.lastName : '')
  const [address, setAddress] = useState(user ? user.address : '')
  const [phone, setPhone] = useState(user ? user.phone : '')
  const [email, setEmail] = useState(user ? user.email : '')
  const [success, setSuccess] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:3000/api/user/edit/${user.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, address, phone, email })
      })
      const data = await res.json();

      console.log("data", data)

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
      setSuccess('User information changed')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>

      <div className="form-container">
        <div className="form-container-header">
          <h2>Change User Info</h2>
        </div>
        <form className="form-input-container" onSubmit={handleSubmit}>
          <label htmlFor="first-name">First Name *</label>
          <input
            type="text"
            name="first-name"
            id="first-name"
            required
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <label htmlFor="last-name">Last Name *</label>
          <input
            type="text"
            name="last-name"
            id="last-name"
            required
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <label htmlFor="address">Address *</label>
          <input
            type="text"
            name="address"
            id="address"
            required
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="number"
            name="phone"
            id="phone"
            required
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <button type='submit' className='submit-button'>Save</button>
          {success ?
            <span style={{ color: 'green', fontWeight: "600" }}>{success}</span>
            : <></>
          }
        </form>
      </div>
    </div>
  )
}