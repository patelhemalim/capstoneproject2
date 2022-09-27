const portfolioList = document.querySelector('#portfolio-list')
const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];

const headers = {
    'Content-Type': 'application/json'
}

const baseUrl = 'http://localhost:8080';



async function getPortfolioOverview() {
    portfolioList.innerHTML = ''

    await fetch(`${baseUrl}/api/v1/portfolios/get_by_user/${userId}`, {
        method: "GET",
        headers: headers
    }).then(response => response.json())
        .then(data => {
            let portfolioCard = `<div class="portfolio-card">`
            data.forEach(portfolio => {
                portfolioCard += `<table class="table2">
                                    <tr><th colspan="4">${portfolio.portfolioName}</th></tr>
                                    <tr>
                                        <td>Symbol</td>
                                        <td>Number of Stocks</td>
                                        <td>Purchased Price</td>
                                        <td>Purchase Date</td>
                                    </tr>`
                portfolio.stockDto.forEach(stock => {
                    portfolioCard += `<tr>
                                        <td>${stock.symbol}</td>
                                        <td>${stock.numberOfStocks}</td>
                                        <td>${stock.price}</td>
                                        <td>${new Date(stock.purchaseDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td>
                                      </tr>
                                `
                })
                portfolioCard += "</table>"
            })
            portfolioCard += `</div>`
            portfolioList.innerHTML += portfolioCard

        }).catch(err => console.error(err))

}
getPortfolioOverview()
