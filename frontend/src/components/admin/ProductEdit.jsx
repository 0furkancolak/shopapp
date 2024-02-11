/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductEdit() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/product/${id}`)
      .then((res) => {
        setData(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/product/edit/${id}`,
        data,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      navigate("/admin");
      console.log("oldu");
      return response;
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full px-10">
      <div className=" px-6 py-10 rounded-lg w-full">
        <h1 className="mb-4 text-center w-full text-3xl font-bold">
          Ürün Ekle
        </h1>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg">
              Ürün ismi
            </label>
            <input
              name="name"
              type="text"
              placeholder="Ürün İsmi"
              value={data?.name}
              required
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className={
                "mt-2 mb-1 outline-none focus:ring-blue-800 focus:ring-2 text-black ring-black px-3.5 py-2.5 rounded-lg ring-inset ring-1 "
              }
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="imgUrl" className="text-lg">
              Resim
            </label>
            <input
              name="imgUrl"
              type="text"
              placeholder="Resim"
              value={data?.imgUrl}
              required
              onChange={(e) => setData({ ...data, imgUrl: e.target.value })}
              className={
                "mt-2 mb-1 outline-none focus:ring-blue-800 focus:ring-2 text-black ring-black px-3.5 py-2.5 rounded-lg ring-inset ring-1 "
              }
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="text-lg">
              Fiyat
            </label>
            <input
              name="price"
              type="text"
              placeholder="Fiyat"
              value={data?.price}
              required
              onChange={(e) => setData({ ...data, price: e.target.value })}
              className={
                "mt-2 mb-1 outline-none focus:ring-blue-800 focus:ring-2 text-black ring-black px-3.5 py-2.5 rounded-lg ring-inset ring-1 "
              }
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="text-lg">
              Açıklama
            </label>
            <textarea
              name="description"
              type="textarea"
              placeholder="Açıklama"
              value={data?.description}
              required
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              className={
                "mt-2 mb-1 outline-none focus:ring-blue-800 focus:ring-2 text-black ring-black px-3.5 py-2.5 rounded-lg ring-inset ring-1 "
              }
            />
          </div>

          <button
            className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 rounded-lg transition-colors"
            type="submit"
          >
            {!loading ? "Kaydet" : "Kaydediliyor"}
          </button>
        </form>
      </div>
    </div>
  );
}
