import React from 'react'
import { Line } from 'react-chartjs-2'


const LoanAmortizationChartTwo = ( { chartData } ) => {

  return (
    <div>
      <h1 className='cal-subheader'>Principle Payment Chart</h1>
      <Line 
        data={
          chartData
        }
      />
    </div>
  )
}

export default LoanAmortizationChartTwo