/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'

type Status = {
  isBeginning: boolean
  isEnd: boolean
}

type State = {
  swiper: any
}

type Action = {
  setSwiper: (swiper: any) => void
  updateActiveSlide: (status: Status) => void
}

export const useSwiper = create<State & Status & Action>((set) => ({
  swiper: {
    slideNext: () => {},
    slidePrev: () => {},
    activeIndex: 0,
  },
  isBeginning: true,
  isEnd: false,
  setSwiper: (swiper: any) => set(() => ({ swiper })),
  updateActiveSlide: (status: Status) =>
    set(() => ({ isBeginning: status.isBeginning, isEnd: status.isEnd })),
}))
