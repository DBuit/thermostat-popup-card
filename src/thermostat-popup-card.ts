import { LitElement, html, css, svg } from 'lit-element';
import { closePopUp } from 'card-tools/src/popup';
import { computeStateDisplay } from 'custom-card-helpers';

class ThermostatPopupCard extends LitElement {
  config: any;
  hass: any;
  shadowRoot: any;
  _setTemp: any;

  static get properties() {
    return {
      hass: {},
      config: {},
      active: {}
    };
  }
  
  constructor() {
    super();
  }
  
  render() {
    var entity = this.config.entity;
    var stateObj = this.hass.states[entity];
    var icon = this.config.icon ? this.config.icon : stateObj.attributes.icon ? stateObj.attributes.icon: 'mdi:lightbulb';
        
    var targetTemp = 19;
    
    var stateObj: any = {
      attributes: {
        // target_temp_low: 17,
        // target_temp_high: 22,
        min_temp: 0,
        max_temp: 40
      }
    }
    var _handleSize = 20;
    var _stepSize = stateObj.attributes.target_temp_step ? stateObj.attributes.target_temp_step : 0.5;
    var gradient = true;
    var gradientPoints = [
      {point: 0, color: '#77d5e1'},
      // {point: 50, color: '#6db06a'},
      {point: 100, color: '#f3bd3f'}
    ];

    return html`
      <div class="popup-wrapper" @click="${e => this._close(e)}">
        <div class="popup-inner">
          <div class="info">
            <div class="temp">
              22&#176;
            </div>
            <div class="right">
              <div class="name">Name</div>
              <div class="action">Koelen 21&#176;</div>
            </div>
          </div>


          <div id="controls">
            <div id="slider">
              <custom-round-slider
                .value=${targetTemp}
                .low=${stateObj.attributes.target_temp_low}
                .high=${stateObj.attributes.target_temp_high}
                .min=${stateObj.attributes.min_temp}
                .max=${stateObj.attributes.max_temp}
                .step=${_stepSize}
                .handleSize=${_handleSize}
                .gradient=${gradient}
                .gradientPoints=${gradientPoints}
                @value-changing=${this._dragEvent}
                @value-changed=${this._setTemperature}
              ></custom-round-slider>

              <div id="slider-center">
                <div class="values">
                  <div class="action">Koelen</div>
                  <div class="value">21&#176;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  updated() { }

  _close(event) {
      if(event && event.target.className === 'popup-inner') {
          closePopUp();
      }
  }

  _dragEvent(e): void {
    const stateObj = this.hass!.states[this.config!.entity];

    if (e.detail.low) {
      this._setTemp = [e.detail.low, stateObj.attributes.target_temp_high];
    } else if (e.detail.high) {
      this._setTemp = [stateObj.attributes.target_temp_low, e.detail.high];
    } else {
      this._setTemp = e.detail.value;
    }
  }

  _setTemperature(e): void {
    const stateObj = this.hass!.states[this.config!.entity];

    if (e.detail.low) {
      this.hass!.callService("climate", "set_temperature", {
        entity_id: this.config!.entity,
        target_temp_low: e.detail.low,
        target_temp_high: stateObj.attributes.target_temp_high,
      });
    } else if (e.detail.high) {
      this.hass!.callService("climate", "set_temperature", {
        entity_id: this.config!.entity,
        target_temp_low: stateObj.attributes.target_temp_low,
        target_temp_high: e.detail.high,
      });
    } else {
      this.hass!.callService("climate", "set_temperature", {
        entity_id: this.config!.entity,
        temperature: e.detail.value,
      });
    }
  }
  
  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this.config = config;
  }

  getCardSize() {
    return this.config.entities.length + 1;
  }
  
  static get styles() {
    return css`
        :host {
            background-color:#000!important;
        }
        .popup-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .popup-inner {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .info {
          display:flex;
          flex-direction:row;
          margin-bottom: 40px;
        }
        .info .temp {
          background-color: #67cd67;
          height: 60px;
          width: 60px;  
          text-align:center;
          line-height:60px;
          border-radius:100%;
          color:#FFF;
          font-size:18px;
        }
        .info .right {
          display:flex;
          flex-direction:column;
          margin-left:15px;
          height:60px;
          align-items:center;
          justify-content:center;
        }
        .info .right .name {
          color:#FFF;
          font-size:24px;
        }
        .info .right .action {
          color: #8b8a8f;
          font-size:12px;
        }
        
        /* CONTROLS */
        
        .heat_cool {
          --mode-color: var(--auto-color);
        }
        .cool {
          --mode-color: var(--cool-color);
        }
        .heat {
          --mode-color: var(--heat-color);
        }
        .manual {
          --mode-color: var(--manual-color);
        }
        .off {
          --mode-color: var(--off-color);
        }
        .fan_only {
          --mode-color: var(--fan_only-color);
        }
        .eco {
          --mode-color: var(--eco-color);
        }
        .dry {
          --mode-color: var(--dry-color);
        }
        .idle {
          --mode-color: var(--idle-color);
        }
        .unknown-mode {
          --mode-color: var(--unknown-color);
        }
        #controls {
          display: flex;
          justify-content: center;
          padding: 16px;
          position: relative;
          width:500px;
        }
        #slider {
          height: 100%;
          width: 100%;
          position: relative;
          max-width: 300px;
          min-width: 250px;
        }
        round-slider {
          --round-slider-path-color: var(--disabled-text-color);
          --round-slider-bar-color: var(--mode-color);
          padding-bottom: 10%;
        }
        #slider-center {
          position: absolute;
          width: calc(100% - 120px);
          height: calc(100% - 120px);
          box-sizing: border-box;
          border-radius: 100%;
          left: 60px;
          top: 60px;
          text-align: center;
          overflow-wrap: break-word;
          pointer-events: none;
        }
        
        .values {
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          height:100%;
          width:100%;
        }
        .values .action {
          color:#f4b941;
          font-size:10px;
          text-transform:uppercase;
        }
        .values .value {
          color:#FFF;
          font-size:60px;
          line-height: 60px;
        }
        
        #modes > * {
          color: var(--disabled-text-color);
          cursor: pointer;
          display: inline-block;
        }
        #modes .selected-icon {
          color: var(--mode-color);
        }
        text {
          fill: var(--primary-text-color);
        }
    `;
  }
}

customElements.define('thermostat-popup-card', ThermostatPopupCard);

class CustomRoundSlider extends LitElement {
  shadowRoot: any;
  min: any;
  max: any;
  step: any;
  startAngle: any;
  arcLength: any;
  handleSize: any;
  handleZoom: any;
  disabled: any;
  dragging: any;
  rtl: any;
  _scale: any;
  gradient: any;
  gradientPoints: any
  value: any;
  high: any;
  low: any;
  _rotation: any;
  _reverseOrder: any;

  static get properties() {
    return {
      value: {type: Number},
      high: {type: Number},
      low: {type: Number},
      min: {type: Number},
      max: {type: Number},
      step: {type: Number},
      startAngle: {type: Number},
      arcLength: {type: Number},
      handleSize: {type: Number},
      handleZoom: {type: Number},
      disabled: {type: Boolean},
      dragging: {type: Boolean, reflect: true},
      rtl: {type: Boolean},
      _scale: {type: Number},
      gradient: {type: Boolean},
      gradientPoints: {type: Array}
    }
  }

  constructor() {
    super();
    this.min = 0;
    this.max = 100;
    this.step = 1;
    this.startAngle = 135;
    this.arcLength = 270;
    this.handleSize = 6;
    this.handleZoom = 1.5;
    this.disabled = false;
    this.dragging = false;
    this.rtl = false;
    this._scale = 1;
    this.gradient = false;
    this.gradientPoints = [];
  }

  get _start() {
    return this.startAngle*Math.PI/180;
  }
  get _len() {
    // Things get weird if length is more than a complete turn
    return Math.min(this.arcLength*Math.PI/180, 2*Math.PI-0.01);
  }
  get _end() {
    return this._start + this._len;
  }

  get _enabled() {
    // If handle is disabled
    if(this.disabled) return false;
    if(this.value == null && (this.high == null || this.low == null)) return false;

    if(this.value != null && (this.value > this.max || this.value < this.min)) return false;
    if(this.high != null && (this.high > this.max || this.high < this.min)) return false;
    if(this.low != null && (this.low > this.max || this.low < this.min)) return false;
    return true;
  }

  _angleInside(angle) {
    // Check if an angle is on the arc
    let a = (this.startAngle + this.arcLength/2 - angle + 180 + 360) % 360 - 180;
    return (a < this.arcLength/2 && a > -this.arcLength/2);
  }
  _angle2xy(angle) {
    if(this.rtl)
      return {x: -Math.cos(angle), y: Math.sin(angle)}
    return {x: Math.cos(angle), y: Math.sin(angle)}
  }
  _xy2angle(x,y) {
    if(this.rtl)
      x = -x;
    return (Math.atan2(y,x) - this._start + 2*Math.PI) % (2*Math.PI);
  }

  _value2angle(value) {
    const fraction = (value - this.min)/(this.max - this.min);
    return this._start + fraction * this._len;
  }
  _angle2value(angle) {
    return Math.round((angle/this._len*(this.max - this.min) + this.min)/this.step)*this.step;
  }


  get _boundaries() {
    // Get the maximum extents of the bar arc
    const start = this._angle2xy(this._start);
    const end = this._angle2xy(this._end);

    let up = 1;
    if(!this._angleInside(270))
      up =  Math.max(-start.y, -end.y);

    let down = 1;
    if(!this._angleInside(90))
      down = Math.max(start.y, end.y);

    let left = 1;
    if(!this._angleInside(180))
      left = Math.max(-start.x, -end.x);

    let right = 1;
    if(!this._angleInside(0))
      right = Math.max(start.x, end.x);

    return {
      up, down, left, right,
      height: up+down,
      width: left+right,
    };
  }

  dragStart(ev) {
    let handle = ev.target;

    // Avoid double events mouseDown->focus
    if(this._rotation && this._rotation.type !== "focus") return;

    // If an invisible handle was clicked, switch to the visible counterpart
    if(handle.classList.contains("overflow"))
      handle = handle.nextElementSibling

    if(!handle.classList.contains("handle")) return;
    handle.setAttribute('stroke-width', 2*this.handleSize*this.handleZoom*this._scale);

    const min = handle.id === "high" ? this.low : this.min;
    const max = handle.id === "low" ? this.high : this.max;
    this._rotation = { handle, min, max, start: this[handle.id], type: ev.type};
    this.dragging = true;
  }

  dragEnd() {
    if(!this._rotation) return;

    const handle = this._rotation.handle;
    handle.setAttribute('stroke-width', 2*this.handleSize*this._scale);

    this._rotation = false;
    this.dragging = false;

    handle.blur();

    let event = new CustomEvent('value-changed', {
      detail: {
        [handle.id] : this[handle.id],
      }
    });
    this.dispatchEvent(event);

    // This makes the low handle render over the high handle if they both are
    // close to the top end.  Otherwise if would be unclickable, and the high
    // handle locked by the low.  Calcualtion is done in the dragEnd handler to
    // avoid "z fighting" while dragging.
    if(this.low && this.low >= 0.99*this.max)
      this._reverseOrder = true;
    else
      this._reverseOrder = false;
  }

  drag(ev) {
    if(!this._rotation) return;
    if(this._rotation.type === "focus") return;

    ev.preventDefault();

    const mouseX = (ev.type === "touchmove") ? ev.touches[0].clientX : ev.clientX;
    const mouseY = (ev.type === "touchmove") ? ev.touches[0].clientY : ev.clientY;

    const rect = this.shadowRoot.querySelector("svg").getBoundingClientRect();
    const boundaries = this._boundaries;
    const x = mouseX - (rect.left + boundaries.left*rect.width/boundaries.width);
    const y = mouseY - (rect.top + boundaries.up*rect.height/boundaries.height);

    const angle = this._xy2angle(x,y);
    const pos = this._angle2value(angle);
    this._dragpos(pos);
  }

  _dragpos(pos) {
    if(pos < this._rotation.min || pos > this._rotation.max) return;

    const handle = this._rotation.handle;
    this[handle.id] = pos;

    let event = new CustomEvent('value-changing', {
      detail: {
        [handle.id] : pos,
      }
    });
    this.dispatchEvent(event);
  }

  _keyStep(ev) {
    if(!this._rotation) return;
    const handle = this._rotation.handle;
    if(ev.key === "ArrowLeft")
      if(this.rtl)
        this._dragpos(this[handle.id] + this.step);
      else
        this._dragpos(this[handle.id] - this.step);
    if(ev.key === "ArrowRight")
      if(this.rtl)
        this._dragpos(this[handle.id] - this.step);
      else
        this._dragpos(this[handle.id] + this.step);
  }

  firstUpdated() {
    document.addEventListener('mouseup', this.dragEnd.bind(this));
    document.addEventListener('touchend', this.dragEnd.bind(this), {passive: false});
    document.addEventListener('mousemove', this.drag.bind(this));
    document.addEventListener('touchmove', this.drag.bind(this), {passive: false});
    document.addEventListener('keydown', this._keyStep.bind(this));
  }

  updated(changedProperties) {

    // Workaround for vector-effect not working in IE and pre-Chromium Edge
    // That's also why the _scale property exists
    if(this.shadowRoot.querySelector("svg")
    && this.shadowRoot.querySelector("svg").style.vectorEffect !== undefined)
      return;
    if(changedProperties.has("_scale") && this._scale != 1) {
      this.shadowRoot.querySelector("svg").querySelectorAll("path").forEach((e) => {
        if(e.getAttribute('stroke-width')) return;
        const orig = parseFloat(getComputedStyle(e).getPropertyValue('stroke-width'));
        e.style.strokeWidth = `${orig*this._scale}px`;
      });
    }
    const rect = this.shadowRoot.querySelector("svg").getBoundingClientRect();
    const scale = Math.max(rect.width, rect.height);
    this._scale = 2/scale;
  }



  _renderArc(start, end) {
    const diff = end-start;
    start = this._angle2xy(start);
    end = this._angle2xy(end+0.001); // Safari doesn't like arcs with no length
    return `
      M ${start.x} ${start.y}
      A 1 1,
        0,
        ${(diff) > Math.PI ? "1" : "0"} ${this.rtl ? "0" : "1"},
        ${end.x} ${end.y}
    `;
  }

  _renderHandle(id) {
    const theta = this._value2angle(this[id]);

    console.log(theta);

    const pos = this._angle2xy(theta);

    console.log(pos);

    // Two handles are drawn. One visible, and one invisible that's twice as
    // big. Makes it easier to click.
    return svg`
      <g class="${id} handle">
        <path
          id=${id}
          class="overflow"
          d="
          M ${pos.x} ${pos.y}
          L ${pos.x+0.001} ${pos.y+0.001}
          "
          vector-effect="non-scaling-stroke"
          stroke="rgba(0,0,0,0)"
          stroke-width="${4*this.handleSize*this._scale}"
          />
        <path
          id=${id}
          class="handle"
          d="
          M ${pos.x} ${pos.y}
          L ${pos.x+0.001} ${pos.y+0.001}
          "
          vector-effect="non-scaling-stroke"
          stroke-width="${2*this.handleSize*this._scale}"
          tabindex="0"
          @focus=${this.dragStart}
          @blur=${this.dragEnd}
          />
        </g>
      `
  };

  render() {
    const view = this._boundaries;
    console.log(this);
    console.log(this.gradientPoints);
    return html`
      <svg
        @mousedown=${this.dragStart}
        @touchstart=${this.dragStart}
        xmln="http://www.w3.org/2000/svg"
        viewBox="${-view.left} ${-view.up} ${view.width} ${view.height}"
        style="margin: ${this.handleSize*this.handleZoom}px;"
        focusable="false"
      >
        ${ this.gradient ? html`
        
        ` : html``}
        <g class="slider">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            ${this.gradientPoints.map(gradientPoint => svg`<stop offset="${gradientPoint.point}%" style="stop-color:${gradientPoint.color};" />`)}
            </linearGradient>
          </defs>
          <path
            class="path" style="${this.gradient ? 'stroke: url(#gradient);' : 'stroke: var(--round-slider-path-color, lightgray);'}" 
            d=${this._renderArc(this._start, this._end)}
            vector-effect="non-scaling-stroke"
          />
          ${ this._enabled
            ? svg`
              <path
                class="bar"
                vector-effect="non-scaling-stroke"
                d=${this._renderArc(
                  this._value2angle(this.low != null ? this.low : this.min),
                  this._value2angle(this.high != null ? this.high : this.value)
                )}
              />
              

              <path
                class="block"
                vector-effect="non-scaling-stroke"
                d=${this._renderArc(
                  this._start,
                  this._value2angle(this.low != null ? this.low : this.min)
                )}
              />
              <path
                class="block-dash"
                stroke-dasharray="5, 2"
                vector-effect="non-scaling-stroke"
                d=${this._renderArc(
                  this._start,
                  this._value2angle(this.low != null ? this.low : this.min)
                )}
              />


              <path
                class="block"
                vector-effect="non-scaling-stroke"
                d=${this._renderArc(
                  this._value2angle(this.high != null ? this.high : this.value),
                  this._end
                )}
              />

              <path
                class="block-dash"
                stroke-dasharray="2, 25"
                vector-effect="non-scaling-stroke"
                d=${this._renderArc(
                  this._value2angle(this.high != null ? this.high : this.value),
                  this._end
                )}
              />

              
              `
            : ``
          }
        </g>
        <g class="handles">
        ${ this._enabled
          ? this.low != null
              ? this._reverseOrder
                ? html`${this._renderHandle("high")} ${this._renderHandle("low")}`
                : html`${this._renderHandle("low")} ${this._renderHandle("high")}`
              : html`${this._renderHandle("value")}`
          : ``
        }
        </g>
        
      </svg>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        width: 100%;
      }
      svg {
        overflow: visible;
      }
      .slider {
        fill: none;
        stroke-width: var(--round-slider-path-width, 30);
        stroke-linecap: var(--round-slider-linecap, butt);
      }
      .path {
      }
      .bar {
        stroke: var(--round-slider-bar-color, transparent);
      }
      .block {
        stroke: var(--round-slider-block-color, #2c2c2e);
      }
      .block-dash {
        stroke-width: var(--round-slider-dash-width, 20);
        stroke: var(--round-slider-block-dash-color, #363638);
      }
      g.handles {
        stroke: var(--round-slider-handle-color, var(--round-slider-bar-color, deepskyblue));
        stroke-linecap: round;
      }
      g.low.handle {
        stroke: var(--round-slider-low-handle-color);
      }
      g.high.handle {
        stroke: var(--round-slider-high-handle-color);
      }
      .handle:focus {
        outline: unset;
      }
    `;
  }

}
customElements.define('custom-round-slider', CustomRoundSlider);