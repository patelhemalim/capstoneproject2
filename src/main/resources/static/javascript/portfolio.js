const portfolioForm = document.getElementById('portfolio-container');
const portfolioContainer = document.getElementById('stock-form-container')
const portfolioDropdown = document.getElementById('portfolio');
const stockForm = document.getElementById('stock-form1');
const symbol = document.getElementById('symbol');
const stockNumber = document.getElementById('number-of-stocks');
const stockDate = document.getElementById('investment');
const stockPrice = document.getElementById('price');
const portfolioList = document.querySelector('#portfolio-list')


const headers = {
    'Content-Type': 'application/json'
}

const baseUrl = 'http://localhost:8080';

getPortfolioByUserId()

async function getPortfolioByUserId() {
    await fetch(`${baseUrl}/api/v1/portfolios/get_by_user/1`, {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
        .then(data => {
            portfolioDropdown.innerHTML = "<option value=''>Create New Portfolio</option>"
            data.forEach(portfolio => {
                console.log(portfolio)
                portfolioDropdown.innerHTML = portfolioDropdown.innerHTML +
                    '<option value="' + portfolio.id + '">' + portfolio.portfolioName + '</option>';
            })
        })
        .catch(err => console.error(err))
}

const handleSubmit = async (e) => {
    e.preventDefault();

    let bodyObj = {
        symbol: symbol.value,
        price: stockPrice.value,
        numberOfStocks: stockNumber.value,
        purchaseDate: stockDate.value
    }


    let portfolioId = document.getElementById('portfolio')
    const response = await fetch(`${baseUrl}/api/v1/stocks/add/${portfolioId.value}`, {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: headers
    })
        .catch(err => console.error(err.message))
    if (response.status == 200) {
        // return getStock(portfolioId);
    }
}

stockForm.addEventListener("submit", handleSubmit);
symbol.addEventListener("submit", handleSubmit);
stockPrice.addEventListener("submit", handleSubmit);
stockNumber.addEventListener("submit", handleSubmit);
stockDate.addEventListener("submit", handleSubmit);

//getStock(portfolioId);


// async function getPortfolios(userId) {
// await fetch(`${baseUrl}/api/v1/portfolios/get_by_user/1`,{
// method: "GET",
// headers: headers
// })
// .then(response => response.jason())
// //.then(data => createReportCards(data))
// .catch(err => console.error(err))
// }

getPortfolios();

async function getPortfolios() {
    portfolioList.innerHTML = ''

    await fetch(`${baseUrl}/api/v1/portfolios/get_by_user/1`, {
        method: "GET",
        headers: headers
    }).then(response => response.json())
    .then(data => {
        let portfolioCard ="<form class='portfolio-form' name='portfolioForm'>"
        data.forEach(portfolio => {
            portfolioCard += `<div class="portfolio-card">
                                        <p1>${portfolio.portfolioName}</p1>
                                        <button type="button" onclick="deletePortfolio (${portfolio.id})">Delete</button>
                                        <table class="table2">
                                        <tr>
                                        <th>Symbol</th>
                                        <th>Number of Stocks</th>
                                        <th>Purchased Price</th>
                                        <th>Purchase Date</th>
                                        <th>Action</th>
                                    </tr>`
            portfolio.stockDto.forEach(stock => {
                portfolioCard += `<tr>
                                        <td>${stock.symbol}</td>
                                        <td>${stock.numberOfStocks}</td>
                                        <td>${stock.price}</td>
                                        <td>${new Date(stock.purchaseDate).toLocaleDateString('en-US')}</td>
                                        <td><button type="button" onclick="deleteStockById(${stock.id})">Delete</button></td>
                                      </tr>
                                `
            })
            portfolioCard += "</table></div>"
            
        })
        portfolioCard += `</form>`
        portfolioList.innerHTML += portfolioCard
        
    }).catch(err => console.error(err))

}

async function deleteStockById(stockId) {
    const response = await fetch(`${baseUrl}/api/v1/stocks/delete_by_id/${stockId}`, {
        method: "DELETE",
        headers: headers
    }).catch(err => console.error(err))
    const responseArr = await response

    console.log("Stock has been removed successfully!")

    getPortfolios();
}

async function deletePortfolioById(portfolioId) {
 const response = await fetch(`${baseUrl}/api/v1/portfolios/delete_by_id/${portfolioId}`, {
 method: "DELETE",
         headers: headers
 }).catch(err => console.error(err))
 const responseArr = await response

     console.log("Portfolio has been deleted successfully!")

}
