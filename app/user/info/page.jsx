"use client"

import { useContext, useState } from 'react'
import styles from './info.module.css'
import { UserContext } from '@/app/context/userContext'
import Cookies from "js-cookie";
import { useForm } from 'react-hook-form';

export default function EditInfo() {
  const { user, setUser } = useContext(UserContext)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [success, setSuccess] = useState(null)
  const [userData, setUserData] = useState(user ?? {
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: ''
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`/api/user/edit/${user.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const response = await res.json();

      console.log("data", data)

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
        <form className="form-input-container" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="first-name">First Name *</label>
          <input
            type="text"
            name="first-name"
            id="first-name"
            required
            {...register("firstName", { required: true })}
            value={userData.firstName}
            onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
          />
          <label htmlFor="last-name">Last Name *</label>
          <input
            type="text"
            name="last-name"
            id="last-name"
            required
            {...register("lastName", { required: true })}
            value={userData.lastName}
            onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
          />
          <label htmlFor="address">Address *</label>
          <input
            type="text"
            name="address"
            id="address"
            required
            {...register("address", { required: true })}
            value={userData.address}
            onChange={(e) => setUserData({ ...userData, address: e.target.value })}
          />
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="number"
            name="phone"
            id="phone"
            required
            {...register("phone", { required: true })}
            value={userData.phone}
            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
          />
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            {...register("email", { required: true })}
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
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