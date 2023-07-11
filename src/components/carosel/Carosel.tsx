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
import { useEffect, useState } from 'react'
import { useDisplay } from '../../store/display'

type ProductCaroselProps = { products: Product[] }

const breakpoints = {
  120: { slidesPerView: 1.15 },
  768: { slidesPerView: 3 },
}

export default function Carosel({ products }: ProductCaroselProps) {
  const { setSwiper, updateActiveSlide } = useSwiper()
  const { display, setDisplay } = useDisplay()
  const [paddingSize, setPaddingSize] = useState(0)

  const initialSwiper = (swiper: any) => setSwiper(swiper)

  const handleSlide = (swiper: any) => {
    const { isBeginning, isEnd } = swiper
    updateActiveSlide({ isBeginning, isEnd })
  }

  const getPaddingLeft = () => {
    const caroselHeader = document.getElementById('carosel-header')

    if (!caroselHeader) return setPaddingSize(0)
    if (display.small || display.medium) return setPaddingSize(24)

    return setPaddingSize(
      (window.innerWidth - caroselHeader.offsetWidth + 96) / 2
    )
  }

  useEffect(() => {
    setDisplay()
    window.addEventListener('resize', setDisplay)

    return () => {
      window.removeEventListener('resize', setDisplay)
    }
  }, [])

  useEffect(() => {
    getPaddingLeft()
  }, [display])

  return (
    <div>
      <Swiper
        spaceBetween={12}
        breakpoints={breakpoints}
        className="!pb-6 !pr-6 md:!pr-12"
        style={{
          paddingLeft: paddingSize,
        }}
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
