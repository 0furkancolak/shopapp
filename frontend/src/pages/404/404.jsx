import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="h-screen w-full flex flex-col justify-center gap-3 items-center">
      <p className="font-bold text-8xl">404</p>
      <Link
        className="font-bold text-4xl text-blue-600 hover:text-blue-700 transition-colors"
        to={"/"}
      >
        Anasayfa
      </Link>
    </div>
  );
}
