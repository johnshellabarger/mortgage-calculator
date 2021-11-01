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
              <td data-label='Month'>{month.month}</td>
              <td data-label='Payment Amount'>${Math.round(month.payment.toFixed(2))}</td>
              <td data-label='Interest Paid'>${Math.round(month.interestPaid.toFixed(2))}</td>
              <td data-label='Principle Paid'>${Math.round(month.principlePaid.toFixed(2))}</td>
              <td data-label='Mortgage Balance'>${Math.round(month.balance.toFixed(2))}</td>
            </tr>
          </tbody>
          )
        })}

      </table>
    </section>
  )
}

export default AmortizationSchedule
