/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeBasket } from "../../redux/basket/basket";

export default function BasketProduct({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(removeBasket(data.productId._id));
    navigate(0);
  };
  return (
    <div className="flex gap-4 border rounded-l-lg">
      <div className="flex basis-2/6">
        <img src={data.productId.imgUrl} alt="" className="rounded-l-lg" />
      </div>
      <div className="flex gap-2 basis-3/6 py-2">
        <div>
          <h3 className="font-bold text-2xl">{data.productId.name}</h3>
          <p>{data.productId.description}</p>
        </div>
      </div>
      <div className="flex p-2 basis-1/6 justify-end">
        <MdDelete
          onClick={handleClick}
          size={30}
          className="hover:text-red-600 transition-colors"
        />
      </div>
    </div>
  );
}
