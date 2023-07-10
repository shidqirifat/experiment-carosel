import { useEffect, useState } from 'react'

export default function useReady(
  timeout: number,
  dependencies: ReadonlyArray<unknown>
) {
  const [ready, setReady] = useState(false)

  const resetReady = () => setReady(false)

  useEffect(() => {
    const delayReady = setTimeout(() => setReady(true), timeout)

    return () => clearTimeout(delayReady)
  }, dependencies)

  return { ready, resetReady }
}
