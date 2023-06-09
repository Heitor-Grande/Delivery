const troco = document.querySelector("#troco")
const campoTroco = document.querySelector("#campoTroco")
const pagamento = document.querySelector("#pagamento")

setInterval(function(){
    if(pagamento.value == "dinheiro"){
        troco.style.cssText = 
        "display: block;"
        campoTroco.style.cssText = 
        "display: block;" + 
        "margin-left: auto;" +
        "margin-right: auto;"
    }
    else{
        troco.style.cssText = 
        "display: none;"
        campoTroco.style.cssText = 
        "display: none;"
    }
}, 1000)