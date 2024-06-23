import styles from "./Products.module.scss";
import { Product } from "@/types/product.type";
import Link from "next/link";
import Card from "./Card";

type PropTypes = {
  products: Product[];
};

const ProductView = (props: PropTypes) => {
  const { products } = props;
  return (
    <div className={styles.product}>
      <h1 className={styles.product__title}>All Concert ({products.length})</h1>
      <div className={styles.product__main}>
        <div className={styles.product__main__filter}>
          <div className={styles.product__main__filter__data}>
            <h4 className={styles.product__main__filter__data__title}>Genre</h4>
            <div className={styles.product__main__filter__data__list}>
              <div className={styles.product__main__filter__data__list__item}>
                <input type="checkbox" id="pop" />
                <label
                  className={
                    styles.product__main__filter__data__list__item__label
                  }
                  htmlFor="pop"
                >
                  POP
                </label>
              </div>
              <div className={styles.product__main__filter__data__list__item}>
                <input type="checkbox" id="koplo" />
                <label
                  className={
                    styles.product__main__filter__data__list__item__label
                  }
                  htmlFor="koplo"
                >
                  KOPLO
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.product__main__content}>
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <Card product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
