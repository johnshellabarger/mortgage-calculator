import React from 'react'
import { Line } from 'react-chartjs-2'


const LoanAmortizationChart = ( {years} ) => {

  let labelYears = []


  for(let i = 0; i <= years; i++){
    labelYears.push(i)
  }

  const chartData = {
    labels: labelYears,
    datasets:[
      {
        label:'Principle',
        data:[
          617594,
          181045,
          153060,
          806519,
          105162,
          200000
        ]
      }
    ]
  }


  return (
    <div>
      <Line 
        data={
          chartData
        }
      />
    </div>
  )
}

export default LoanAmortizationChart
