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
  const [dropdownOpen, setDropdownOpen] = useState(false)

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

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
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
            <div className="product-menu-top" onClick={handleDropdown}>
              <Icon path={mdiMenu} size={1} />
              <span>Products</span>
            </div>
            {dropdownOpen ?
              <div className="product-menu-dropdown">
                {categories.map((category) => (
                  <Link
                    href={"/"}
                    key={category.id}
                    className="dropdown-link"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              : <></>
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
                <Link href="/dashboard/products" className="nav-account">
                  <Icon path={mdiAccount} size={1} />
                  <span>Admin Dashboard</span>
                </Link>
                :
                <Link href="/profile" className="nav-account">
                  <Icon path={mdiAccount} size={1} />
                  <span>Hey, {user.firstName}</span>
                </Link>
              }
              <span style={{ cursor: "pointer" }} onClick={logoutUser}>Logout</span>
            </> :
            <Link href="/login" className="nav-account">
              <Icon path={mdiAccount} size={1} />
              <span>Login</span>
            </Link>
          }
        </div>
      </div>
    </nav>
  )
}