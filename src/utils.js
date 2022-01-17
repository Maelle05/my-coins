export function setAlert(text, red, green) {
    const alertElement = document.querySelector("#alertBox")

    alertElement.classList.add('active')
    red ? alertElement.classList.add('red') : alertElement.classList.remove('red')
    green ? alertElement.classList.add('green') : alertElement.classList.remove('green')
    const textElement = alertElement.querySelector('p')
    textElement.innerHTML = text

    setTimeout(() => { alertElement.classList.remove('active') }, 2000)

}