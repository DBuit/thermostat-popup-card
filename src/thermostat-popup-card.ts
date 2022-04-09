import { LitElement, html, css, svg } from 'lit-element';
import { classMap } from "lit-html/directives/class-map";
import { closePopUp } from 'card-tools/src/popup';
import { computeStateDisplay, computeStateName } from 'custom-card-helpers';

class ThermostatPopupCard extends LitElement {
  config: any;
  hass: any;
  shadowRoot: any;
  _setTemp: any;
  hvacModeOrdering = {
    auto: 1,
    heat_cool: 2,
    heat: 3,
    cool: 4,
    dry: 5,
    fan_only: 6,
    off: 7,
  };
  modeIcons = {
    auto: "hass:calendar-repeat",
    heat_cool: "hass:autorenew",
    heat: "hass:fire",
    cool: "hass:snowflake",
    off: "hass:power",
    fan_only: "hass:fan",
    dry: "hass:water-percent",
  };
  settings = false;
  settingsCustomCard = false;
  settingsPosition = "bottom";

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

    // REAL DATA
    var name = this.config!.name || computeStateName(this.hass!.states[this.config!.entity]);
    var targetTemp = stateObj.attributes.temperature !== null && stateObj.attributes.temperature ? stateObj.attributes.temperature : stateObj.attributes.min_temp;
    var currentTemp = stateObj.attributes.current_temperature
    var mode = stateObj.state in this.modeIcons ? stateObj.state : "unknown-mode";
    
    var _handleSize = 15;
    var _stepSize = this.config.stepSize ? this.config.stepSize : stateObj.attributes.target_temp_step ? stateObj.attributes.target_temp_step : 1;
    var gradient = true;
    var gradientPoints = [
      {point: 0, color: '#4fdae4'},
      {point: 10, color: '#2da9d8'},
      {point: 25, color: '#56b557'},
      {point: 50, color: '#f4c807'},
      {point: 70, color: '#faaa00'},
      {point: 100, color: '#f86618'},
    ];
    var fullscreen = "fullscreen" in this.config ? this.config.fullscreen : true;
    this.settings = "settings" in this.config? true : false;
    this.settingsCustomCard = "settingsCard" in this.config? true : false;
    this.settingsPosition = "settingsPosition" in this.config ? this.config.settingsPosition : "bottom";
    if(this.settingsCustomCard && this.config.settingsCard.cardOptions) {
      if(this.config.settingsCard.cardOptions.entity && this.config.settingsCard.cardOptions.entity == 'this') {
        this.config.settingsCard.cardOptions.entity = entity;
      } else if(this.config.settingsCard.cardOptions.entity_id && this.config.settingsCard.cardOptions.entity_id == 'this') {
        this.config.settingsCard.cardOptions.entity_id = entity;
      } else if(this.config.settingsCard.cardOptions.entities) {
        for(let key in this.config.settingsCard.cardOptions.entities) {
          if(this.config.settingsCard.cardOptions.entities[key] == 'this') {
            this.config.settingsCard.cardOptions.entities[key] = entity;
          }
        }
      }
    }

