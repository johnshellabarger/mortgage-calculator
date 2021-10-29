
import './App.css';
import AmortizationCalculator from './components/AmortizationCalculator';
import { useState } from 'react'
import AmortizationSummary from './components/AmortizationSummary';
import AmortizationSchedule from './components/AmortizationSchedule';

function App() {
  const [formInput, setFormInput] = useState({
    loanAmount: '',
    interestRate: '',
    downPayment: '',
    years: ''
  })

  const [monthlyPayment, setMonthlyPayment] = useState('-')
  const [numberOfPayments, setNumberOfPayments] = useState('-')
  const [totalPayments, setTotalPayments] = useState('-')
  const [originalLoanAmount, setOriginalLoanAmount] = useState('-')

  const [years, setYears] = useState('')
  const [interestRate, setInterestRate] = useState('')

  const [object, setObject] = useState([])


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
      // interestPayment(formInput.loanAmount)
    }
  }

  const validateField = (field) => {
    const int = parseFloat(field)
    if(field === '' || field === 0 ){
      return false 
    } else if (isNaN(int)){
      return false
    } else {
      return true 
    }
  }

  const calculateValues = async ( loanAmount, interestRate, downPayment, years) => {
    const principle = loanAmount - downPayment
    const monthlyInterest = interestRate / 100 / 12
    const numberOfPayments = years * 12 

    let monthlyPayments = (principle * [monthlyInterest * (1 + monthlyInterest) ** numberOfPayments]) / [ (1 + monthlyInterest) ** numberOfPayments - 1]
 
    let total = monthlyPayments * numberOfPayments


    setMonthlyPayment(Math.round(monthlyPayments.toFixed(2)))
    setNumberOfPayments(numberOfPayments)
    setTotalPayments(Math.round(total.toFixed(2)))
    setOriginalLoanAmount(loanAmount)
    setYears(years)

    let newObject = []
    let balance = loanAmount

    for(let i = 1; i < numberOfPayments + 1; i++){
      let interest = [(interestRate / 100) / 12 ] * balance
      let principlePaid = monthlyPayments - interest
  
      let newAmount = balance - principlePaid
      balance = newAmount
      
      newObject.push({
        month: i,
        payment: Math.round(monthlyPayments.toFixed(2)),
        interestPaid: Math.round(interest.toFixed(2)),
        principlePaid: Math.round(principlePaid.toFixed(2)),
        balance: Math.round(balance.toFixed(2))
      })
    }
    setObject(newObject)

  }

  let labelYears = []
  for(let i = 1; i <= years; i++){
    labelYears.push(i)
  }

  let principlePaidData = []
  let interestData = []


  const chartData = {
    labels: labelYears,
    datasets:[
      {
        label:'Principle',
        order: 0,
        strokeColor: "rgba(195, 40, 96, 1)",
        pointColor: "rgba(195, 40, 96, 1)",
        pointStrokeColor: "#202b33",
        pointHighlightStroke: "rgba(225,225,225,0.9)",
        data: principlePaidData
      },
      {
        label:'Interest',
        order: 2,
        strokeColor: "rgba(255, 172, 100, 1)",
        pointBackgroundColor: "rgba(225, 0, 0, 0)",
        pointBorderColor: "rgb(13, 35, 58)",
        pointBorderWidth: 2,
        pointHighlightStroke: "rgba(225,225,225,0.9)",
        data: interestData
      },
      {
        label:'Balance',
        order: 2,
        strokeColor: "rgba(255, 172, 100, 1)",
        pointBackgroundColor: "rgba(225, 0, 0, 0)",
        pointBorderColor: "rgb(13, 35, 58)",
        pointBorderWidth: 2,
        pointHighlightStroke: "rgba(225,225,225,0.9)",
        data: interestData
      }
    ]
  }

  const chartDataTwo = {
    labels: labelYears,
    datasets:[
      {
        label:'Principle',
        backgroundColor: "rgba(26, 103, 227, 0.49)",
        fill: true,
        order: 0,
        strokeColor: "rgba(195, 40, 96, 1)",
        pointColor: "rgba(195, 40, 96, 1)",
        pointStrokeColor: "#202b33",
        pointHighlightStroke: "rgba(225,225,225,0.9)",
        data: principlePaidData
      },
      {
        label:'Interest',
        backgroundColor: "rgba(13, 35, 59, 0.49)",
        fill: true,
        order: 2,
        strokeColor: "rgba(255, 172, 100, 1)",
        pointBackgroundColor: "rgba(225, 0, 0, 0)",
        pointBorderColor: "rgb(13, 35, 58)",
        pointBorderWidth: 2,
        pointHighlightStroke: "rgba(225,225,225,0.9)",
        data: interestData
      }
    ]
  }

  object?.map(paymentSchedule => {
    if(paymentSchedule.month % 12 === 0){
      interestData.push(paymentSchedule.interestPaid)
      principlePaidData.push(paymentSchedule.principlePaid)
    }
        return true 
  })

  object?.map(paymentSchedule => {
    if(paymentSchedule.month % 12 === 0){
      interestData.push(paymentSchedule.interestPaid)
      principlePaidData.push(paymentSchedule.principlePaid)
    }
        return true 
  })



  


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
        loanAmount={originalLoanAmount}
        years={years}
        chartData={chartData}
        chartDataTwo={chartDataTwo}
      />
      <AmortizationSchedule 
        monthlyPayment={monthlyPayment}
        years={years}
        object={object}
      />

    </div>
  );
}

export default App;
