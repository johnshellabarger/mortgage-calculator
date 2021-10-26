import React from 'react'


const AmortizationCalculator = ({ handleForm }) => {
  return (
    <section className='cal-card'>
      <header>
        <h1 className='cal-header'>Amortization Calculator</h1>
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
              <input type='text'/>
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
              <input type='text'/>
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
              <input type='text'/>
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
              <input type='text'/>
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
