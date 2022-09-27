const portfolioForm = document.getElementById('portfolio-container');
const portfolioContainer = document.getElementById('stock-form-container')
const portfolioDropdown = document.getElementById('portfolio');
const stockForm = document.getElementById('stock-form1');
const symbol = document.getElementById('symbol');
const stockNumber = document.getElementById('number-of-stocks');
const stockDate = document.getElementById('investment');
const stockPrice = document.getElementById('price');
const portfolioList = document.querySelector('#portfolio-list')
const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];

const headers = {
    'Content-Type': 'application/json'
}

const baseUrl = 'http://localhost:8080';

getPortfolioByUserId()

async function getPortfolioByUserId() {
    await fetch(`${baseUrl}/api/v1/portfolios/get_by_user/${userId}`, {
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
        getPortfolios();
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

    await fetch(`${baseUrl}/api/v1/portfolios/get_by_user/${userId}`, {
        method: "GET",
        headers: headers
    }).then(response => response.json())
        .then(data => {
             let portfolioCard = `<div class="portfolio-card">`
            data.forEach(portfolio => {
                portfolioCard += `<table class="table2">
                                        <TR>
        <th colspan="4">${portfolio.portfolioName}</th>
        <th><button type="button" onclick="deletePortfolioById(${portfolio.id})">Delete</button></th>
                                       </TR>
                                        <tr>
                                        <td>Symbol</td>
                                        <td>Number of Stocks</td>
                                        <td>Purchased Price</td>
                                        <td>Purchase Date</td>
                                        <td>Action</td>
                                    </tr>`
                portfolio.stockDto.forEach(stock => {
                    portfolioCard += `<tr>
                                        <td>${stock.symbol}</td>
                                        <td>${stock.numberOfStocks}</td>
                                        <td>${stock.price}</td>
                                        <td>${new Date(stock.purchaseDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td>
                                        <td><button type="button" onclick="deleteStockById(${stock.id})">Delete<i class="fa fa-trash-o"></i></button></td>
                                      </tr>
                                `
                })
                portfolioCard += "</table>"
            })
            portfolioCard += `</div>`
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
    getPortfolios();
}
