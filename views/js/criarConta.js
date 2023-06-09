//form
const formCont = document.querySelector("#formCont")

//xhr
const xhr = new XMLHttpRequest()

formCont.addEventListener("submit", function(evento){
    evento.preventDefault()

    const nome = document.querySelector("#nome")
    const email = document.querySelector("#email")
    const senha = document.querySelector("#senha")
    const senhaConfirmar = document.querySelector("#senhaConfirmar")

    if(nome.value.length < 3){
        alert("Nome muito curto.")
    }
    else if(email.value.length < 7){
        alert("Email Invalido")
    }
    else if(senha.value.length < 6){
        alert("Senha muito curta")
    }
    else if(senha.value != senhaConfirmar.value){
        alert("As senhas não são iguais.")
    }
    else{

        xhr.open("POST", "/Insert/User", true)

        xhr.setRequestHeader("Content-type" , "application/x-www-form-urlencoded")

            xhr.onload = function(){
                    if(xhr.response == "Email já cadastrado."){
                            alert("Email já cadastrado")
                    }
                    else{
                            formCont.submit()
                    }
                    
            }

        xhr.send(
            `nome=${document.querySelector("#nome").value}&
            email=${document.querySelector("#email").value}&
            telefone=${document.querySelector("#telefone").value}&
            senha=${document.querySelector("#senha").value}&
            senhaConfirmar=${document.querySelector("#senhaConfirmar").value}&`
        )

    }

})