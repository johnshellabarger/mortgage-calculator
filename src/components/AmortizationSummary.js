import React from 'react'
import LoanAmortizationChart from './LoanAmortizationChart'
import LoanAmortizationChartTwo from './LoanAmortizationChartTwo'

const AmortizationSummary = ({ monthlyPayment, numberOfPayments, totalPayments, loanAmount, years, chartData, chartDataTwo}) => {
  return (
    <section className='cal-card'>
      <div>
        <h2 className='cal-header'>Your Amortization Summary</h2>
        <h3 className='cal-subheader'>Base Calculations</h3>
        <table className='cal-table'>
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
              <td>${monthlyPayment}</td>
              <td>{numberOfPayments}</td>
              <td>${totalPayments}</td>
              <td className='loan-amount-data'>${loanAmount}</td>
            </tr>
          </tbody>
        </table>

        <h3 className='cal-subheader'>Additional amortization information</h3>

        <LoanAmortizationChart
            years={years}
            chartData={chartData}
          />

        <LoanAmortizationChartTwo 
          chartData={chartDataTwo}
        />
      </div>
    </section>
  )
}

export default AmortizationSummary
