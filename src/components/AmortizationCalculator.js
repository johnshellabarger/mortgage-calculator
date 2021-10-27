import React from 'react'


const AmortizationCalculator = ({ handleForm, handleFormInput }) => {
  return (
    <section className='cal-card'>
      <header>
        <h2 className='cal-header'>Amortization Calculator</h2>
      </header>
      <form onSubmit={(e) => handleForm(e)}>
        <div className='form-list'>
          <label>
            <span>
              <b>1</b>
            </span>
            <div className='cal-input'>Loan Amount</div>
          </label>
          <div className='text-input'>
            <div>
              <input 
                type='text'
                name='loanAmount'
                placeholder='0.00'
                onChange={handleFormInput}
              />
            </div>
          </div>
        </div>

        <div className='form-list'>
          <label>
            <span>
              <b>2</b>
            </span>
            <div className='cal-input'>Interest Rate</div>
          </label>
          <div className='text-input'>
            <div>
              <input
                type='text'
                name='interestRate'
                placeholder='0.00'
                onChange={handleFormInput}
              />
            </div>
          </div>
        </div>

        <div className='form-list'>
          <label>
            <span>
              <b>3</b>
            </span>
            <div className='cal-input'>Down Payment</div>
          </label>
          <div className='text-input'>
            <div>
              <input 
                type='text'
                name='downPayment'
                placeholder='0.00'
                onChange={handleFormInput}
              />
            </div>
          </div>
        </div>

        <div className='form-list'>
          <label>
            <span>
              <b>4</b>
            </span>
            <div className='cal-input'>Number of Years</div>
          </label>
          <div className='text-input'>
            <div>
              <input
                type='text'
                name='years'
                placeholder='0'
                onChange={handleFormInput}
              />
            </div>
          </div>
        </div>

        <div className='cal-button-container'>
          <button type='submit'>Calculate</button>
        </div>

      </form>
    </section>
  )
}

export default AmortizationCalculator
