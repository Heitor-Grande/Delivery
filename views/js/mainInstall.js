let deferredPrompt // vou guarar o evento de install nessa variavel

window.addEventListener('beforeinstallprompt', (evento) => {
    
    evento.preventDefault()

    deferredPrompt = evento
})

const btnInstall = document.querySelector("#setup_button")
btnInstall.addEventListener("click", function(evento){
    //mostra o prompt para instalar o app
    deferredPrompt.prompt()

    // Espera o usuario responder ao prompt
    deferredPrompt.userChoice
        .then((respostaPrompt) => {
            if (respostaPrompt.outcome === 'accepted') {
                console.log('Aceitou instalar')
                // hide our user interface that shows our A2HS button
                setupButton.style.display = 'none'
            } else {
                console.log('PWA rejeitado')
            }
            deferredPrompt = null
        })
})