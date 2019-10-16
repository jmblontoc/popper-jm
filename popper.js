'use-strict';

class PopperJM {

    static getSelector() { return "popper-jm" }
    static getLoaderSelector() { return "loader-jm" }

    /**
     * 
     * @param {*} args 
     */
    static createPopper(args) {
        if (!PopperJM.hasPopper()) {
            PopperJM.generatePopper(args)
        } else {
            document.getElementById(PopperJM.getSelector()).remove()
            PopperJM.generatePopper(args)
        }
    }

    static createLoader(args) {
        if (!PopperJM.hasLoader()) {
            PopperJM.generateLoader(args)
        } else {
            document.getElementById(PopperJM.getSelector()).remove()
            PopperJM.generateLoader(args)
        }
    }

    static generatePopper(args) {
        let { color } = args
        let { message } = args
        let { body } = args
        let { duration } = args
        let { icon } = args
        let { position } = args

        let popper = new Popper(color, message, icon, position, 0)
        body.appendChild(popper.getDisplay())

        setTimeout(() => { PopperJM.hide() }, duration * 1000)
    }

    static generateLoader(args) {
        let { color } = args
        let { message } = args
        let { body } = args
        let { position } = args

        let icon = "fas fa-spinner fa-spin"
        let popper = new Popper(color, message, icon, position, 1)
        body.appendChild(popper.getDisplay())
    }

    static removePopper() {
        let popper = document.getElementById(PopperJM.getSelector())
        if (popper) {
            popper.remove()
        }
    }

    static removeLoader() {
        let loader = document.getElementById(PopperJM.getLoaderSelector())
        if (loader) {
            loader.remove()
        }
    }

    static hide() {
        document.getElementById(PopperJM.getSelector()).style.display = 'none'
    }

    static hasPopper() {
        let selector = PopperJM.getSelector()
        let popper = document.getElementById(selector)
        return popper != null
    }

    static hasLoader() {
        let selector = PopperJM.getLoaderSelector()
        let loader = document.getElementById(selector)
        return loader != null
    }
}

class Popper {

    /**
     * 
     * @param {string} color    Background color of the feedback box
     * @param {string} message  Message inside the feedback box
     * @param {string} faIcon   Font Awesome Icon "in string" to be displayed inside the box
     * @param {number} position Refer to PopperJM position variables for values
     * @param {number} isLoader	If popper is a loader
     */
    constructor(color, message, faIcon, position, isLoader) {
        this.color = color
        this.message = message
        this.faIcon = faIcon
        this.position = position
	this.isLoader = isLoader

        this.getDisplay = () => {
            let html = document.createElement("div")

	    !this.isLoader ? html.setAttribute("id", PopperJM.getSelector()): html.setAttribute("id", PopperJM.getLoaderSelector())

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
                margin: '2rem',
                padding: '1rem',
                color: 'white',
                'font-family': 'Sans-serif',
                'border-radius': '10px',
                'z-index': 9999,
                'opacity': 0.8
            }

            switch (this.position) {
                case PopperJM.BOTTOM_RIGHT:
                    styles.bottom = 0
                    styles.right = 0
                    break

                case PopperJM.BOTTOM_LEFT:
                    styles.bottom = 0
                    styles.left = 0
                    break

                case PopperJM.TOP_LEFT:
                    styles.top = 0
                    styles.left = 0
                    break

                case PopperJM.TOP_RIGHT:
                    styles.top = 0
                    styles.right = 0
                    break
            }

            let elementStyle = html.style
            for (let s in styles) {
                elementStyle[s] = styles[s]
            }
        }
    }
}

/**
 * Popper position variables
 */
PopperJM['TOP_LEFT'] = 1
PopperJM['TOP_RIGHT'] = 2
PopperJM['BOTTOM_LEFT'] = 3
PopperJM['BOTTOM_RIGHT'] = 0

module.exports = PopperJM