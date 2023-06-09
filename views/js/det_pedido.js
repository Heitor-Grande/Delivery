const statusPedido = document.querySelector("#statusPedido")
const finalizar = document.querySelector("#finalizar")
const delet = document.querySelector("#delete")

const detalhes = document.querySelector("#detalhes")

if(statusPedido.value == "Processando"){
    finalizar.style.cssText = "display: none;"
    delet.style.cssText = "display: none;"
}
else if(statusPedido.value == "Em aberto"){
    detalhes.style.cssText = "display: none;"
}


