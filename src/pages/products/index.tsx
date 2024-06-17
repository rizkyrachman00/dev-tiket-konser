import ProductView from "@/components/views/products";
import Head from "next/head";
import { useState, useEffect } from "react";
import productServices from "@/services/product";

type PropTypes = {
  setToaster: any;
};

const ProductPage = (props: PropTypes) => {
  const { setToaster } = props;
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <ProductView products={products} />
    </>
  );
};

export default ProductPage;
