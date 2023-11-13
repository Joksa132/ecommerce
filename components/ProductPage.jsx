"use client";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/cartContext";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import Icon from "@mdi/react";
import {
  mdiMenuDown,
  mdiCartVariant,
  mdiCartPlus,
  mdiCartRemove,
} from "@mdi/js";

export default function ProductPage({ styles, product }) {
  const { cartProducts, addToCart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [descriptionClicked, setDescriptionClicked] = useState(true);
  const [specificationsClicked, setSpecificationsClicked] = useState(true);

  return (
    <div className={styles["main-container"]}>
      <div className={styles["product-image"]}>
        <img src={product.picture} alt={product.title} />
      </div>
      <div className={styles["product-info"]}>
        <h1>{product.title}</h1>
        <span className={styles["price-info"]}>{product.price} RSD</span>
        <div className={styles["info-container"]}>
          <div
            className={styles["description-info"]}
            style={{ marginBottom: "10px" }}
          >
            <div
              className={styles["description-button"]}
              onClick={() => setDescriptionClicked(!descriptionClicked)}
            >
              <button>Description</button>
              <Icon path={mdiMenuDown} size={1} />
            </div>
            {descriptionClicked && (
              <p style={{ marginTop: "3px" }}>{product.description}</p>
            )}
          </div>
          <div className={styles["specifications-info"]}>
            <div
              className={styles["description-button"]}
              onClick={() => setSpecificationsClicked(!specificationsClicked)}
            >
              <button>Specifications</button>
              <Icon path={mdiMenuDown} size={1} />
            </div>
            {specificationsClicked && product.info && (
              <div className={styles["product-additional-info"]}>
                <span>RAM memory: {product.info.ram}</span>
                <span>Storage memory: {product.info.storage}</span>
                <span>Resolution: {product.info.display}</span>
                <span>Camera: {product.info.camera}</span>
                <span>Battery: {product.info.battery}</span>
                <span>Operating system: {product.info.os}</span>
                <span>Processor: {product.info.processor}</span>
              </div>
            )}
          </div>
        </div>
        {user ? (
          <>
            {cartProducts.some((item) => item.id === product.id) ? (
              <button
                onClick={() => removeFromCart(product.id)}
                className={styles["cart-button"]}
                style={{ marginRight: "10px" }}
              >
                <Icon path={mdiCartRemove} size={0.6} />
                Remove from Cart
              </button>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className={styles["cart-button"]}
                style={{ marginRight: "10px" }}
              >
                <Icon path={mdiCartPlus} size={0.6} />
                Add to Cart
              </button>
            )}
          </>
        ) : (
          <Link href={"/user/login"}>
            <button className={styles["login-button"]}>
              <Icon
                path={mdiCartVariant}
                size={0.6}
                style={{ marginRight: "10px" }}
              />
              Login to order
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
