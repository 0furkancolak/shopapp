/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { addBasket } from "../../redux/basket/basket";

export default function Product({ data }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addBasket(data._id));
  };
  return (
    <div className="rounded-lg border">
      <div className="flex items-center justify-center">
        <img src={data.imgUrl} alt="" className="rounded-t-lg object-contain max-h-48 py-2" />
      </div>
      <div className="p-1">
        <h3 className="text-xl my-1 font-bold">{data.name}</h3>
        <p>{data.description.substring(0, 50) + "..."}</p>
        <div className="flex justify-between gap-2 my-3 px-2">
          <div className="flex flex-1 bg-yellow-500 px-3 py-2 rounded-lg justify-center text-white font-bold">
            ${data.price}
          </div>
          <button
            onClick={handleClick}
            className="flex flex-1 bg-green-500 hover:bg-green-700 transition-all duration-300 px-3 py-2 rounded-lg justify-center text-white font-bold"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
}
