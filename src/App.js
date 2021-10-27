
import './App.css';
import AmortizationCalculator from './components/AmortizationCalculator';
import { useState } from 'react'
import AmortizationSummary from './components/AmortizationSummary';
import LoanAmortizationChart from './components/LoanAmortizationChart';
import AmortizationSchedule from './components/AmortizationSchedule';

function App() {
  const [formInput, setFormInput] = useState({
    loanAmount: '',
    interestRate: '',
    downPayment: '',
    years: ''
  })

  const [errors, setErrors] = useState({
    error: ''
  })

  const [monthlyPayment, setMonthlyPayment] = useState('-')
  const [numberOfPayments, setNumberOfPayments] = useState('-')
  const [totalPayments, setTotalPayments] = useState('-')
  const [originalLoanAmount, setOriginalLoanAmount] = useState('-')
  const [years, setYears] = useState('')


  const handleFormInput = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value
    })
  }

  const handleForm = async (e) => {
    e.preventDefault()

    const validatedAmount = await validateField(formInput.loanAmount)
    const validatedInterest = await validateField(formInput.interestRate)
    const validatedDownPayment = await validateField(formInput.downPayment)
    const validatedYears = await validateField(formInput.years)

    if(validatedAmount && validatedInterest && validatedDownPayment && validatedYears){
      calculateValues(formInput.loanAmount, formInput.interestRate, formInput.downPayment, formInput.years)
    } else {
    }

  }

  const validateField = (field) => {
    const int = parseFloat(field)
    if(field === '' || field == 0 ){
      return false 
    } else if (isNaN(int)){
      return false
    } else {
      return true 
    }
  }



  const calculateValues = ( loanAmount, interestRate, downPayment, years) => {

    const principle = loanAmount - downPayment
    const monthlyInterest = interestRate / 100 / 12
    const numberOfPayments = years * 12 

    let monthlyPayments = (principle * [monthlyInterest * (1 + monthlyInterest) ** numberOfPayments]) / [ (1 + monthlyInterest) ** numberOfPayments - 1]
    let monthlyPaymentsFormatted = monthlyPayments.toFixed(2)

    let total = monthlyPaymentsFormatted * numberOfPayments
    let totalFormatted = total.toFixed(2)

    setOriginalLoanAmount(loanAmount)
    setNumberOfPayments(numberOfPayments)
    setMonthlyPayment(monthlyPaymentsFormatted)
    setTotalPayments(totalFormatted)
    setYears(years)
  }
 
  return (
    <div className="App">
      <AmortizationCalculator
        handleFormInput={handleFormInput}
        handleForm={handleForm}
      />
      <AmortizationSummary 
        monthlyPayment={monthlyPayment}
        numberOfPayments={numberOfPayments}
        totalPayments={totalPayments}
        originalLoanAmount={originalLoanAmount}
        years={years}
      />
      <AmortizationSchedule 
        monthlyPayment={monthlyPayment}
        years={years}
      />

    </div>
  );
}

export default App;
