import { useState } from 'react'

export const useFetch = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [controller, setController] = useState(null)

  const fetchData = (url) => {
    setLoading(true)
    const abortController = new AbortController()
    setController(abortController)

    fetch(url, { signal: abortController.signal })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Request Canceled')
        } else {
          setError(error)
        }
      })
      .finally(() => setLoading(false))

    return () => abortController.abort()
  }

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort()
      setError('Request Canceled')
    }
  }

  return { data, loading, error, fetchData, handleCancelRequest }
}
