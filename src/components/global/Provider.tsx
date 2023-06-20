import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactNode } from 'react'

export type Provider = {
  children: ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 200,
    },
  },
})

export default function Provider({ children }: Provider) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
