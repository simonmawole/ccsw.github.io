'use strict'

//Get elements
let buttonConvert = document.getElementById('convert');
let fromCurrency = document.getElementById('from_currency');
let toCurrency = document.getElementById('to_currency');
let result = document.getElementById('result');
let amount = document.getElementById('amount');

const currencyconverterapi = 'https://free.currencyconverterapi.com/api/v5/convert'

buttonConvert.addEventListener('click', event => {
    event.preventDefault();
    const from = fromCurrency.value;
    const to = toCurrency.value;
    fetch(`${currencyconverterapi}?q=${from}_${to}&compact=ultra`)
    .then(response => {
        return response.json();
    }).then(data => {
        try{
        const keyName = `${from}_${to}`;
        const { [keyName]: rate } = data;
        result.innerText = rate * amount.value;
        } catch(err) {
            console.log(err);
        }
    }).catch(error => {
        console.log(error);
    });
})

