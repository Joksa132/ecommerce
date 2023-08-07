"use client"

import Link from "next/link"
import Icon from '@mdi/react';
import { mdiChevronDown, mdiCartVariant, mdiAccount } from '@mdi/js';
import { UserContext } from "../context/userContext";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { CartContext } from "../context/cartContext";
import { useRouter } from "next/navigation";

export default function Nav() {
  const { user, setUser } = useContext(UserContext)
  const { cartProducts } = useContext(CartContext)
  const [categories, setCategories] = useState([])
  const [productDropdown, setProductDropdown] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)
  const [searchProduct, setSearchProduct] = useState('')
  const router = useRouter()

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories', {
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

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?product=${searchProduct}`);
  };

  return (
    <nav>
      <div className="container nav-container">
        <div className="nav-left-links">
          <Link href={"/"} className="home-link">
            Home
          </Link>
          <div className="product-menu">
            <div className="product-menu-top" onClick={handleProductDropdown}>
              <span>Products</span>
              <Icon path={mdiChevronDown} size={1} />
            </div>
            {productDropdown &&
              <ul className="products-dropdown">
                {categories?.map((category) => (
                  <li key={category.id} className="dropdown-link">
                    <Link
                      href={`/${category.name}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            }
          </div>
        </div>
        <div className="shop">
          <form onSubmit={(e) => handleSearch(e)}>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search products"
              onChange={(e) => setSearchProduct(e.target.value)}
            />
          </form>
        </div>
        <div className="user-options">
          {user ?
            <>
              <div className="user-options-top">
                {user.role === "ADMIN" ?
                  <div className="nav-account" onClick={handleUserDropdown} style={{ cursor: "pointer" }}>
                    <Icon path={mdiAccount} size={1} />
                    <span>Admin Dashboard</span>
                  </div>
                  :
                  <>
                    <Link href="/cart" className="nav-cart">
                      <span>{cartProducts.length ? cartProducts.length : <></>}</span>
                      <Icon path={mdiCartVariant} size={1} />
                      <span>Cart</span>
                    </Link>
                    <div className="nav-account" onClick={handleUserDropdown} style={{ cursor: "pointer" }}>
                      <Icon path={mdiAccount} size={1} />
                      <span>Hey, {user.firstName}</span>
                    </div>
                  </>
                }
              </div>
              {userDropdown &&
                (user.role === "ADMIN" ?
                  <ul className="user-dropdown">
                    <li className="dropdown-link">
                      <Link href="/dashboard/products" className="dropdown-link">Add Products</Link>
                    </li>
                    <li className="dropdown-link">
                      <Link href="/dashboard/transactions" className="dropdown-link">View Transactions</Link>
                    </li>
                    <li className="dropdown-link">
                      <Link href="" className="dropdown-link" onClick={logoutUser}>Logout</Link>
                    </li>
                  </ul>
                  : <ul className="user-dropdown">
                    <li className="dropdown-link">
                      <Link href="/user/info" className="dropdown-link">Change Info</Link>
                    </li>
                    <li className="dropdown-link">
                      <Link href="/orders" className="dropdown-link">View Orders</Link>
                    </li>
                    <li className="dropdown-link">
                      <Link href="" className="dropdown-link" onClick={logoutUser}>Logout</Link>
                    </li>
                  </ul>
                )
              }
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