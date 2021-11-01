
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
  const [errors, setErrors] = useState('')

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
      setErrors('')
    }

  }

  const validateField = (field) => {

    if(field === '' || field == 0){
      setErrors('Please Enter a value')
      return false
    } else if (isNaN(field)){
      setErrors('Please Enter a number')
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
        month: i ,
        payment: monthlyPayments,
        interestPaid: interest,
        principlePaid: principlePaid,
        balance: balance
      })
    }
    setPaymentData(newObject)
  }


  // arrays to push in data points 
  let principlePaidData = []
  let principlePaidDataRounded = []

  let interestData = []
  let interestDataRounded = []

  let yearlyBalanceDataPoints = []
  let balanceDataPointsRounded = []

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

  principlePaidData?.map(dataPoint => {
    principlePaidDataRounded.push(Math.round(dataPoint.toFixed(2)))
    return true 
  })

  interestData?.map(dataPoint => {
    return interestDataRounded.push(Math.round(dataPoint.toFixed(2)))

  })

  yearlyBalanceDataPoints?.map(dataPoint => {
    return balanceDataPointsRounded.push(Math.round(dataPoint.toFixed(2)))
  })

  // Splits years into months and adds up the total interest and total principle paid that year.  
  let copyOfPaymentData = paymentData?.slice()

  let counterOne = paymentData.length
  let counterTwo = paymentData.length

  let principlePaymentData = []
  let yearlyPrinciplePaymentData = []
  let annualPrinciplePaidTotal = []
  let yearlyPrinciplePaidDataPoints = []
  let principleDataPointsRounded = []

  let interestPaymentData = []
  let yearlyInterestPaymentData = []
  let annualInterestPaidTotal = []
  let yearlyInterestPaidDataPoints = []
  let interestDataPointsRounded = []
  

  copyOfPaymentData.map(year => principlePaymentData.push(year.principlePaid))
  copyOfPaymentData.map(year => interestPaymentData.push(year.interestPaid))

  // Find Principle Payment Data Points 
  while(counterOne > 0){
    yearlyPrinciplePaymentData.push(principlePaymentData.splice(0, 12))
    counterOne = counterOne - 12
  }

  yearlyPrinciplePaymentData.map(year => {
    return annualPrinciplePaidTotal.push(year.reduce((a,b) => a+b))
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
    return annualInterestPaidTotal.push(year.reduce((a,b) => a+b))
  })

  let yearlyTotalInterestPaid = 0
  for(let i = 0; i < annualInterestPaidTotal.length; i++){
    yearlyTotalInterestPaid = yearlyTotalInterestPaid + annualInterestPaidTotal[i]
    yearlyInterestPaidDataPoints.push(yearlyTotalInterestPaid)
  }

  // Round up Data point numbers
  yearlyPrinciplePaidDataPoints?.map(dataPoint => {
    return principleDataPointsRounded.push(Math.round(dataPoint.toFixed(2)))
  })

  yearlyInterestPaidDataPoints?.map(dataPoint => {
    return interestDataPointsRounded.push(Math.round(dataPoint.toFixed(2)))
  })

  //data points
  const loanAmortizationChartData = {
    labels: labelYears,
    datasets:[
      {
        label:'Balance',
        data: balanceDataPointsRounded,
        backgroundColor: 'rgba(61, 219, 147, 1)',
        borderColor: 'rgba(61, 219, 147, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 1)'
      },
      {
        label:'Principle',
        data: principleDataPointsRounded,
        backgroundColor: 'rgb(0, 145, 255)',
        borderColor: '  rgb(0, 145, 255)',
        pointBorderColor: 'rgba(255, 255, 255, 1)'
      },
      {
        label:'Interest',
        data: interestDataPointsRounded,
        backgroundColor: 'rgb(0, 70, 147)',
        borderColor: 'rgb(0, 70, 147)',
        pointBorderColor: 'rgba(255, 255, 255, 1)'
      }
    ],
    options: {
      maintainAspectRatio: false
    }
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
        data: interestDataRounded
      },
      {
        label:'Principle',
        fill: true,
        backgroundColor: 'rgb(0, 145, 255, .5)',
        borderColor: 'rgb(0, 145, 255)',
        data: principlePaidDataRounded
      }
    ],
    options: {
      maintainAspectRatio: false
    }
  }


  return (
    <div className="App">

      <p className='amortization-summary'>Amortization is the gradual reduction of a debt over a given period. 
        My amortization calculator will amortize (show the reduction) your debt
        (such as a mortgage) and display your payment breakdown of interest paid,
        principal paid and loan balance over the life of the loan. It comes as a 
        surprise to some that most of your initial payments on a loan are used to
        pay interest. For example, in a 30-year mortgage over 83% of your payments
        are used to pay down interest in the first year, while only 3% of your payments
        are used to pay down interest in the final year. This is the primary reason why
        little equity is built in the first few years of a mortgage.</p>

      <AmortizationCalculator
        handleFormInput={handleFormInput}
        handleForm={handleForm}
        errors={errors}
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
