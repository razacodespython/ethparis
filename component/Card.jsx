export default function Card() {
  return (
    <div className="card">
      <div className="text-container">
        <div className="title">
          <h4>Fueling Loyalty</h4>
          <div className="company-logo"></div>
        </div>
        <div className="description">
          <p className="amountAndSymbol">
            This gift card is good for $<span className="amount">150</span> in <span>ETH</span> gas fees.
          </p>
          <p className="sponsoredBy">Sponsored by the <span className="sponsor">Biconomy</span> team.</p>
        </div>
      </div>
      <div className="qrcontainer"></div>
    </div>
  );
}
