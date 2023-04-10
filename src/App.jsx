import { useFetch } from './hooks/useFetch'
import './App.css'

function App() {
  const { data, loading, error } = useFetch(import.meta.env.VITE_API_URL)

  return (
    <div className='App'>
      <h1>Fetch Like a Pro</h1>
      {loading && <div>Loading...</div>}
      {error && (
        <div>
          <h2>Error: {error.code}</h2>
          <p>{error.msg}</p>
        </div>)}
      {data && (
        <>
          <div className='card'>
            <h3>Users:</h3>
            {data?.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default App
