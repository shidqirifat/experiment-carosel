import { ReactNode } from 'react'
import Navigation from './Navigation'

type ContainerProps = {
  children: ReactNode
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="mt-12">
      <Navigation />
      {children}
    </div>
  )
}
