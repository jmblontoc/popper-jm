'use-strict';

class PopperJM {

    static getSelector() { return "popper-jm" }

    static createPopper(args) {

        let { color } = args
        let { message } = args
        let { body } = args
        let { duration } = args
        let { icon } = args

        let popper = new Popper(color, message, icon)
        body.appendChild(popper.getDisplay())

        setTimeout(() => { PopperJM.hide() }, duration * 1000)
    }

    static hide() {
        document.getElementById(PopperJM.getSelector()).style.display = 'none'
    }
}

class Popper {

    constructor(color, message, faIcon) {
        this.color = color
        this.message = message
        this.faIcon = faIcon

        this.getDisplay = () => {
            let html = document.createElement("div")
            html.setAttribute("id", PopperJM.getSelector())

            let messageHolder = document.createElement("span")
            let messageNode = document.createTextNode(this.message)

            let icon = document.createElement("span")
            icon.className += ` ${this.faIcon}`
            icon.style.marginRight = '1rem'

            messageHolder.appendChild(messageNode)
            html.appendChild(icon)
            html.appendChild(messageHolder)
            html.style.background = this.color

            this.beautify(html)

            return html
        }

        this.beautify = (html) => {
            let styles = {
                background: this.color,
                position: 'fixed',
                bottom: 0,
                right: 0,
                margin: '2rem',
                padding: '1rem',
                color: 'white',
                'font-family': 'Sans-serif',
                'border-radius': '10px',
                'z-index': 99,
                'opacity': 0.8
            }

            let elementStyle = html.style
            for (let s in styles) {
                elementStyle[s] = styles[s]
            }
        }
    }
}

module.exports = PopperJM