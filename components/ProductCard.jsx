import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { CartContext } from "../context/cartContext";
import Icon from '@mdi/react';
import { mdiPlus, mdiMinus } from '@mdi/js';

export default function ProductCard({ product, handleDelete, handleQuantityChange, productQuantities, isCart }) {
  const { user } = useContext(UserContext)
  const { cartProducts, addToCart, removeFromCart } = useContext(CartContext)

  return (
    <div className="card">
      <div className="card-top">
        {product.picture &&
          <div className="card-img-container">
            <img src={product.picture} alt="Product Picture" />
          </div>
        }
        <div className="card-name">
          <Link href={`/${product.categories[0].name}/${product.id}`}>
            <span className="card-product-title">{product.title}</span>
          </Link>
          <span className="card-product-price">{product.price} RSD</span>
        </div>
        {isCart ?
          <div className="product-quantity">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              value={productQuantities[product.id] || 1}
              onChange={(event) => handleQuantityChange(event, product.id)}
              min={1}
              id='quantity'
              style={{ marginBottom: "10px" }}
            />
          </div> : <></>
        }
      </div>
      <div className="card-bottom">
        {user ? (
          user.role === "ADMIN" ?
            <div className="card-admin-actions">
              <Link href={`/dashboard/edit/${product.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div> :
            <div className="card-actions">
              {
                cartProducts.some((item) => item.id === product.id) ?
                  <button
                    className="card-cart-button"
                    onClick={() => removeFromCart(product.id)}
                    style={{ cursor: "pointer" }}>
                    <Icon path={mdiMinus} size={1} />
                    REMOVE FROM CART
                  </button>
                  : <button
                    className="card-cart-button"
                    onClick={() => addToCart(product)}
                    style={{ cursor: "pointer" }}>
                    <Icon path={mdiPlus} size={1} />
                    ADD TO CART
                  </button>
              }
            </div>
        ) :
          <div className="card-actions">
            <Link href={'/user/login'} className="card-login">
              <button>LOGIN TO ORDER</button>
            </Link>
          </div>
        }
      </div>
    </div >
  )
}