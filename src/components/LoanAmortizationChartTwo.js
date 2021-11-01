import React from 'react'
import { Line } from 'react-chartjs-2'


const LoanAmortizationChartTwo = ( { principlePaymentChartData } ) => {

  return (
    <div>
      <h1 className='cal-subheader'>Principle Payment Chart</h1>
      <Line 
        data={
          principlePaymentChartData
        }
      />
    </div>
  )
}

export default LoanAmortizationChartTwo