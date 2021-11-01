import React from 'react'

const AmortizationSchedule = ({  years, paymentData }) => {
  
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
            <th>Month</th>
            <th>Payment Amount</th>
            <th>Interest Paid</th>
            <th>Principle Paid</th>
            <th>Mortgage Balance</th>
          </tr>
        </thead>
        

        {paymentData?.map(month => {
          return (
            <tbody key={month.month}>
            <tr className='schedule-row'>
              <td>{month.month}</td>
              <td>${month.payment}</td>
              <td>${month.interestPaid}</td>
              <td>${month.principlePaid}</td>
              <td>${month.balance}</td>
            </tr>
          </tbody>
          )
        })}

      </table>
    </section>
  )
}

export default AmortizationSchedule
