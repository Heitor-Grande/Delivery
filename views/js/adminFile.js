const btnCad = document.querySelector("#btnCad")

const nome = document.querySelector("#nome")
const senhaConfirmar = document.querySelector("#senhaConfirmar")

btnCad.addEventListener("click", function(evento){
    if(nome.value.length < 5 || senhaConfirmar.value.length < 5){
        evento.preventDefault()
        alert("Senha ou Login curtos demais.")
    }
})