import { useEffect } from 'react'
import { useFetch } from '../hooks/useFetch'
import '../App.css'

const UserList = () => {
  const {
    data,
    loading,
    error,
    fetchData,
    handleCancelRequest,
  } = useFetch()

  useEffect(() => {
    fetchData(import.meta.env.VITE_API_URL)
  }, [])

  return (
    <>
      {loading && (
        <>
          <button
            className='button'
            onClick={handleCancelRequest}
          >
            Cancel Request
          </button>
          <div>Loading...</div>
        </>
      )}
      {error && <div>Error: {error}</div>}
      {data && (
        <ul className='card'>
          <h3>Users:</h3>
          {data?.map((user) => {
            return <li key={user.id}>{user.name}</li>
          })}
        </ul>
      )}
    </>
  )
}

export default UserList
