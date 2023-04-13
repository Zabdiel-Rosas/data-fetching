import { useState } from 'react'
import axios from 'axios'

export const useFetch = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [controller, setController] = useState(null)

  const fetchData = async (url) => {
    setLoading(true)
    const abortController = new AbortController()
    setController(abortController)

    try {
      const response = await axios.get(url, { signal: abortController.signal })
      setData(response.data)
    } catch (error) {
      if (error.name === 'CanceledError') {
        console.log('Request has been canceled by user')
      } else {
        setError(error.message)
      }
    }
    setLoading(false)

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
