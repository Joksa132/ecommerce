import CategoryPage from "@/components/CategoryPage";
import styles from "./category.module.css";
import prisma from "@/prisma/prisma";

async function getAllProducts(category) {
  const products = await prisma.product.findMany({
    where: {
      categories: {
        some: {
          name: category,
        },
      },
    },
    include: {
      categories: true,
    },
  });

  return products;
}

async function getFilteredProducts(allProducts, searchParams) {
  const filters = {
    ram: searchParams?.ram,
    storage: searchParams?.storage,
    display: searchParams?.display,
    os: searchParams?.os,
    battery: searchParams?.battery,
    camera: searchParams?.camera,
    processor: searchParams?.processor,
  };

  const filteredProducts = allProducts.filter((product) => {
    const info = product.info;
    for (const key in filters) {
      if (filters[key] && info[key] !== filters[key]) {
        return false;
      }
    }
    return true;
  });

  return filteredProducts;
}

export default async function CategoryProducts({ params, searchParams }) {
  const { category } = params;
  const allProducts = await getAllProducts(category);
  const products = await getFilteredProducts(allProducts, searchParams);

  const infoFields = ["ram", "storage", "display", "os", "battery"];
  const availableInfoValues = infoFields.reduce((values, field) => {
    const uniqueValues = Array.from(
      new Set(allProducts.map((product) => product.info?.[field]))
    ).filter(Boolean);
    const sortedValues = uniqueValues.sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true })
    );
    return {
      ...values,
      [field]: sortedValues,
    };
  }, {});

  return (
    <div className="product-page-container">
      <CategoryPage
        styles={styles}
        infoFields={infoFields}
        availableInfoValues={availableInfoValues}
        category={category}
        products={products}
      />
    </div>
  );
}
