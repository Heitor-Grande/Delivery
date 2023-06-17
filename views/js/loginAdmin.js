//req
const xhr = new XMLHttpRequest()

//formLogin
const formLogin = document.querySelector("#formLogin")

formLogin.addEventListener("submit", function(evento){

    evento.preventDefault()

    xhr.open("POST", "/log", true)

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded") 

    xhr.onload = function(){
        if(xhr.response == "dados incorretos"){
            document.querySelector("#msg").textContent = "dados incorretos"
        }
        else{
            formLogin.submit()
        }
    }

    xhr.send(`login=${document.querySelector("#login").value}&senha=${document.querySelector("#senha").value}`)
})