const registerForm = document.getElementById('register');
const loginForm = document.getElementById('login');


const headers = {
    'Content-Type':'application/json'
}

//const baseUrl = 'http://localhost:8080/api/v1/users';
//

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







const handleRegister = async(e) => {

    let username = document.getElementById('username1');
    let password = document.getElementById('password1');
    let emailId = document.getElementById('emailId');

    e.preventDefault()

    let bodyObj = {
        username: username.value,
        password: password.value,
        emailId: emailId.value
    }

    const response = await fetch(`/api/v1/users/register`,{
        method:"POST",
        body:JSON.stringify(bodyObj),
        headers:headers
    })
    .catch(err => console.error(err.message))

    const responseArr = await response.json()

    if(response.status === 200){
        window.location.replace(responseArr[0])
    }
}
registerForm.addEventListener("submit",handleRegister);



const handleLogin = async(e) => {
    e.preventDefault()
    let username = document.getElementById('username');
    let password = document.getElementById('password');

    let bodyObj = {
        username:username.value,
        password:password.value,
    }
baseUrl
    const response = await fetch(`/api/v1/users/login`,{
        method:"POST",
        body:JSON.stringify(bodyObj),
        headers:headers
    })
    .catch(err => console.error(err.message))

    const responseArr = await response.json()

    if(response.status === 200){
        document.cookie = `userId=${responseArr[1]}`
        window.location.replace(responseArr[0])
    }
}
loginForm.addEventListener("submit",handleLogin);

