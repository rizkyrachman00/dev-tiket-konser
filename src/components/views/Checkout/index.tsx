import styles from "./Checkout.module.scss";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import { Fragment, useContext, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import userServices from "@/services/user";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useSession } from "next-auth/react";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import ModalChangeAddress from "./ModalChangeAddress";

const CheckoutView = () => {
  const { setToaster } = useContext(ToasterContext);
  const session: any = useSession();
  const [profile, setProfile] = useState<any>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [changeAddress, setChangeAddress] = useState(false);

  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
    if (data?.data?.address?.length > 0) {
      data.data.address.filter((address: { isMain: boolean }, id: number) => {
        if (address.isMain) {
          setSelectedAddress(id);
        }
      });
    }
  };

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (session.data?.accessToken) {
      getProfile();
    }
  }, [session]);

  const getProduct = (id: string) => {
    const product: any = products.find((product: Product) => product.id === id);
    return product;
  };

  const getAmount = (id: string, category: string) => {
    const product = products.find((product) => product.id === id);
    const price = product?.prices.find(
      (price) => price.category === category
    )?.idr;
    return price;
  };

  const getTotalPrize = () => {
    const total = profile?.carts?.reduce(
      (acc: number, item: { id: string; category: string; qty: number }) => {
        const product: any = getProduct(item.id);
        const price: any = getAmount(item.id, item.category);
        return (acc += parseInt(price) * item.qty);
      },
      0
    );
    return total;
  };

  return (
    <>
      <div className={styles.checkout}>
        <div className={styles.checkout__main}>
          <h1 className={styles.checkout__main__title}>Checkout</h1>
          <div className={styles.checkout__main__address}>
            <h3 className={styles.checkout__main__address__title}>
              Customer Address
            </h3>
            <div className={styles.checkout__main__address__selected}>
              {profile?.address?.length > 0 ? (
                <Fragment>
                  <h4
                    className={styles.checkout__main__address__selected__title}
                  >
                    {profile?.address[selectedAddress]?.recipient}
                    {profile?.address[selectedAddress]?.phone}
                  </h4>
                  <p
                    className={
                      styles.checkout__main__address__selected__address
                    }
                  >
                    {profile?.address[selectedAddress]?.addressLine}
                  </p>
                  <p className={styles.checkout__main__address__selected__note}>
                    {" "}
                    Note : {profile?.address[selectedAddress]?.note}
                  </p>
                  <Button
                    className={styles.checkout__main__address__selected__button}
                    type="button"
                    onClick={() => setChangeAddress(true)}
                  >
                    Change Address
                  </Button>
                </Fragment>
              ) : (
                <Button type="button" onClick={() => setChangeAddress(true)}>
                  Add New Address
                </Button>
              )}
            </div>
          </div>
          {profile?.carts?.length > 0 ? (
            <div className={styles.checkout__main__list}>
              {profile?.carts?.map(
                (item: { id: string; category: string; qty: number }) => (
                  <Fragment key={`${item.id}-${item.category}`}>
                    <div className={styles.checkout__main__list__item}>
                      {getProduct(item.id)?.image && (
                        <Image
                          src={`${getProduct(item.id)?.image}`}
                          width={100}
                          height={100}
                          alt={`${item.id}-${item.category}`}
                          className={styles.checkout__main__list__item__image}
                        />
                      )}
                      <div className={styles.checkout__main__list__item__info}>
                        <h4
                          className={
                            styles.checkout__main__list__item__info__title
                          }
                        >
                          {getProduct(item.id)?.name}
                        </h4>

                        <div
                          className={
                            styles.checkout__main__list__item__info__data
                          }
                        >
                          <label
                            className={
                              styles.checkout__main__list__item__info__data__category
                            }
                          >
                            Category {item.category}
                          </label>
                          <label
                            className={
                              styles.checkout__main__list__item__info__data__qty
                            }
                          >
                            Quantity {item.qty}
                          </label>
                        </div>
                      </div>
                      <h4 className={styles.checkout__main__list__item__price}>
                        {convertIDR(getAmount(item.id, item.category))}
                      </h4>
                    </div>
                    <hr className={styles.checkout__main__list__divider} />
                  </Fragment>
                )
              )}
            </div>
          ) : (
            <div className={styles.checkout__main__empty}>
              <h1 className={styles.checkout__main__empty__title}>
                Cart is Empty. Choose Your Concert
              </h1>
            </div>
          )}
        </div>
        <div className={styles.checkout__summary}>
          <h1 className={styles.checkout__summary__title}>Summary</h1>
          <div className={styles.checkout__summary__item}>
            <h4>Subtotal</h4>
            <p> {convertIDR(getTotalPrize())}</p>
          </div>
          <div className={styles.checkout__summary__item}>
            <h4>Admin Fee</h4>
            <p>{convertIDR(0)}</p>
          </div>
          <div className={styles.checkout__summary__item}>
            <h4>Tax</h4>
            <p>{convertIDR(0)}</p>
          </div>
          <hr />
          <div className={styles.checkout__summary__item}>
            <h4>Total</h4>
            <p> {convertIDR(getTotalPrize())}</p>
          </div>
          <hr />
          <Button type="button" className={styles.checkout__summary__button}>
            Payment
          </Button>
        </div>
      </div>
      {changeAddress && (
        <ModalChangeAddress
          profile={profile}
          setProfile={setProfile}
          setChangeAddress={setChangeAddress}
          setSelectedAddress={setSelectedAddress}
          selectedAddress={selectedAddress}
        />
      )}
    </>
  );
};

export default CheckoutView;
