import { ReactNode, useEffect } from 'react'
import Navigation from './Navigation'
import { useDisplay } from '../../store/display'

type ContainerProps = {
  children: ReactNode
}

export default function Container({ children }: ContainerProps) {
  const { setDisplay } = useDisplay()

  useEffect(() => {
    setDisplay()
    window.addEventListener('resize', setDisplay)

    return () => {
      window.removeEventListener('resize', setDisplay)
    }
  }, [])

  return (
    <div className="mt-12">
      <Navigation />
      {children}
    </div>
  )
}
