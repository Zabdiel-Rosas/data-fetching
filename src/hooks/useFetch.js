import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 404) {
          setError({
            code: response.status,
            msg: `Oops!, We couldn't find the resource :(`,
          })
        }
      })
      .then((data) => data && setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
