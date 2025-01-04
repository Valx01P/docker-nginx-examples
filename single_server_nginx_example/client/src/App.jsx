import { useState, useEffect } from 'react'

function App() {
  const [phrase, setPhrase] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`/node/api/phrase`)
      .then(res => res.json())
      .then(data => {
        setPhrase(data.phrase)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <div>
      <h1>Message from Database:</h1>
      <p>{phrase}</p>
    </div>
  )
}

export default App