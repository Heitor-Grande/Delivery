//registrar sw
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful');
        const setup_button = document.querySelector("#setup_button")
        setup_button.style.cssText = "display:block;"
      }, function(err) {
        // Registration failed
        console.log('ServiceWorker registration failed: ', err);
      })
    })
}