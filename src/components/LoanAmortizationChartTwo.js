import React from 'react'
import { Line } from 'react-chartjs-2'


const LoanAmortizationChartTwo = ( { principlePaymentChartData } ) => {

  return (
    <div className='chart-container'>
      <h1 className='cal-subheader-two'>Principle Payment Chart</h1>
      <Line 
        data={
          principlePaymentChartData
        }
      />
    </div>
  )
}

export default LoanAmortizationChartTwo