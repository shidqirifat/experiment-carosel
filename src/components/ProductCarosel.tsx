import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Product, products } from "../data/products";
import { toCurrency } from "../utils/currency";
import { useSwiper } from "../store/swiper";

const ProductCard = ({ image, name, category, price }: Product) => {
  return (
    <div>
      <img src={image} alt={name} width="100%" height="100%" />
      <div className="pt-5 pr-4">
        <h2 className="text-black font-medium text-base leading-6">{name}</h2>
        <h3 className="text-grey text-base leading-6 my-[2px]">{category}</h3>
        <h4 className="text-black text-base leading-6">{toCurrency(price)}</h4>
      </div>
    </div>
  );
};

const breakpoints = {
  120: { slidesPerView: 1.15 },
  768: { slidesPerView: 3 },
};

export default function ProductCarosel() {
  const { setSwiper, updateActiveSlide } = useSwiper();

  const initialSwiper = (swiper: any): void => setSwiper(swiper);

  const handleSlide = (swiper: any): void => {
    const { isBeginning, isEnd } = swiper;
    updateActiveSlide({ isBeginning, isEnd });
  };

  return (
    <div>
      <Swiper
        spaceBetween={12}
        breakpoints={breakpoints}
        className="px-6 pb-6 md:px-12"
        modules={[Scrollbar]}
        scrollbar={{ draggable: true, hide: true }}
        onAfterInit={(swiper) => initialSwiper(swiper)}
        onSlideChange={(swiper) => handleSlide(swiper)}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
