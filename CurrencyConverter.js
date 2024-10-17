
import { useState } from 'react'
import ExchangeRate from './ExchangeRate'
import axios from 'axios'


function CurrencyConverter() {

    const currencies = [ 'BTC','ETH','USD', 'XRP','LTC', 'ADA' ]
    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('BTC')
    const [amount, setAmount] = useState(1)
    const [exchangeRate, setExchangeRate] = useState(0)
    const [primaryCurrencyExchanged, setPrimaryCurrencyExchanged] = useState('BTC')
    const [secondaryCurrencyExchanged, setSecondaryCurrencyExchanged] = useState('BTC')

    const [result, setResult] = useState(0)

    
    console.log(amount)
    
    const convert = async () => {
        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {
              from_currency: chosenPrimaryCurrency,
              function: 'CURRENCY_EXCHANGE_RATE',
              to_currency: chosenSecondaryCurrency
            },
            headers: {
              'x-rapidapi-key': '959e098acamshb3e7320400a3994p1c5786jsnf2a5c5998b93',
              'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options)
              console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
              setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
              setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
              setPrimaryCurrencyExchanged(chosenPrimaryCurrency)
              setSecondaryCurrencyExchanged(chosenSecondaryCurrency)

          } catch (error) {
              console.error(error)
          }

    }

    console.log(exchangeRate)

    return (
      <div className = "currency-converter">
        <h2>Currency Converter</h2>

        <div>

        <table>
            <tbody>

                {/* table row 1 */}
                <tr>
                    <td>Primary Currency:</td>
                    <td>
                        <input
                            type = "number"
                            name = "currency-amount-1"
                            value = {amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </td>
                    <td>
                        <select
                            value = {chosenPrimaryCurrency}
                            name = "currency-option-1"
                            className = "currency-options"

                            onChange={(event) => setChosenPrimaryCurrency(event.target.value)}
                        >
                            {currencies.map((currency, _index) => (<option key = {_index}>{currency}</option>))}

                        </select>
                    </td>
                </tr>

                {/* table row 2 */}

                <tr>
                    <td>Secondary Currency:</td>
                    <td>
                        <input
                            type = "number"
                            name = "currency-amount-2"
                            value = {result}
                            disabled = {true}
                        />
                    </td>
                    <td>
                        <select
                            value = {chosenSecondaryCurrency}
                            name = "currency-option-2"
                            className = "currency-options"

                            onChange={(event) => setChosenSecondaryCurrency(event.target.value)}
                        >
                            {currencies.map((currency, _index) => (<option key = {_index}>{currency}</option>))}

                        </select>
                    </td>
                </tr>

            </tbody>
        </table>

        <button id = "convert-button" onClick={convert}>Convert</button>


        </div>
    
    
        <ExchangeRate
            exchangeRate = {exchangeRate}
            chosenPrimaryCurrency = {primaryCurrencyExchanged}
            chosenSecondaryCurrency = {secondaryCurrencyExchanged}
            
        />

        
      </div>
    )
  }

export default CurrencyConverter