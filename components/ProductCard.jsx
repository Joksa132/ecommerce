import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../app/context/userContext";
import { CartContext } from "../app/context/cartContext";
import Icon from '@mdi/react';
import { mdiCartMinus, mdiCartPlus } from "@mdi/js";

export default function ProductCard({ product, handleDelete, handleQuantityChange, productQuantities, isCart }) {
  const { user } = useContext(UserContext)
  const { cartProducts, addToCart, removeFromCart } = useContext(CartContext)

  return (
    <div className="card">
      {product.picture &&
        <img src={product.picture} alt="Product Picture" />
      }
      <div className="card-name">
        <Link href={`/${product.categories[0].name}/${product.id}`}>
          <span>{product.title}</span>
        </Link>
        <span>{product.price} RSD</span>
      </div>
      {user ? (
        user.role === "ADMIN" ?
          <div className="card-actions">
            <Link href={`/dashboard/edit/${product.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </div> :
          (<>
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
            < div className="card-actions">
              {
                cartProducts.some((item) => item.id === product.id) ?
                  <Icon path={mdiCartMinus} size={1.5} onClick={() => removeFromCart(product.id)} style={{ cursor: "pointer" }} />
                  : <Icon path={mdiCartPlus} size={1.5} onClick={() => addToCart(product)} style={{ cursor: "pointer" }} />
              }
            </div>
          </>)
      ) :
        <div className="card-actions">
          <Link href={'/user/login'}>
            <button>Login to Order</button>
          </Link>
        </div>
      }
    </div >
  )
}