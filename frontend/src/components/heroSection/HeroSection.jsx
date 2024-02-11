import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Slide from "./Slide";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HeroSection() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/product")
      .then((res) => {
        setData(res.data.heroProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper w-full lg:max-w-[75%] h-full max-h-[50%] my-8 py-6 bg-gray-200 rounded-lg"
      >
        {data.map((d) => (
          <SwiperSlide key={d.id} className="rounded-lg">
            <Slide data={d}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
