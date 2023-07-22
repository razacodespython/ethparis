

export default function Home() {

  const options = {
    method: "POST",
    // headers: {
    //   "content-type": "application/json"
    // },
    // body: JSON.stringify(message)
  }

  const paymaster = async() =>{
    console.log("clicked");
    const response = await fetch("/api/paymaster",options);
    const data = await response.json();
    console.log(data)
  }
  return (
    <>
      <button onClick={paymaster}>paymaster trigger</button>
    </>
  )
}
