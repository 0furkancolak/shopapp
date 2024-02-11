import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function User() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/user", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:3000/user/delete/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        toast.warn(res.data.msg);
        navigate(0);
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
      });
  };

  return (
    <div className="mt-6 grid grid-cols-4 gap-3">
      {user?.map((u) => (
        <div
          key={u._id}
          className=" flex flex-col gap-2 border mx-4 px-2 justify-center items-center rounded-lg h-36"
        >
          <h1 className="font-bold text-xl">{u.name}</h1>
          <button
            onClick={() => deleteProduct(u._id)}
            className="px-8 py-2 rounded-lg bg-red-600 text-white transition-colors hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
