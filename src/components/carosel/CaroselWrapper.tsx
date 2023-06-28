import React from 'react'
import CaroselHeader from './CaroselHeader'
import Carosel from './Carosel'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../../services/product'
import Container from '../global/Container'

export default function CaroselWrapper() {
  const { data: products } = useQuery({
    queryKey: ['carosel'],
    queryFn: getProducts,
  })

  return (
    <Container>
      <CaroselHeader />
      <Carosel products={products || []} />
    </Container>
  )
}
