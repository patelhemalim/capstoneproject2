const portfolioList = document.querySelector('#portfolio-list')
const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];

const headers = {
    'Content-Type': 'application/json'
}

const baseUrl = 'http://localhost:8080';



async function getPortfolioOverview() {
    portfolioList.innerHTML = ''

    await fetch(`${baseUrl}/api/v1/portfolios/get_summary_by_user/${userId}`, {
        method: "GET",
        headers: headers
    }).then(response => response.json())
        .then(data => {
            let portfolioCard = `<div class="portfolio-card">`
            data.portfolioDtoList.forEach(portfolio => {
                portfolioCard += `<table class="table2">
                                    <tr><th colspan="4">${portfolio.portfolioName}</th></tr>
                                    <tr>
                                        <td>Symbol</td>
                                        <td>Quantity</td>
                                        <td>Last Price</td>
                                        <td>Current Value</td>
                                        <td>Average Cost Basis</td>
                                        <td>Average Cost Basis Total</td>
                                        <td>Total Gain/Loss</td>
                                        <td>% Total Gain/Loss</td>
                                        <td>Purchase Date</td>
                                    </tr>`
                portfolio.stockDto.forEach(stock => {
                    portfolioCard += `<tr>
                                        <td>${stock.symbol} <br>${stock.displayName}</td>
                                        <td>${stock.numberOfStocks}</td>
                                        <td>${stock.currentPrice}</td>
                                        <td>${stock.currentValue.toFixed(2)}</td>
                                        <td>${stock.price}</td>
                                        <td>${stock.avgCostBasisTotal.toFixed(2)}</td>
                                        <td>${stock.totalGainLoss.toFixed(2)}</td>
                                        <td>${stock.percentTotalGainLoss.toFixed(2)}</td>
                                        <td>${new Date(stock.purchaseDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td>
                                      </tr>
                                `
                })
                 portfolioCard += `<tr>
                                                        <td></td>
                                                        <td</td>
                                                        <td></td>
                                                        <td>${portfolio.currentValue.toFixed(2)}</td>
                                                        <td></td>
                                                        <td>${portfolio.avgCostBasisTotal.toFixed(2)}</td>
                                                        <td>${portfolio.totalGainLoss.toFixed(2)}</td>
                                                        <td>${portfolio.totalPercentGainLoss.toFixed(2)}</td>
                                                        <td></td>
                                                      </tr>`
                portfolioCard += "</table>"
            })
             portfolioCard += `<table class="table2">
                                                <tr>
                                                    <td></td>
                                                    <td</td>
                                                    <td></td>
                                                    <td>${data.currentValue.toFixed(2)}</td>
                                                    <td></td>
                                                    <td>${data.avgCostBasisTotal.toFixed(2)}</td>
                                                    <td>${data.totalGainLoss.toFixed(2)}</td>
                                                    <td>${data.percentTotalGainLoss.toFixed(2)}</td>
                                                    <td></td>
                                                  </tr></table>`
            portfolioCard += `</div>`
            portfolioList.innerHTML += portfolioCard

        }).catch(err => console.error(err))

}
getPortfolioOverview()
