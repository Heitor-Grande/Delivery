const xhr = new XMLHttpRequest()

const formRec = document.querySelector("#formRec")

formRec.addEventListener("submit", function(evento){

    let emailRec = document.querySelector("#emailRec").value

    evento.preventDefault()

    xhr.open("POST", "/envio/rec/senha", true)

    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded")

    xhr.onload = function(){
        if(xhr.response == `Email com a senha de recuperação enviado para: ${emailRec}.`){
            document.querySelector("#msg").textContent = `Email com a senha de recuperação enviado para: ${emailRec}.`
        }
        else if(xhr.response == "Email não encontrado em nosso sistema."){
            document.querySelector("#msg").textContent = `Email não encontrado em nosso sistema.`
        }
    }

    xhr.send(`emailRec=${emailRec}`)

})