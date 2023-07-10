import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { Router } from '@remix-run/router'

export type Provider = {
  children: Router
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 10_000,
    },
  },
})

export default function Provider({ children }: Provider) {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={children} />
    </QueryClientProvider>
  )
}

export { queryClient }
