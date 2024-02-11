import { useEffect, useState } from "react";
import BasketProduct from "../../components/basket/BasketProduct";
import axios from "axios";

export default function Basket() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/basket/", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const totalPrice = data.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );
  return (
    <div className="flex justify-center mt-4">
      <div className="max-w-6xl w-full flex gap-6">
        <div className="flex flex-col gap-3 basis-2/3">
          {!data ? (
            <h1>Sepet Boş</h1>
          ) : (
            data.map((d) => <BasketProduct key={d._id} data={d} />)
          )}
        </div>
        <div className="flex flex-col border rounded-lg p-4 basis-1/3">
          <div className="flex flex-col mb-8 gap-2">
            {data.map((d) => (
              <div key={d._id} className="flex items-center gap-2">
                <mark className="rounded-lg p-1">{d.quantity}x</mark>
                <p>{d.productId.name}</p>
              </div>
            ))}
          </div>
          <h3 className="font-bold text-xl">Toplam:{totalPrice}</h3>
        </div>
      </div>
    </div>
  );
}
