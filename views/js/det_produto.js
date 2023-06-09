//btn quantidade
const mais = document.querySelector("#mais")
const menos = document.querySelector("#menos")
const quantidade = document.querySelector("#quantidade")
const precoUnidade = document.querySelector("#precoUnidade").value
const precoProduto = document.querySelector(".precoProduto")

mais.addEventListener("click", function(){
    quantidade.value = parseInt(quantidade.value) + 1

    precoProduto.textContent = "R$" + (parseInt(quantidade.value) * parseFloat(precoUnidade))


})

menos.addEventListener("click", function(){
    if(quantidade.value == 1){
        quantidade.value = 1
        precoProduto.textContent = "R$" + (parseInt(quantidade.value) * parseFloat(precoUnidade))
    }
    else{
        quantidade.value = parseInt(quantidade.value) - 1
        precoProduto.textContent = "R$" + (parseInt(quantidade.value) * parseFloat(precoUnidade))
    }
})