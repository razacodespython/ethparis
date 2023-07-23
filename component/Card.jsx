import styles from "../styles/Home.module.css";

export default function Card() {
  return (
    <div className='card'>
      <div className='text-container'>
        <div>
          <h4 className={styles.title}>Loyalty Card</h4>
          <div className='company-logo'>
            <img className={styles.logo} src='../biconomy.png' alt='' />
          </div>
        </div>
        <div className='description'>
          <p className='amountAndSymbol'>
            This gift card is good for $<span className='amount'>150</span> in{" "}
            <span>ETH</span> gas fees.
          </p>
          <p className='sponsoredBy'>
            Sponsored by the <span className='sponsor'>Biconomy</span> team.
          </p>
        </div>
      </div>
      <div className='qrcontainer'></div>
    </div>
  );
}
