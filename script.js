const handleRates = ({ rates }) => {
    const ratesEntries = Object.entries(rates)
    ratesEntries.forEach(([currency, rates]) => {
        renderRates(currency, rates)
    });
}

const renderRates = (currency, rates) => {
    const ul = document.getElementById('currency-list');
    const btn = document.createElement('button');
    btn.classList.add('list-group-item');
    btn.classList.add('list-group-item-action');
    btn.value = currency;
    btn.id = currency;
    btn.type = 'button'
    btn.innerHTML = `<b>${currency}:</b> ${rates.toFixed(2)}`;
    ul.appendChild(btn)
    if (document.getElementById('currency-input').value.length > 0) {
        setTimeout(() => { buttonSelected(document.getElementById('currency-input').value) }, 300)
    }
}

const buttonSelected = (btn) => {
    const buttonId = document.getElementById(btn);
    buttonId.classList.add('active');
};

const renderBase = ({ base: currency, date: date }) => {
    const currencyTitle = document.querySelector('#base')
    currencyTitle.classList.add('sucess');
    currencyTitle.innerHTML = `Valores referentes a: <b class="strong"> 1 ${currency}, <br>
    ${date}</b >`
}

const setupHandlers = () => {
    const searchButton = document.querySelector('#search-button')
    searchButton.addEventListener('click', handlessearchEvent);
}

const options = async () => {
    const result = await fetch(`https://api.exchangerate.host/latest?base=`);
    const data = await result.json();
    let rates = data.rates;
    const ratesEntries = Object.entries(rates)
    ratesEntries.forEach(([currency, rates]) => {
        // /renderizar os elementos da tela
        const optAll = document.getElementById('moeda');
        const opt = document.createElement('option');
        opt.value = currency;
        optAll.appendChild(opt);
    });
}

const handlessearchEvent = () => {
    const currencyValue = document.getElementById('currency-input')
    clearList()
    fetchCurrency(currencyValue.value);
}

const clearList = () => {
    const ul = document.getElementById('currency-list');
    ul.innerHTML = ""
}


setupHandlers()
options()

document.getElementById('currency-input').addEventListener('focusout', () => { handlessearchEvent() })
document.body.addEventListener('click', (e) => {
    if (e.srcElement.localName == "button" && e.srcElement.id.length == 3) {
        clearList()
        fetchCurrency(e.srcElement.id);
        document.getElementById('currency-input').value = e.srcElement.id;
        scroll(0, 0)
    }
})