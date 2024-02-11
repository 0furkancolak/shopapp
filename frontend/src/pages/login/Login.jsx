import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/authSlice";
import { useEffect } from "react";

const Login = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Lütfen bir email giriniz.")
      .required("Zorunlu alan."),
    password: Yup.string().required("Zorunlu alan."),
  });

  let loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    try {
      await dispatch(login(e));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const isUser = useSelector((state) => state.auth?.user);
  useEffect(() => {
    if (isUser !== null) {
      navigate("/");
    }
  }, [isUser, navigate]);

  return (
    <div className="h-[calc(100vh-50px)] w-full flex items-center justify-center">
      <div className="bg-gray-800 px-6 py-10 rounded-lg text-white">
        <h1 className="mb-4 text-center text-3xl font-bold">Giriş Yap</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg">
                Email
              </label>
              <Field
                name="email"
                type="text"
                placeholder="Email"
                className={
                  "mt-2 mb-1 w-72 md:w-96 outline-none focus:ring-blue-800 focus:ring-2 text-black ring-black px-3.5 py-2.5 rounded-lg ring-inset ring-1 "
                }
              />
              <ErrorMessage
                name="email"
                className="text-sm text-red-500 ps-2"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-lg">
                Password
              </label>
              <Field
                name="password"
                type="password"
                placeholder="Şifre"
                className={
                  "mt-2 mb-1 w-72 md:w-96 outline-none focus:ring-blue-800 focus:ring-2 text-black ring-black px-3.5 py-2.5 rounded-lg ring-inset ring-1 "
                }
              />

              <ErrorMessage
                name="password"
                className="text-sm text-red-500 ps-2"
              />
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg transition-colors"
              type="submit"
            >
              {!loading ? "Giriş Yap" : "Giriş Yapılıyor..."}
            </button>
          </Form>
        </Formik>
        <div className="my-3 flex flex-col gap-4 md:flex-row lg:justify-between ">
          <Link
            to={"/register"}
            className="ps-2 hover:text-blue-700 transition-colors "
          >
            Kayıt ol
          </Link>
          <Link
            to={"/login"}
            className="ps-2 hover:text-blue-700 transition-colors "
          >
            Şifremi unuttum
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
