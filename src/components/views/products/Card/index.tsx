import styles from "./Card.module.scss";
import Image from "next/image";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";

type PropTypes = {
  product: Product;
  key: string;
};

const Card = (props: PropTypes) => {
  const { product, key } = props;
  return (
    <div className={styles.card} key={key}>
      <Image
        src={product.image}
        alt="concert"
        width={500}
        height={500}
        className={styles.card__image}
      />
      <h4 className={styles.card__title}>{product.name}</h4>
      <p className={styles.card__category}>{product.prices[0].category}</p>
      <p className={styles.card__price}>{convertIDR(product.prices[0].idr)}</p>
    </div>
  );
};

export default Card;
