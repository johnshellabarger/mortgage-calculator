
import './App.css';
import AmortizationCalculator from './components/AmortizationCalculator';
import { useState } from 'react'
import AmortizationSummary from './components/AmortizationSummary';
import AmortizationSchedule from './components/AmortizationSchedule';

function App() {
  const [formInput, setFormInput] = useState({
    loanAmount: '',
    interestRate: '',
    years: ''
  })

  const [monthlyPayment, setMonthlyPayment] = useState('-')
  const [numberOfPayments, setNumberOfPayments] = useState('-')
  const [totalPayments, setTotalPayments] = useState('-')
  const [originalLoanAmount, setOriginalLoanAmount] = useState('-')

  const [years, setYears] = useState('')

  const [paymentData, setPaymentData] = useState([])


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
    const validatedYears = await validateField(formInput.years)

    if(validatedAmount && validatedInterest && validatedYears){
      calculateValues(formInput.loanAmount, formInput.interestRate, formInput.years)
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


  // calculates base values, creates schedule
  const calculateValues = async ( loanAmount, interestRate, years) => {
    const principle = loanAmount
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
    setPaymentData(newObject)
  }


  // arrays to push in data points 
  let principlePaidData = []
  let interestData = []
  let yearlyBalanceDataPoints = []

  // labels for second chart
  let labelYears = []
  for(let i = 1; i <= years; i++){
    labelYears.push(i)
  }

  // adds data points to map 
  paymentData?.map(paymentSchedule => {
    if(paymentSchedule.month % 12 === 0){
      interestData.push(paymentSchedule.interestPaid)
      principlePaidData.push(paymentSchedule.principlePaid)
      yearlyBalanceDataPoints.push(paymentSchedule.balance)
    }
        return true 
  })


  let copyOfPaymentData = paymentData?.slice()

  let counterOne = paymentData.length
  let counterTwo = paymentData.length
  
  
  // annualPrinciplePaidTotal 
  
  

  let principlePaymentData = []
  let yearlyPrinciplePaymentData = []
  let annualPrinciplePaidTotal = []
  let yearlyPrinciplePaidDataPoints = []

  let interestPaymentData = []
  let yearlyInterestPaymentData = []
  let annualInterestPaidTotal = []
  let yearlyInterestPaidDataPoints = []


  copyOfPaymentData.map(year => principlePaymentData.push(year.principlePaid))
  copyOfPaymentData.map(year => interestPaymentData.push(year.interestPaid))

  // Find Principle Payment Data Points 
  while(counterOne > 0){
    yearlyPrinciplePaymentData.push(principlePaymentData.splice(0, 12))
    counterOne = counterOne - 12
  }

  yearlyPrinciplePaymentData.map(year => {
    annualPrinciplePaidTotal.push(year.reduce((a,b) => a+b))
  })

  let yearlyTotalPrinciplePaid = 0
  for(let i = 0; i < annualPrinciplePaidTotal.length; i++){
    yearlyTotalPrinciplePaid = yearlyTotalPrinciplePaid + annualPrinciplePaidTotal[i]
    yearlyPrinciplePaidDataPoints.push(yearlyTotalPrinciplePaid)
  }

  // Find Interest Payment Data Points
  while(counterTwo > 0){
    yearlyInterestPaymentData.push(interestPaymentData.splice(0, 12))
    counterTwo = counterTwo - 12
  }

  yearlyInterestPaymentData.map(year => {
    annualInterestPaidTotal.push(year.reduce((a,b) => a+b))
  })

  let yearlyTotalInterestPaid = 0
  for(let i = 0; i < annualInterestPaidTotal.length; i++){
    yearlyTotalInterestPaid = yearlyTotalInterestPaid + annualInterestPaidTotal[i]
    yearlyInterestPaidDataPoints.push(yearlyTotalInterestPaid)
  }





  //data points
  const loanAmortizationChartData = {
    labels: labelYears,
    datasets:[
      {
        label:'Balance',
        data: yearlyBalanceDataPoints,
        backgroundColor: 'rgba(61, 219, 147, 1)',
        borderColor: 'rgba(61, 219, 147, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 1)'
      },
      {
        label:'Principle',
        data: yearlyPrinciplePaidDataPoints,
        backgroundColor: 'rgb(0, 145, 255)',
        borderColor: '  rgb(0, 145, 255)',
        pointBorderColor: 'rgba(255, 255, 255, 1)'
      },
      {
        label:'Interest',
        data: yearlyInterestPaidDataPoints,
        backgroundColor: 'rgb(0, 70, 147)',
        borderColor: 'rgb(0, 70, 147)',
        pointBorderColor: 'rgba(255, 255, 255, 1)'
      }
    ]
  }

  const principlePaymentChartData = {
    labels: labelYears,
    yAxisID: "Payment",
    datasets:[
      {
        label:'Interest',
        fill: true,
        backgroundColor: 'rgb(0, 70, 147, .5)',
        borderColor: 'rgb(0, 70, 147,)',
        data: interestData
      },
      {
        label:'Principle',
        fill: true,
        backgroundColor: 'rgb(0, 145, 255, .5)',
        borderColor: 'rgb(0, 145, 255)',
        data: principlePaidData
      }
    ]
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
        loanAmount={originalLoanAmount}
        years={years}
        loanAmortizationChartData={loanAmortizationChartData}
        principlePaymentChartData={principlePaymentChartData}
      />
      <AmortizationSchedule 
        monthlyPayment={monthlyPayment}
        years={years}
        paymentData={paymentData}
      />

    </div>
  );
}

export default App;
