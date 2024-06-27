import styles from "./Invoice.module.scss";
import Image from "next/image";

const InvoiceView = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p className={styles.title__text}>I-Vent Tiket Konser</p>
      </div>
      <div className={styles.invoice}>
        <div className={styles.invoice__main}>
          <div className={styles.invoice__main__content}>
            <div className={styles.invoice__main__content__left}>
              <Image
                src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
                alt="logo"
                width={150}
                height={150}
              />
              <h1>I-Vent</h1>
              <p>
                Jl. Ring Road Utara, Ngringin, Condongcatur, Kec. Depok,
                Kabupaten Sleman, Daerah Istimewa Yogyakarta
              </p>
              <p>Yogyakarta,55281</p>
              <h3>Indonesia</h3>
            </div>
            <div className={styles.invoice__main__content__right}>
              <h1>INVOICE</h1>
            </div>
          </div>
          <div className={styles.invoice__main__content}>
            <div className={styles.invoice__main__content__left}>
              <h3>Bill To</h3>
              <p>Muhammad Budi Sudarmawan</p>
              <p>
                Bulaksumur, Caturtunggal, Depok, Sleman Regency, Special Region
                of Yogyakarta
              </p>
              <p>Yogyakarta,55281</p>
              <h3>Indonesia</h3>
            </div>
            <div className={styles.invoice__main__content__right}>
              <div className={styles.invoice__main__content__right__data}>
                <div className={styles.invoice__main__content__right__data}>
                  <div
                    className={styles.invoice__main__content__right__data__item}
                  >
                    <p
                      className={
                        styles.invoice__main__content__right__data__item__title
                      }
                    >
                      Invoice#
                    </p>
                    <p>0619ca60-117c-4b86-89ed</p>
                  </div>
                  <div
                    className={styles.invoice__main__content__right__data__item}
                  >
                    <p
                      className={
                        styles.invoice__main__content__right__data__item__title
                      }
                    >
                      Invoice Date
                    </p>
                    <p> Aug 05, 2024</p>
                  </div>
                  <div
                    className={styles.invoice__main__content__right__data__item}
                  >
                    <p
                      className={
                        styles.invoice__main__content__right__data__item__title
                      }
                    >
                      Payment Type
                    </p>
                    <p> GoPay</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.invoice__summary}>
          <table className={styles.invoice__summary__table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Musik Joss</td>
                <td>Lesehan</td>
                <td>200.000</td>
                <td>3</td>
                <td>600.000</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Musik EDM</td>
                <td>VIP</td>
                <td>100.000</td>
                <td>1</td>
                <td>100.000</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Musik POP</td>
                <td>Berdiri</td>
                <td>500.000</td>
                <td>3</td>
                <td>1.500.000</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.invoice__summary__total}>
            <p className={styles.invoice__summary__total__title}>Total</p>
            <p className={styles.invoice__summary__total__price}>
              Rp. 1.700.000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
