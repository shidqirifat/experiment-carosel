import { create } from 'zustand'

type Display = {
  display: {
    small: boolean
    medium: boolean
    large: boolean
    extraLarge: boolean
  }
}

type Action = {
  setDisplay: () => void
}

const initialState = {
  small: false,
  medium: false,
  large: false,
  extraLarge: false,
}

const updateDisplayBySize = () => {
  const width = window.innerWidth

  if (!width) return initialState
  if (width < 640) return { ...initialState, small: true }
  if (width < 768) return { ...initialState, medium: true }
  if (width < 1024) return { ...initialState, large: true }
  return { ...initialState, extraLarge: true }
}

export const useDisplay = create<Display & Action>((set) => ({
  display: initialState,
  setDisplay: () => set(() => ({ display: updateDisplayBySize() })),
}))
