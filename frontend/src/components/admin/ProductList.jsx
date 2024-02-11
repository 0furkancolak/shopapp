import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/product")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:3000/product/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        toast.warn(res.data.msg);
        navigate(0)
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
      });
  };

  return (
    <div className="mt-6 flex flex-col gap-3">
      {products?.map((pr) => (
        <div key={pr._id} className=" flex gap-2 border mx-4">
          <div className="flex basis-1/6">
            <img src={pr.imgUrl} alt="" className="object-contain" />
          </div>
          <div className="flex basis-3/6 flex-col py-1 justify-between">
            <h1 className="font-bold text-xl">{pr.name}</h1>
            <p className="text-sm">{pr.description.substring(0, 50) + "..."}</p>
            <div className="flex text-white">
              <p className="px-2 py-1 rounded-lg bg-green-600">${pr.price}</p>
            </div>
          </div>
          <div className="flex basis-2/6 flex-col items-end pe-10 py-2 text-white gap-2 justify-center">
            <button
              onClick={() => deleteProduct(pr._id)}
              className="px-8 py-2 w-36 rounded-lg bg-red-600 transition-colors hover:bg-red-700"
            >
              Delete
            </button>
            <button
              onClick={() => navigate(`/admin/product-edit/${pr._id}`)}
              className="px-8 py-2 w-36 rounded-lg bg-green-600 transition-colors hover:bg-green-700"
            >
              Güncelle
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
