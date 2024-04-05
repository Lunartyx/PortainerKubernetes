import Card from "./Card"
import test_image from "../assets/logo-square.jpg"



const productName = "someproduct";

const productPicture = test_image;

const productPrice = "22.55";

const HomeCards = () => {
  return (
    <>
      <Card>
        <div className="flex justify-center align-middle">
          <img className="size-40 rounded-lg shadow-md place-items-center" src={productPicture} alt="productPicture"></img>
        </div>
        <br />
        <h2 className="text-3xl font-bold">{productName}</h2>
        <p className="mt-2 mb-4 ">{productPrice}€</p>
        <br />
        <a className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600">
          Buy
        </a>
      </Card>
      <br></br>
    </>
  )
}

export default HomeCards
