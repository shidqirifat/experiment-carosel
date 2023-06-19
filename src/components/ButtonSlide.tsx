import { useMemo } from "react";
import { useSwiper } from "../store/swiper";

type TypeButtonSlide = { type: "next" | "prev" };

const generateStyle = (isDisabled: boolean): string => {
  const active = "bg-gray-active text-black";
  const inactive = "bg-gray-inactive text-gray-active";

  return `w-12 h-12 rounded-full text-2xl ${isDisabled ? inactive : active}`;
};

export default function ButtonSlide({ type }: TypeButtonSlide) {
  const { swiper, isBeginning, isEnd } = useSwiper();

  const nextSlide = (): void => swiper.slideNext();
  const prevSlide = (): void => swiper.slidePrev();

  const isDisabled = useMemo((): boolean => {
    if (type === "next") return isEnd;

    return isBeginning;
  }, [isBeginning, isEnd, type]);

  const style = useMemo((): string => generateStyle(isDisabled), [isDisabled]);

  return (
    <button
      disabled={isDisabled}
      onClick={type === "next" ? nextSlide : prevSlide}
      className={style}
    >
      {type === "next" ? ">" : "<"}
    </button>
  );
}
