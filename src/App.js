
import './App.css';
import AmortizationCalculator from './components/AmortizationCalculator';
import { useState } from 'react'

function App() {
  const [formInput, setFormInput] = useState({
    'loan-amount': '',
    'interest-rate': '',
    'down-payment': '',
    'years': ''
  })

  const handleForm = (e) => {
    e.preventDefault()
    
  }

  return (
    <div className="App">
      <AmortizationCalculator 
        handleForm={handleForm}
        setFormInput={setFormInput}
      />
    </div>
  );
}

export default App;
