import Card from "./Card"

interface CardProps {
  productName: string;
  productPrice: number;
  productPicture: string;
}

const ProductCard: React.FC<CardProps> = ({ productName, productPrice, productPicture }) => {
  return (

    <Card>
      <div className="flex flex-col items-center justify-center w-max">
        <div className="flex justify-center">
          <img className="size-40 rounded-lg shadow-md place-items-center" src={productPicture} alt="Product" />
        </div>
        <br />

        <h2 className="text-3xl font-bold">{productName}</h2>
        <p className="mt-2 mb-4">{productPrice}€</p>
        <button className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600">Buy</button>
      </div>
    </Card>
  );
};

export default ProductCard;
