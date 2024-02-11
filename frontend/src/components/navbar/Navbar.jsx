import { FaShoppingBasket } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import LeftNavbar from "./LeftNavbar";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickHandle = () => {
    dispatch(logout());
    navigate("/");
  };
  const isUser = useSelector((state) => state.auth?.user);
  // console.log(isUser);
  // useEffect(() => {
  //   if (isUser) {
  //     navigate("/");
  //   }
  // }, [isUser, navigate]);
  return (
    <div className="flex justify-between text-white gap-20 items-center h-20 bg-orange-700 container">
      <Link className="text-4xl font-bold" to={"/"}>
        ShopApp
      </Link>
      <div className="flex flex-1 relative gap-2 items-center">
        <input
          type="text"
          className="flex-1 text-black rounded-lg px-3 py-2 ps-10"
        />
        <IoSearch className="absolute text-black mx-2" size={28} />
      </div>
      <div className="flex items-center gap-4">
        {isUser ? (
          <LeftNavbar
            user={isUser.name}
            isAdmin={isUser.isAdmin}
            clickHandle={clickHandle}
          />
        ) : (
          <Link to={"/login"}>Giriş Yap</Link>
        )}
        <Link to={"/sepet"}>
          <FaShoppingBasket size={28} />
        </Link>
      </div>
    </div>
  );
}
