import React from 'react'
import CaroselHeader from './CaroselHeader'
import Carosel from './Carosel'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../../services/product'

export default function CaroselWrapper() {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  return (
    <div>
      <CaroselHeader />
      <Carosel products={products || []} />
    </div>
  )
}
