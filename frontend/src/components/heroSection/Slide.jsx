/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { addBasket } from "../../redux/basket/basket";

export default function Slide({ data }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addBasket(data._id));
  };
  return (
    <div className="flex h-full gap-4 px-3 py-6">
      <div className="flex flex-col justify-center flex-1">
        <h2 className="text-3xl font-bold">{data.name}</h2>
        <p className="max-w-[80%] my-4 text-sm">
          {data.description.substring(0, 70) + "..."}
        </p>
        <div className="flex gap-4 items-center">
          <p className="px-3 w-20 text-center text-white font-bold py-2 rounded-lg bg-yellow-500">
            ${data.price}
          </p>
          <button
            className="px-3 text-center text-white font-bold py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 bg-green-500"
            onClick={handleClick}
          >
            Sepete Ekle
          </button>
        </div>
      </div>
      <div className="flex flex-1 items-center">
        <img src={data.imgUrl} alt="" className="object-contain rounded-md" />
      </div>
    </div>
  );
}
