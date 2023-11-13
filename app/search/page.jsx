import ProductCard from "../../components/ProductCard";
import prisma from "@/prisma/prisma";

async function getSearchedProduct(query) {
  const products = await prisma.product.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: {
      categories: true,
    },
  });

  return products;
}

export default async function SearchResults({ searchParams }) {
  let products = await getSearchedProduct(searchParams.product);

  return (
    <div className="card-outer-container container">
      <div
        style={{ display: "flex", alignContent: "center", marginTop: "30px" }}
      >
        <h2>
          Search results for{" "}
          <span style={{ fontStyle: "italic" }}>{searchParams.product}</span>
        </h2>
      </div>
      {products.length ? (
        <div className="card-container">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} isCart={false} />
          ))}
        </div>
      ) : (
        <div style={{ fontSize: "2rem", marginTop: "30px" }}>
          No products matching{" "}
          <span style={{ fontWeight: "bold" }}>{searchParams.product}</span>
        </div>
      )}
    </div>
  );
}
