import { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";
import "./App.css";

function App() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleAdviceGiver() {
    try {
      setError("");
      setLoading(true);
      const response = await fetch("https://api.adviceslip.com/advice");
      if (!response.ok) {
        throw new Error("Failed to fetch advice");
      }
      const data = await response.json();
      setAdvice(data.slip.advice);
    } catch (e) {
      console.error(e);
      setAdvice("");
      setError("Trouble fetching advice.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleAdviceGiver();
  }, []);

  return (
    <>
      <div>
        <p>Wahenga once said...</p>
        {error && <p>{error}</p>}
        <h2>{advice}</h2>
        <button type="button" onClick={handleAdviceGiver}>
          Advice me
        </button>
        {loading && <RingLoader color="black" loading={loading} size={30} />}
      </div>
    </>
  );
}

export default App;
