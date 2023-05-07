"use client"

import Link from "next/link"
import Icon from '@mdi/react';
import { mdiMenu, mdiCartVariant, mdiAccount } from '@mdi/js';
import { UserContext } from "../context/userContext";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Nav() {
  const { user, setUser } = useContext(UserContext)
  const [categories, setCategories] = useState('')
  const [productDropdown, setProductDropdown] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)

  useEffect(() => {
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
    fetchCategories()
  }, [])

  const handleProductDropdown = () => {
    setProductDropdown(!productDropdown)
  }

  const handleUserDropdown = () => {
    setUserDropdown(!userDropdown)
  }

  const logoutUser = () => {
    Cookies.remove('token')
    Cookies.remove('user-info')
    setUser(null)
  }

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <Link href="/">Ecommerce</Link>
        </div>
        <div className="shop">
          <div className="product-menu">
            <div className="product-menu-top" onClick={handleProductDropdown}>
              <Icon path={mdiMenu} size={1} />
              <span>Products</span>
            </div>
            {productDropdown &&
              <div className="dropdown">
                {categories.map((category) => (
                  <Link
                    href={`/${category.name}`}
                    key={category.id}
                    className="dropdown-link"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

            }
          </div>
          <input type="text" placeholder="Search for a product" />
        </div>
        <div className="user-options">
          <Link href="/cart" className="nav-cart">
            <Icon path={mdiCartVariant} size={1} />
            <span>Cart</span>
          </Link>
          {user ?
            <>
              {user.role === "ADMIN" ?
                <div className="nav-account" onClick={handleUserDropdown} style={{ cursor: "pointer" }}>
                  <Icon path={mdiAccount} size={1} />
                  <span>Admin Dashboard</span>
                </div>
                :
                <div className="nav-account" onClick={handleUserDropdown} style={{ cursor: "pointer" }}>
                  <Icon path={mdiAccount} size={1} />
                  <span>Hey, {user.firstName}</span>
                </div>
              }
              {userDropdown &&
                (user.role === "ADMIN" ?
                  <div className="dropdown">
                    <Link href="/dashboard/products" className="dropdown-link">Add Products</Link>
                    <Link href="/" className="dropdown-link">View Transactions</Link>
                  </div>
                  : <div className="dropdown">
                    <Link href="/user/info" className="dropdown-link">Change Info</Link>
                    <Link href="/" className="dropdown-link">View Orders</Link>
                  </div>
                )
              }
              <span style={{ cursor: "pointer" }} onClick={logoutUser}>Logout</span>
            </> :
            <Link href="/user/login" className="nav-account">
              <Icon path={mdiAccount} size={1} />
              <span>Login</span>
            </Link>
          }
        </div>
      </div>
    </nav>
  )
}