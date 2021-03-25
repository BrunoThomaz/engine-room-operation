//navbar animation
const navSlide = () => {
    const burger = document.querySelector('.burger')
    const nav = document.querySelector('.links')
    const links = document.querySelectorAll('.links li')

    burger.addEventListener('click', () => {
        //toggle nav
        nav.classList.toggle('nav-active')
        links.forEach((link, index) => {
            //animation fade in
            if (link.style.animation) {
                link.style.animation = ''
            } else {
                link.style.animation = `navFade 0.5s ease forwards ${index / 5 + .5}s`
            }
        })

        burger.classList.toggle('toggle')

    })
}

//progressBar Function
function progressBar() {
        const bar = document.querySelector("#bar")
        const total = document.querySelectorAll('form>div>input')
        const visibles = []
        const filled = []
        total.forEach((item) => {
            item.addEventListener('change', progressBar)
            if(item.style.display != 'none' && item.parentElement.style.display != 'none') {
                visibles.push(item)
            }
            if(item.value) {
                filled.push(item)
            }
        })
        bar.style.width = `${(filled.length/visibles.length)*100}%`
    }