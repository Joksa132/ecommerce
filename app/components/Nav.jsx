import Link from "next/link"
import Icon from '@mdi/react';

import { mdiMenu } from '@mdi/js';
import { mdiCartVariant } from '@mdi/js';
import { mdiAccount } from '@mdi/js';

export default function Nav() {
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
          <Link href="/login" className="nav-account">
            <Icon path={mdiAccount} size={1} />
            <span>Login</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}