    return html`
      <div class="${fullscreen === true ? 'popup-wrapper':''}">
        <div class="${classMap({[mode]: true})}" style="display:flex;width:100%;height:100%;">
          <div id="popup" class="popup-inner" @click="${e => this._close(e)}">
            <div class="info${fullscreen === true ? ' fullscreen':''}">
              <div class="temp ${mode}">
                ${currentTemp}&#176;
              </div>
              <div class="right">
                <div class="name">${name}</div>
                <div class="action">
                ${
                  stateObj.attributes.hvac_action
                    ? this.hass!.localize(
                        `state_attributes.climate.hvac_action.${stateObj.attributes.hvac_action}`
                      )
                    : this.hass!.localize(`state.climate.${stateObj.state}`)
                }
                ${
                  stateObj.attributes.preset_mode &&
                  stateObj.attributes.preset_mode !== "none"
                    ? html`
                        -
                        ${this.hass!.localize(
                          `state_attributes.climate.preset_mode.${stateObj.attributes.preset_mode}`
                        ) || stateObj.attributes.preset_mode}
                      `
                    : ""
                }
                ${targetTemp}&#176;</div>
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
                    <div class="action">
                      ${
                        stateObj.attributes.hvac_action
                          ? this.hass!.localize(
                              `state_attributes.climate.hvac_action.${stateObj.attributes.hvac_action}`
                            )
                          : this.hass!.localize(`state.climate.${stateObj.state}`)
                      }
                      ${
                        stateObj.attributes.preset_mode &&
                        stateObj.attributes.preset_mode !== "none"
                          ? html`
                              -
                              ${this.hass!.localize(
                                `state_attributes.climate.preset_mode.${stateObj.attributes.preset_mode}`
                              ) || stateObj.attributes.preset_mode}
                            `
                          : ""
                      }
                    </div>
                    <div class="value">
                      ${
                        !this._setTemp
                          ? ""
                          : Array.isArray(this._setTemp)
                          ? _stepSize === 1
                            ? svg`
                                ${this._setTemp[0].toFixed()}&#176; -
                                ${this._setTemp[1].toFixed()}&#176;
                                `
                            : svg`
                                ${this._setTemp[0].toFixed(1)}&#176; -
                                ${this._setTemp[1].toFixed(1)}&#176;
                                `
                          : _stepSize === 1
                          ? svg`
                                ${this._setTemp.toFixed()}&#176;
                                `
                          : svg`
                                ${this._setTemp.toFixed(1)}&#176;
                                `
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="modes">
              ${(stateObj.attributes.hvac_modes || [])
                .concat()
                .sort(this._compareClimateHvacModes)
                .map((modeItem) => this._renderIcon(modeItem, mode))}
            </div>
            ${this.settings ? html`<button class="settings-btn ${this.settingsPosition}${fullscreen === true ? ' fullscreen':''}" @click="${() => this._openSettings()}">${this.config.settings.openButton ? this.config.settings.openButton:'Settings'}</button>`:html``}
          </div>
          ${this.settings ? html`
            <div id="settings" class="settings-inner" @click="${e => this._close(e)}">
              ${this.settingsCustomCard ? html`
                <card-maker nohass data-card="${this.config.settingsCard.type}" data-options="${JSON.stringify(this.config.settingsCard.cardOptions)}" data-style="${this.config.settingsCard.cardStyle ? this.config.settingsCard.cardStyle : ''}">
                </card-maker>
              `:html`
                  <more-info-controls
                  .dialogElement=${null}
                  .canConfigure=${false}
                  .hass=${this.hass}
                  .stateObj=${stateObj}
                  style="--paper-slider-knob-color: white !important;
                  --paper-slider-knob-start-color: white !important;
                  --paper-slider-pin-color: white !important;
                  --paper-slider-active-color: white !important;
                  color: white !important;
                  --primary-text-color: white !important;"
                ></more-info-controls>
              `}
              <button class="settings-btn ${this.settingsPosition}${fullscreen === true ? ' fullscreen':''}" @click="${() => this._closeSettings()}">${this.config.settings.closeButton ? this.config.settings.closeButton:'Close'}</button>
            </div>
          `:html``}
        </div>
      </div>
    `;
  }

  firstUpdated() {
    if(this.settings && !this.settingsCustomCard) {
    const mic = this.shadowRoot.querySelector("more-info-controls").shadowRoot;
    mic.removeChild(mic.querySelector("app-toolbar"));
    } else if(this.settings && this.settingsCustomCard) {
      this.shadowRoot.querySelectorAll("card-maker").forEach(customCard => {
        var card = {
          type: customCard.dataset.card
        };
        card = Object.assign({}, card, JSON.parse(customCard.dataset.options));
        customCard.config = card;

        let style = "";
        if(customCard.dataset.style) {
          style = customCard.dataset.style;
        }

        if(style != "") {
          let itterations = 0;
          let interval = setInterval(function () {
            let el = customCard.children[0];
            if(el) {
              window.clearInterval(interval);

              var styleElement = document.createElement('style');
              styleElement.innerHTML = style;
              el.shadowRoot.appendChild(styleElement);

            } else if (++itterations === 10 ) {
              window.clearInterval(interval);
            }
          }, 100);
        }
      });
    }
  }
  
  updated() {
    this._setTemp = this._getSetTemp(this.hass!.states[this.config!.entity]);
  }

  _openSettings() {
    this.shadowRoot.getElementById('popup').classList.add("off");
    this.shadowRoot.getElementById('settings').classList.add("on");
  }
  _closeSettings() {
    this.shadowRoot.getElementById('settings').classList.remove("on");
    this.shadowRoot.getElementById('popup').classList.remove("off");
  }

  _renderIcon(mode: string, currentMode: string) {
    if (!this.modeIcons[mode]) {
      return html``;
    }
    return html`
      <ha-icon-button
        class="${classMap({ "selected-icon": currentMode === mode })}"
        .mode="${mode}"
        @click="${this._handleModeClick}"
        tabindex="0"
      ><ha-icon icon="${this.modeIcons[mode]}"></ha-icon></ha-icon-button>
    `;
  }

  
  _handleModeClick(e: MouseEvent): void {
    this.hass!.callService("climate", "set_hvac_mode", {
      entity_id: this.config!.entity,
      hvac_mode: (e.currentTarget as any).mode,
    });
  }




  _getSetTemp(stateObj) {
    if (stateObj.state === "unavailable") {
      return this.hass!.localize("state.default.unavailable");
    }

    if (
      stateObj.attributes.target_temp_low &&
      stateObj.attributes.target_temp_high
    ) {
      return [
        stateObj.attributes.target_temp_low,
        stateObj.attributes.target_temp_high,
      ];
    }

    return stateObj.attributes.temperature;
  }

  _close(event) {
    if(event && (event.target.className.includes('popup-inner') || event.target.className.includes('settings-inner'))) {
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

  _compareClimateHvacModes = (mode1, mode2) => this.hvacModeOrdering[mode1] - this.hvacModeOrdering[mode2];
  
  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this.config = config;
  }

  getCardSize() {
    return 1;
  }
  
  static get styles() {
    return css`
        :host {
            --auto-color: #EE7600;
            --eco-color: springgreen;
            --cool-color: #2b9af9;
            --heat-color: #EE7600;
            --manual-color: #44739e;
            --off-color: lightgrey;
            --fan_only-color: #8a8a8a;
            --dry-color: #efbd07;
            --idle-color: #00CC66;
            --unknown-color: #bac;
        }
        .popup-wrapper {
          margin-top:64px;
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
        .popup-inner.off {
          display:none;
        }
        #settings {
          display:none;
        }
        .settings-inner {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        #settings.on {
          display:flex;
        }
        .settings-btn {
          position:absolute;
          right:30px;
          background-color: #7f8082;
          color: #FFF;
          border: 0;
          padding: 5px 20px;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
        }
        .settings-btn.bottom {
          bottom:15px;
        }
        .settings-btn.top {
          top: 25px;
        }
        .settings-btn.bottom.fullscreen {
          margin:0;
        }
        .fullscreen {
          margin-top:-64px;
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

        .info .temp.heat_cool {
          background-color: var(--auto-color);
        }
        .info .temp.cool {
          background-color: var(--cool-color);
        }
        .info .temp.heat {
          background-color: var(--heat-color);
        }
        .info .temp.manual {
          background-color: var(--manual-color);
        }
        .info .temp.off {
          background-color: var(--off-color);
        }
        .info .temp.fan_only {
          background-color: var(--fan_only-color);
        }
        .info .temp.eco {
          background-color: var(--eco-color);
        }
        .info .temp.dry {
          background-color: var(--dry-color);
        }
        .info .temp.idle {
          background-color: var(--idle-color);
        }
        .info .temp.unknown-mode {
          background-color: var(--unknown-color);
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
          color: var(--primary-text-color);
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
    this.handleZoom = 5;
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
    if(this._rotation && this._rotation.type !== "focus") {
      return;
    }

    // If an invisible handle was clicked, switch to the visible counterpart
    if(handle.classList.contains("overflow")) {
      handle = handle.nextElementSibling
    }
      

    if(!handle.classList.contains("handle")) return;
    handle.setAttribute('stroke-width', (this.handleSize*this._scale) + 5 + this.handleZoom);

    const min = handle.id === "high" ? this.low : this.min;
    const max = handle.id === "low" ? this.high : this.max;
    this._rotation = { handle, min, max, start: this[handle.id], type: ev.type};
    this.dragging = true;
  }

  dragEnd() {
    if(!this._rotation) return;

    const handle = this._rotation.handle;
    handle.setAttribute('stroke-width', (this.handleSize*this._scale) + 5);

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
    const pos = this._angle2xy(theta);

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
          stroke-linecap="round"
          stroke-width="${4*this.handleSize*this._scale}"
          />
        <path
          id=${id}
          class="handle"
          d=${this._renderArc(
            this._value2angle(id != 'low' ? this[id]-0.35: this[id] + 0.35),
            this._value2angle(this[id])
          )}
          vector-effect="non-scaling-stroke"
          tabindex="0"
          @focus=${this.dragStart}
          @blur=${this.dragEnd}
          />
        </g>
      `
  };

  render() {
    const view = this._boundaries;
    return html`
      <svg
        @mousedown=${this.dragStart}
        @touchstart=${this.dragStart}
        xmln="http://www.w3.org/2000/svg"
        viewBox="${-view.left} ${-view.up} ${view.width} ${view.height}"
        style="margin: 30px;"
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
                class="block"
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
                  this._start,
                  this._end
                )}
              />
              <path
                class="bar"
                vector-effect="non-scaling-stroke"
                d=${this._renderArc(
                  this._value2angle(this.low != null ? this.low : this.min),
                  this._value2angle(this.high != null ? this.high : this.value)
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
        stroke-width: var(--round-slider-block-path-width, 31);
        stroke: #2c2c2e;
      }
      .block-dash {
        stroke-width: var(--round-slider-dash-width, 20);
        stroke: var(--round-slider-block-dash-color, rgba(255,255,255,0.1));
      }
      g.handles {
        stroke: var(--round-slider-handle-color, var(--round-slider-bar-color, deepskyblue));
        stroke-linecap: round;
      }
      g.handle {
        stroke-width: var(--round-slider-dash-width, 20);
        stroke: #FFF;
        stroke-dasharray: 3, 8;
        stroke-linecap: butt;
      }
      .handle:focus {
        outline: unset;
      }
    `;
  }

}
customElements.define('custom-round-slider', CustomRoundSlider);