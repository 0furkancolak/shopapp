import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex items-center justify-center mb-3 mt-10">
      <div>
        Powered by{" "}
        <Link
          className="text-blue-700 hover:text-blue-800 transition-all"
          to={"https://fcolak.com/"}
          target="_blank"
        >
          Furkan Çolak
        </Link>{" "}
      </div>
    </div>
  );
}
