import React from 'react'

const AmortizationSchedule = ({ monthlyPayment, years }) => {
  
  
  let yearsArray = []


  for(let i = 0; i <= (years * 12); i++){
    yearsArray.push(i)
  }

  return (
    <section className='cal-card schedule'>
      <header>
            <h2 className='cal-header'>Your Full Amortization Schedule</h2>
      </header>
    
      <table className='cal-table'>
        <thead>
          <tr>
            <th>Month/Year</th>
            <th>Payment Amount</th>
            <th>Interest Paid</th>
            <th>Principle Paid</th>
            <th>Mortgage Balance</th>
          </tr>
        </thead>

        {yearsArray.map(year => {
          return (
            <tbody>
            <tr className='schedule-row'>
              <td>1</td>
              <td>{monthlyPayment}</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
          </tbody>
          )
        })}

      </table>
    </section>
  )
}

export default AmortizationSchedule
