import { useSwiper } from '../../store/swiper'

type TypeButtonSlide = { type: 'next' | 'prev' }

const generateStyle = (isDisabled: boolean) => {
  const active = 'bg-gray-active text-black'
  const inactive = 'bg-gray-inactive text-gray-active'

  return `w-12 h-12 rounded-full text-2xl ${isDisabled ? inactive : active}`
}

export default function ButtonSlide({ type }: TypeButtonSlide) {
  const { swiper, isBeginning, isEnd } = useSwiper()

  const nextSlide = () => swiper.slideNext()
  const prevSlide = () => swiper.slidePrev()

  const isDisabled = type === 'next' ? isEnd : isBeginning

  return (
    <button
      disabled={isDisabled}
      onClick={type === 'next' ? nextSlide : prevSlide}
      className={generateStyle(isDisabled)}
    >
      {type === 'next' ? '>' : '<'}
    </button>
  )
}
