import React from 'react'
import LoanAmortizationChart from './LoanAmortizationChart'
import LoanAmortizationChartTwo from './LoanAmortizationChartTwo'


const AmortizationSummary = ({ monthlyPayment, numberOfPayments, totalPayments, loanAmount, years, loanAmortizationChartData, principlePaymentChartData}) => {
  return (
    <section className='cal-card'>
      <div>
        <h2 className='cal-header'>Your Amortization Summary</h2>
        <h3 className='cal-subheader'>Base Calculations</h3>
        <table className='cal-table base'>
          <thead>
            <tr>
              <th>Monthly Principal & Interest</th>
              <th>Number of Payments</th>
              <th>Total Payments</th>
              <th>Original Loan Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label='Monthly Principal & Interest'>${monthlyPayment}</td>
              <td data-label='Number of Payments'>{numberOfPayments}</td>
              <td data-label='Total Payments'>${totalPayments}</td>
              <td data-label='Original Loan Amount' className='loan-amount-data'>${loanAmount}</td>
            </tr>
          </tbody>
        </table>

        <h3 className='cal-subheader'>Additional amortization information</h3>

        <LoanAmortizationChart
            years={years}
            loanAmortizationChartData={loanAmortizationChartData}
          />

        <LoanAmortizationChartTwo 
          principlePaymentChartData={principlePaymentChartData}
        />
      </div>
    </section>
  )
}

export default AmortizationSummary
