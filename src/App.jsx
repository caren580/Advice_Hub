import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [advice, setAdvice] = useState("")
  const [error, setError] = useState(null)

  async function handleAdviceGiver() {
    try {
      setError("")
      const response = await fetch("https://api.adviceslip.com/advice")
      if (!response.ok) {
        throw new Error("Failed to fetch advice")
      }
      const data = await response.json()
      setAdvice(data.slip.advice)
    } catch (e) {
      console.error(e)
      setAdvice("")
      setError("Trouble fetching advice.")
    }
  }


  useEffect(() => {
    handleAdviceGiver()
  }, [])

  return (
    <>
      <div>
        <p>Wahenga once said...</p>
        {error && <p>{error}</p>}
        <h2>{advice}</h2>
        <button type="button" onClick={handleAdviceGiver}>Advice me</button>
      </div>
    </>
  )
}

export default App;
