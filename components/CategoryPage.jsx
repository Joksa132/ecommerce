"use client";

import { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiClose, mdiFilterVariant } from "@mdi/js";
import ProductCard from "./ProductCard";
import FiltersSidebar from "@/components/FiltersSidebar";
import { useRouter } from "next/navigation";

export default function CategoryPage({
  styles,
  infoFields,
  availableInfoValues,
  category,
  products,
}) {
  const [isFiltersClicked, setIsFiltersClicked] = useState(false);
  const [message, setMessage] = useState(null);
  const [filters, setFilters] = useState({});
  const router = useRouter();

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (value) {
        updatedFilters[field] = value;
      } else {
        delete updatedFilters[field];
      }

      return updatedFilters;
    });
    console.log(filters);
  };

  function objectToQueryString(obj) {
    const keys = Object.keys(obj);
    const keyValuePairs = keys.map((key) => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
    });
    return keyValuePairs.join("&");
  }

  useEffect(() => {
    router.replace(`/${category}?${objectToQueryString(filters)}`);
  }, [filters, router]);

  return (
    <>
      <div className="card-outer-container container">
        <div className="product-page-header">
          <h1>{category}</h1>
          <span onClick={() => setIsFiltersClicked(true)}>
            <Icon path={mdiFilterVariant} size={1} />
            Filter
          </span>
        </div>
        {message ? (
          <div className={styles["message-container"]}>
            <span>{message.title} has been deleted!</span>
            <Icon
              path={mdiClose}
              size={1}
              style={{ cursor: "pointer" }}
              onClick={() => setMessage(null)}
            />
          </div>
        ) : (
          <></>
        )}
        <div className="card-container">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} isCart={false} />
          ))}
        </div>
      </div>
      {isFiltersClicked ? (
        <>
          <div
            className="overlay"
            onClick={() => setIsFiltersClicked(false)}
          ></div>
          <FiltersSidebar
            infoFields={infoFields}
            availableInfoValues={availableInfoValues}
            filters={filters}
            handleFilterChange={handleFilterChange}
            setIsFiltersClicked={setIsFiltersClicked}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

// redirect(`/${category}?${filters}`);
