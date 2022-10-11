const portfolioList = document.querySelector('#portfolio-list')
const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];

const headers = {
    'Content-Type': 'application/json'
}

const baseUrl = 'http://localhost:8080';



var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};






async function getPortfolioOverview() {
    portfolioList.innerHTML = ''

    await fetch(`/api/v1/portfolios/get_summary_by_user/${userId}`, {
        method: "GET",
        headers: headers
    }).then(response => response.json())
        .then(data => {
            let portfolioCard = `<div class="portfolio-card">`


            data.portfolioDtoList.forEach(portfolio => {
                portfolioCard += `<table  class="table2">
                                    <tr><th colspan="9">${portfolio.portfolioName}</th></tr>
                                    <tr>
                                        <td style="width:20%">Symbol</td>
                                        <td style="width:10%">Quantity</td>
                                        <td style="width:10%">Current Price</td>
                                        <td style="width:10%">Current Value</td>
                                        <td style="width:10%">Average Cost Basis</td>
                                        <td style="width:10%">Average Cost Basis Total</td>
                                        <td style="width:10%">$ Total Gain/Loss</td>
                                        <td style="width:10%">% Total Gain/Loss</td>
                                        <td style="width:10%">Purchase Date</td>
                                    </tr>`
                portfolio.stockDto.forEach(stock => {
                    portfolioCard += `<tr>
                                        <td class="displayName">${stock.symbol} <br>${stock.displayName}</td>
                                        <td>${stock.numberOfStocks}</td>
                                        <td>$${stock.currentPrice.toFixed(2)}</td>
                                        <td>$${stock.currentValue.toFixed(2)}</td>
                                        <td>$${stock.price}</td>
                                        <td>$${stock.avgCostBasisTotal.toFixed(2)}</td>`
                    if (stock.totalGainLoss > 0) {
                        portfolioCard += `<td><FONT COLOR="green">$${stock.totalGainLoss.toFixed(2)}</font></td>`
                    } else {
                        portfolioCard += `<td><FONT COLOR="red">$${stock.totalGainLoss.toFixed(2)}</font></td>`
                    }
                    if (stock.percentTotalGainLoss > 0) {
                        portfolioCard += `<td><FONT COLOR="green">${stock.percentTotalGainLoss.toFixed(2)}%</font></td>`
                    } else {
                        portfolioCard += `<td><FONT COLOR="red">${stock.percentTotalGainLoss.toFixed(2)}%</font></td>`
                    }
                    portfolioCard += `<td>${new Date(stock.purchaseDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td>
                                      </tr>`
                })
                portfolioCard += `<tr>
                                                        <td colspan="3">Total</td>
                                                        <td>$ ${portfolio.currentValue.toFixed(2)}</td>
                                                        <td></td>
                                                        <td>$${portfolio.avgCostBasisTotal.toFixed(2)}</td>`
                if (portfolio.totalGainLoss > 0) {
                    portfolioCard += `<td><FONT COLOR="green">$${portfolio.totalGainLoss.toFixed(2)}</font></td>`
                } else {
                    portfolioCard += `<td><FONT COLOR="red">$${portfolio.totalGainLoss.toFixed(2)}</font></td>`
                }
                if (portfolio.totalPercentGainLoss > 0) {
                    portfolioCard += `<td><FONT COLOR="green">${portfolio.totalPercentGainLoss.toFixed(2)}%</font></td>`
                } else {
                    portfolioCard += `<td><FONT COLOR="red">${portfolio.totalPercentGainLoss.toFixed(2)}%</font></td>`
                }
                portfolioCard += ` <td></td>
                                                      </tr>`
                portfolioCard += `</table></div>`
            })
            portfolioCard += `<div><table class="table2">
                                                    <tr>
                                                    <td style="width:32.2%">Grand Total</td>
                                                    <td style="width:10%">$${data.currentValue.toFixed(2)}</td>
                                                    <td style="width:10%"></td>
                                                    <td style="width:10%">$${data.avgCostBasisTotal.toFixed(2)}</td>`
            if (data.totalGainLoss > 0) {
                portfolioCard += `<td style="width:10%"><FONT COLOR="green">$${data.totalGainLoss.toFixed(2)}</font></td>`
            } else {
                portfolioCard += `<td style="width:10%"><FONT COLOR="red">$${data.totalGainLoss.toFixed(2)}</font></td>`
            }
            if (data.percentTotalGainLoss > 0) {
                portfolioCard += `<td style="width:10%"><FONT COLOR="green">${data.percentTotalGainLoss.toFixed(2)}%</font></td>`
            } else {
                portfolioCard += `<td style="width:10%"><FONT COLOR="red">${data.percentTotalGainLoss.toFixed(2)}%</font></td>`
            }
            portfolioCard += `<td style="width:10%"></td>
            </tr></table>`
            portfolioCard += `</div>`
            portfolioList.innerHTML += portfolioCard

        }).catch(err => console.error(err))

}
getPortfolioOverview()

