'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Up/Down scroll zone while dragging element 
 */
var ScrollZone = function () {

  /**
   * options = {scrollSize: 3, zoneHeight: 30, element: null}
   * @param {Object} options
   */
  function ScrollZone(options) {
    var _this = this;

    _classCallCheck(this, ScrollZone);

    if (options.element) {
      this.element = options.element;
    } else {
      return null;
    }

    this.scrollSize = options.scrollSize ? options.scrollSize : 3;
    this.zoneHeight = options.zoneHeight ? options.zoneHeight : 30;

    this.intervalId = null;

    this.offsetTop = this.getOffset(this.element);
    this.element.addEventListener('onmousedown', function () {
      _this.element.addEventListener('onmousemove', _this.zoneHandler.bind(_this), true);
      document.addEventListener('onmouseup', _this.mouseUpHndler.bind(_this));
    }, true);
  }

  _createClass(ScrollZone, [{
    key: 'mouseUpHandler',
    value: function mouseUpHandler() {
      this.element.removeEventListener('onmousemove', this.zoneHandler.bind(this), true);
      document.removeEventListener('onmouseup', this.mouseUpHndler.bind(this));
      window.clearInterval(this.intervalId);
    }
  }, {
    key: 'zoneHandler',
    value: function zoneHandler(evt) {
      var _this2 = this;

      var intervalTime = 1000 / 60 / this.scrollSize; // 60 fps
      var topZone = evt.pageY < this.offsetTop + this.zoneHeight;
      var bottomZone = evt.pageY > this.element.offsetHeight + this.offsetTop - this.zoneHeight;

      if (!this.intervalId && topZone && this.element.scrollTop > this.scrollSize) {
        var scrollBy = -1 * this.scrollSize;
        this.intervalId = window.setInterval(function () {
          _this2.element.scrollBy(0, scrollBy);
        }, intervalTime);
      } else if (!this.intervalId && bottomZone && this.element.scrollHeight - this.element.scrollTop > this.element.offsetHeight) {
        var _scrollBy = this.scrollSize;
        this.intervalId = window.setInterval(function () {
          _this2.element.scrollBy(0, _scrollBy);
        }, intervalTime);
      } else if (this.intervalId && (!topZone || this.element.scrollTop <= this.scrollSize)) {
        window.clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }
  }, {
    key: 'getOffset',
    value: function getOffset(elm) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (elm) {
        offset += elm.offsetTop;
        return this.getOffset(elm.parentElement, offset);
      } else {
        return offset;
      }
    }
  }]);

  return ScrollZone;
}();