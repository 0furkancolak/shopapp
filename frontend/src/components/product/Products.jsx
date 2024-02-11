import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";


export default function Products() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/product")
      .then((res) => {
        setData(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
 
  return (
    <div className="w-full flex justify-center my-6">
      <div className="max-w-6xl w-full p-4 lg:p-0">
        <h1 className="text-3xl font-bold underline mb-3">Ürünler</h1>
        <div className="grid grid-cols-4 gap-3">
          {data.map((d) => (
            <Product key={d.id} data={d} />
          ))}
        </div>
      </div>
    </div>
  );
}
