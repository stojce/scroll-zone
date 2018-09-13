/**
 * Up/Down scroll zone while dragging element 
 */
class ScrollZone {

  /**
   * options = {scrollSize: 3, zoneHeight: 30, element: null}
   * @param {Object} options
   */
  constructor(options) {

/*

  scrollSize = 3;
  zoneHeight = 30;
  element: Element;

  offsetTop = 0;
  intervalId = null;

*/
    if (options.element) {
      this.element = options.element;
    } else {
      return null;
    }

      this.scrollSize = options.scrollSize ? options.scrollSize : 3;
      this.zoneHeight = options.zoneHeight ? options.zoneHeight : 30;

  this.intervalId = null;

    this.offsetTop = this.getOffset(this.element);
    this.element.addEventListener('onmousedown', () => {
      this.element.addEventListener('onmousemove', this.zoneHandler.bind(this), true);
      document.addEventListener('onmouseup', this.mouseUpHndler.bind(this));
    }, true);
  }

  mouseUpHandler() {
    this.element.removeEventListener('onmousemove', this.zoneHandler.bind(this), true);
    document.removeEventListener('onmouseup', this.mouseUpHndler.bind(this));
    window.clearInterval(this.intervalId);
  }

  zoneHandler (evt) {
    const intervalTime = 1000 / 60 / this.scrollSize; // 60 fps
    const topZone = evt.pageY < this.offsetTop + this.zoneHeight;
    const bottomZone = evt.pageY > this.element.offsetHeight + this.offsetTop - this.zoneHeight;

    console.log(evt.pageY, topZone, bottomZone);

    if (!this.intervalId && topZone && this.element.scrollTop > this.scrollSize) {
      const scrollBy = -1 * this.scrollSize;
      console.log('scrollBy', scrollBy);
      this.intervalId = window.setInterval(() => { this.element.scrollBy(0, scrollBy); }, intervalTime);
    } else if (!this.intervalId && bottomZone && this.element.scrollHeight - this.element.scrollTop > this.element.offsetHeight) {
      const scrollBy = this.scrollSize;
      console.log('scrollBy', scrollBy);
      this.intervalId = window.setInterval(() => { this.element.scrollBy(0, scrollBy); }, intervalTime);
    } else if (this.intervalId && (!topZone || this.element.scrollTop <= this.scrollSize)) {
      console.log('clear');
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  };

  getOffset  (elm, offset = 0) {
    if (elm) {
      offset += elm.offsetTop;
      return this.getOffset(elm.parentElement, offset);
    } else {
      return offset;
    }
  };

}
