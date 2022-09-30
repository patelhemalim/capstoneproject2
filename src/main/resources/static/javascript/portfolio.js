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

//const baseUrl = 'http://localhost:8080';



var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

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

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
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





getPortfolioByUserId()

async function getPortfolioByUserId() {
    await fetch(`/api/v1/portfolios/get_by_user/${userId}`, {
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
    const response = await fetch(`/api/v1/stocks/add/${portfolioId.value}`, {
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

    await fetch(`/api/v1/portfolios/get_by_user/${userId}`, {
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
                                        <td>Quantity</td>
                                        <td>Last Price</td>
                                        <td>Purchase Date</td>
                                        <td>Action</td>
                                    </tr>`
                portfolio.stockDto.forEach(stock => {
                    portfolioCard += `<tr>
                                        <td>${stock.symbol}</td>
                                        <td>${stock.numberOfStocks}</td>
                                        <td>$${stock.price.toFixed(2)}</td>
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
    const response = await fetch(`/api/v1/stocks/delete_by_id/${stockId}`, {
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
