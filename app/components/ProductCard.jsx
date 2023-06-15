import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { CartContext } from "../context/cartContext";

export default function ProductCard({ product, handleDelete, handleQuantityChange, productQuantities, isCart, category }) {
  const { user } = useContext(UserContext)
  const { cartProducts, addToCart, removeFromCart } = useContext(CartContext)

  return (
    <div className="card">
      <Link href={`/${product.categories[0].name}/${product.id}`}>
        <span>{product.title}</span>
      </Link>
      {product.picture &&
        <img src={product.picture} alt="Product Picture" />
      }
      <p>{product.description}</p>
      <span>{product.price} RSD</span>
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
              <Link href={`/${product.categories[0].name}/${product.id}`}>
                <button>View Details</button>
              </Link>
              {
                cartProducts.some((item) => item.id === product.id) ?
                  <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
                  : <button onClick={() => addToCart(product)}>Add to Cart</button>
              }
            </div>
          </>)
      ) :
        <div className="card-actions">
          <Link href={`/${product.categories[0].name}/${product.id}`}>
            <button>View Details</button>
          </Link>
          <Link href={'/user/login'}>
            <button>Login to Order</button>
          </Link>
        </div>
      }
    </div >
  )
}