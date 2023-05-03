"use client"

import Link from "next/link"
import Icon from '@mdi/react';
import { mdiMenu, mdiCartVariant, mdiAccount } from '@mdi/js';
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import Cookies from "js-cookie";

export default function Nav() {
  const { user, setUser } = useContext(UserContext)

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
            <Icon path={mdiMenu} size={1} />
            <span>Products</span>
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