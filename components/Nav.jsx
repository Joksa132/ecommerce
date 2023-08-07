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
        <Link href={"/"} className="home-link">
          Home
        </Link>
        <div className="shop">
          <div className="product-menu">
            <div className="product-menu-top" onClick={handleProductDropdown}>
              <span>Products</span>
              <Icon path={mdiChevronDown} size={1} />
            </div>
            {productDropdown &&
              <div className="products-dropdown">
                {categories?.map((category) => (
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
              {userDropdown &&
                (user.role === "ADMIN" ?
                  <div className="user-dropdown">
                    <Link href="/dashboard/products" className="dropdown-link">Add Products</Link>
                    <Link href="/dashboard/transactions" className="dropdown-link">View Transactions</Link>
                    <Link href="" className="dropdown-link" onClick={logoutUser}>Logout</Link>
                  </div>
                  : <div className="user-dropdown">
                    <Link href="/user/info" className="dropdown-link">Change Info</Link>
                    <Link href="/orders" className="dropdown-link">View Orders</Link>
                    <Link href="" className="dropdown-link" onClick={logoutUser}>Logout</Link>
                  </div>
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