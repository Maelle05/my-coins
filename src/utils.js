let alertElement = document.querySelector("#alertBox")

export function setAlert(text, red, green) {
    if (alertElement === null) {
        alertElement = document.querySelector("#alertBox")
    }
    alertElement.classList.add('active')
    red ? alertElement.classList.add('red') : null
    green ? alertElement.classList.add('green') : null
    const textElement = alertElement.querySelector('p')
    textElement.innerHTML = text

    setTimeout(() => { alertElement.classList.remove('active') }, 2000)
}