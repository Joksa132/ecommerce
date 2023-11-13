import ProductPage from "@/components/ProductPage";
import styles from "./product.module.css";
import prisma from "@/prisma/prisma";

async function getProductDetails(id) {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return product;
}

export default async function ProductDetails({ params }) {
  const { id } = params;
  const product = await getProductDetails(id);

  return (
    <div className="container">
      <ProductPage styles={styles} product={product} />
    </div>
  );
}
