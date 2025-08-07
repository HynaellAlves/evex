import Nav from "./index.module.css";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { prismic } from "@/functions/requests";

export default function Navbar() {

  const [categorys, setCategorys] = useState<[{
    category: string,
    category_icon: {
      category: string,
      url: string,
      alt: string,
      id: string,
    }
  }]>();

  const searchCategory = async () => {

    const response = await prismic();

    if (response) {
      const Categorys = response.slices.find((e: any) => e.slice_type == "categorys")?.primary.category
      setCategorys(Categorys);
    }
  }

  useEffect(() => {
    searchCategory()
  }, [])

  return (
    <div className={Nav.content}>
      <nav className={Nav.navbar}>
        {/* Swiper com navegação */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          slidesPerView={7}
          spaceBetween={2}
          className={Nav.swiper}
        >
          {categorys?.map((item) => (
            <SwiperSlide key={`${item.category_icon.id}`} className={Nav.slide}>
              <li className={Nav.navItem}>
                <Link href={`/${item.category}`} className={Nav.navLink}>
                  <span className={Nav.label}>{item.category}</span>
                  <img
                    src={item.category_icon.url}
                    alt={`${item.category_icon.alt} icon`}
                    className={Nav.navIcon}
                    width={30}
                    height={30}
                  />
                  {item.category === "MAIS" && (
                    <FaChevronDown className={Nav.moreIcon} />
                  )}
                </Link>
              </li>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-button-prev">
          <img src="/setaL.png" alt="Voltar" />
        </div>
        <div className="swiper-button-next">
          <img src="/setaR.png" alt="Avançar" />
        </div>
      </nav>
    </div>
  );
}