/**
 * Game main class
 *
 * @class
 * @author Bastien Nicoud
 */
export class Game {

  /**
   * @param {Element} el
   */
  constructor ({element, assetsBasePath, console}) {
    this.el = element
    this.assetsPath = assetsBasePath
    this.shapes = []
    this.console = console

    // Create the SVG
    this.console.info('Mounting SVG')
    this.mountSVG()
    this.console.info('SVG mounted')
  }

  async executeGameCommand (command) {
    command = JSON.parse(command)
    this.console.log(`Command to execute : ${command.action}`)
    // Test the command to execute
    switch (command.action) {
      case 'moveX':
        this.moveX(command.params)
        this.console.log(`moveX executed : ${command.params} px`)
        break
      case 'moveY':
        this.moveY(command.params)
        this.console.log(`moveY executed : ${command.params} px`)
        break
      case 'moveXY':
        this.moveXY(command.params[0], command.params[1])
        this.console.log(`moveXY executed : ${command.params[0]} px, ${command.params[0]} px`)
        break
      case 'resetCirclePosition':
        this.resetCirclePosition()
        this.console.log(`circle position rested`)
        break
      case 'waitUntilKeyPressed':
        this.console.log(`wait next key pressed`)
        let tutu = await this.waitUntilKeyPressed()
        this.console.info(`key pressed : ${tutu.keyCode}`)
        return tutu.keyCode
      default:
        this.console.log('This command not exist.')
    }
    return true
  }

  /**
   * Create the svg
   */
  mountSVG () {
    this.svg = this.createSVG()
    this.circle = this.createCircle()
    this.el.appendChild(this.svg)
    this.svg.appendChild(this.circle)
  }

  /**
   * Create SVG
   */
  createSVG () {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('width', this.el.offsetWidth)
    svg.setAttribute('height', this.el.offsetHeight)
    svg.style = 'background-color: #ff7979;'
    return svg
  }

  /**
   * Create the circle in the svg
   */
  createCircle () {
    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    this.x = this.el.offsetWidth/2
    this.y = this.el.offsetHeight/2
    circle.setAttribute('r', 50)
    circle.setAttribute('cx', this.x)
    circle.setAttribute('cy', this.y)
    circle.style = 'background-color: #4834d4;'
    return circle
  }

  /**
   * Move the circle on X axis
   */
  moveX (x) {
    this.circle.setAttribute('cx', this.x += x)
  }

  /**
   * Move the circle on Y axis
   */
  moveY (y) {
    this.circle.setAttribute('cy', this.y += y)
  }

  /**
   * Move the circle on XY axis
   */
  moveXY (x, y) {
    this.moveX(x)
    this.moveY(y)
  }

  /**
   * Place the circle at original position
   */
  resetCirclePosition () {
    this.x = this.el.offsetWidth/2
    this.y = this.el.offsetHeight/2
    this.circle.setAttribute('cx', this.x)
    this.circle.setAttribute('cy', this.y)
  }

  /**
   * Method used to wait key pressed in the svg
   * @returns {Event}
   */
  waitUntilKeyPressed () {
    return new Promise(resolve => {
      document.addEventListener('keyup', resolve, {once:true});
    })
  }

}
