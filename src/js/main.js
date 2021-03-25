// Service Worker
    if('serviceWorker' in navigator) {
        window.addEventListener('load', ()=>{
            navigator.serviceWorker.register('./sw.js')
                .then(()=> {
                    return
                })
                .catch((err)=>{
                    console.log('Error at register Service Worker: ', err)
                })
        })
    } else {
        console.log('Service Worker unavailable in navigator.')
    }

function requestNotification() {
    if(('Notification' in window) && (Notification.permission === 'default')) {
        const div = document.querySelector("#requestNotification")
        div.style.height = '15vh'
        const request = (e) => {
            Notification.requestPermission()
            div.style.height = '0vh'
        }
        const btnRequest = document.createElement('h3')
        btnRequest.textContent = "Click to allow remainders! Don't forget your tasks!"
        btnRequest.addEventListener('click',request,false)
        div.appendChild(btnRequest)

        const close = () => {
            div.style.height = '0vh'
        }
        const btnClose = document.createElement('span')
        btnClose.textContent = "x"
        btnClose.addEventListener('click', close, false)
        div.appendChild(btnClose)
    }
}


window.onload = () => {
    navSlide()
    initForming()
    requestNotification()
}