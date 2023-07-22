export default function Navbar() {

  return (
    <nav className='navbar'>
      <div className="wrapper">
        <div className="logo">WALA</div>
        <div className="menu-button"></div>
        <ul className="buttons-container">
          <button className="emailSignin">Sign in with email</button>
          <button className="walletConnect">
            Connect Wallet
          </button>
        </ul>
      </div>
    </nav>
  )
}