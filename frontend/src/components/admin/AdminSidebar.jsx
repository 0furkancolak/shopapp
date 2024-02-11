import { Link } from "react-router-dom";
import { CiBoxList } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaUsers } from "react-icons/fa";

export default function AdminSidebar() {
  const links = [
    {
      id: 1,
      url: "/admin",
      name: "Ürün Listesi",
      icon: <CiBoxList size={28} />,
    },
    {
      id: 2,
      url: "/admin/product-create",
      name: "Ürün Ekleme",
      icon: <IoMdAddCircleOutline size={28} />,
    },
    {
      id: 3,
      url: "/admin/users",
      name: "Kullanıcı Listesi",
      icon: <FaUsers size={28} />,
    },
  ];
  return (
    <div className="h-screen w-full bg-orange-500 text-white px-4 pt-10">
      {links.map((link) => (
        <Link
          className="flex gap-2 px-4 py-3 items-center text-xl hover:bg-gray-700 transition-colors rounded-lg"
          key={link.id}
          to={link.url}
        >
          <div>{link.icon}</div>
          {link.name}
        </Link>
      ))}
    </div>
  );
}
