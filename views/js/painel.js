const stats = document.querySelector(".status")

const finalizado = document.querySelectorAll(".finalizado")
const cancelado = document.querySelectorAll(".cancelado")
const saiu = document.querySelectorAll(".saiu")

const trocado = document.querySelectorAll(".trocado")
const pagamento = document.querySelectorAll(".pagamento")

for(let i = 0; i < pagamento.length; i = i + 1){
    if(pagamento[i].textContent != "dinheiro"){
        trocado[i].style.cssText = "display:none;"
    }
}


if(stats.value == "Processando"){
        for(let i = 0; i < finalizado.length; i = i + 1){
            finalizado[i].style.cssText = "display: none;"
        }
    }
else if(stats.value == "Saiu para entrega"){
        for(let i = 0; i < saiu.length; i = i + 1){
            saiu[i].style.cssText = "display: none;"
        }
    }
else if(stats.value == "Cancelado"){
        for(let i = 0; i < saiu.length; i = i + 1){
            cancelado[i].style.cssText = "display: none;"
            finalizado[i].style.cssText = "display: none;"
            saiu[i].style.cssText = "display: none;"
        }
    }
else if(stats.value == "Finalizado"){
        for(let i = 0; i < saiu.length; i = i + 1){
            cancelado[i].style.cssText = "display: none;"
            finalizado[i].style.cssText = "display: none;"
            saiu[i].style.cssText = "display: none;"
        }
}
