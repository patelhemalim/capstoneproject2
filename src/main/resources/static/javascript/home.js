const registerForm = document.getElementById('register');
const loginForm = document.getElementById('login');


const headers = {
    'Content-Type':'application/json'
}

const baseUrl = 'http://localhost:8080/api/v1/users';



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

    const response = await fetch(`${baseUrl}/register`,{
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
    const response = await fetch(`${baseUrl}/login`,{
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

