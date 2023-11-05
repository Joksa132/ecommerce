import styles from "./home.module.css";
import ProductCard from "../components/ProductCard";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

function shuffleArray(array) {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

async function fetchProducts() {
  const products = await prisma.product.findMany({
    include: {
      categories: true,
    },
  });

  const randomProducts = shuffleArray(products).slice(0, 4);
  revalidatePath("/");
  return randomProducts;
}

export default async function Home() {
  const randomProducts = await fetchProducts();

  return (
    <section className={styles["home-container"]}>
      <div className={styles["image-container"]}>
        <img
          className={styles["cover-image"]}
          src="/home-page-cover.jpg"
          alt="Cover image"
        />
        <div className="container">
          <span>
            Brand new online technology store bringing you only the finest of
            products
          </span>
        </div>
      </div>
      <div className={`${styles["card-outer-container"]} container`}>
        <h2>Products</h2>
        <div className={`${styles["card-container"]}`}>
          {randomProducts && randomProducts.length > 0 ? (
            randomProducts.map(product => (
              <ProductCard product={product} key={product.id} isCart={false} />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
}
