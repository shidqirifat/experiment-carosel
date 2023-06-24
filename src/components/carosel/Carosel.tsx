/* eslint-disable @typescript-eslint/no-explicit-any */
import 'swiper/css'
import 'swiper/css/scrollbar'
import { Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSwiper } from '../../store/swiper'
import { Product } from '../../services/product'
import SkeletonCard from './SkeletonCard'
import { fakeArray } from '../../utils/array'
import CaroselCard from './CaroselCard'

type ProductCaroselProps = { products: Product[] }

const breakpoints = {
  120: { slidesPerView: 1.15 },
  768: { slidesPerView: 3 },
}

export default function Carosel({ products }: ProductCaroselProps) {
  const { setSwiper, updateActiveSlide } = useSwiper()

  const initialSwiper = (swiper: any) => setSwiper(swiper)

  const handleSlide = (swiper: any) => {
    const { isBeginning, isEnd } = swiper
    updateActiveSlide({ isBeginning, isEnd })
  }

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
        grabCursor={true}
      >
        {products.length === 0
          ? fakeArray(4).map((item) => (
              <SwiperSlide key={item}>
                <SkeletonCard />
              </SwiperSlide>
            ))
          : products.map((product) => (
              <SwiperSlide key={product.id}>
                <CaroselCard {...product} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  )
}
