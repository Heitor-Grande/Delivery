const entrar = document.querySelector("#entrar")

const xhr = new XMLHttpRequest()

entrar.addEventListener("submit", function(evento){

    evento.preventDefault()

    xhr.open("POST", "/Logar/conta", true)

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

    xhr.onload = function(){
            if(xhr.response == "Email ou senha incorretos"){
                document.querySelector("#msg").textContent = xhr.response
            }
            else{
                entrar.submit()
            }
    }

    xhr.send(
        `email=${document.querySelector("#email").value}&senha=${document.querySelector("#senha").value}`
    )
})