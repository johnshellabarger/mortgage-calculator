import React from 'react'
import { Line } from 'react-chartjs-2'


const LoanAmortizationChart = ( { loanAmortizationChartData } ) => {

  return (
    <div className='chart-container'>
       <h1 className='cal-subheader-two'>Loan Amortization Chart</h1>
      <Line 
        data={
          loanAmortizationChartData
        }
      />
    </div>
  )
}

export default LoanAmortizationChart
