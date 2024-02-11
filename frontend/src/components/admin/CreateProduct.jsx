import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateProduct() {
  const validationSchema = Yup.object({
    name: Yup.string().required("Zorunlu alan."),
    price: Yup.string().required("Zorunlu alan."),
    description: Yup.string().required("Zorunlu alan."),
    imgUrl: Yup.string().required("Zorunlu alan."),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    setLoading(true);
    axios
      .post("http://localhost:3000/product/create", e, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        toast.success(res.data.msg);
        navigate("/admin");
      })
      .catch((err) => {
        toast.warn(err);
        console.log(err);
      });
    setLoading(false);
  };
  return (
    <div className="w-full px-10">
      <div className=" px-6 py-10 rounded-lg w-full">
        <h1 className="mb-4 text-center w-full text-3xl font-bold">
          Ürün Ekle
        </h1>
        <Formik
          initialValues={{ name: "", price: "", description: "", imgUrl: "" }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-lg">
                Ürün ismi
              </label>
              <Field
                name="name"
                type="text"
                placeholder="Ürün İsmi"
                className={
                  "mt-2 mb-1 outline-none focus:ring-blue-800 focus:ring-2 text-black ring-black px-3.5 py-2.5 rounded-lg ring-inset ring-1 "
                }
              />
              <ErrorMessage name="name" className="text-sm text-red-500 ps-2" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="imgUrl" className="text-lg">
                Resim
              </label>
              <Field
                name="imgUrl"
                type="text"
                placeholder="Resim"
                className={
                  "mt-2 mb-1 outline-none focus:ring-blue-800 focus:ring-2 text-black ring-black px-3.5 py-2.5 rounded-lg ring-inset ring-1 "
                }
              />
              <ErrorMessage
                name="imgUrl"
                className="text-sm text-red-500 ps-2"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="price" className="text-lg">
                Fiyat
              </label>
              <Field
                name="price"
                type="text"
                placeholder="Fiyat"
                className={
                  "mt-2 mb-1 outline-none focus:ring-blue-800 focus:ring-2 text-black ring-black px-3.5 py-2.5 rounded-lg ring-inset ring-1 "
                }
              />
              <ErrorMessage
                name="price"
                className="text-sm text-red-500 ps-2"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="description" className="text-lg">
                Açıklama
              </label>
              <Field
                as={"textarea"}
                name="description"
                type="text"
                placeholder="Açıklama"
                className={
                  "mt-2 mb-1 outline-none focus:ring-blue-800 focus:ring-2 text-black ring-black px-3.5 py-2.5 rounded-lg ring-inset ring-1 "
                }
              />
              <ErrorMessage
                name="description"
                className="text-sm text-red-500 ps-2"
              />
            </div>

            <button
              className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 rounded-lg transition-colors"
              type="submit"
            >
              {!loading ? "Kaydet" : "Kaydediliyor"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
