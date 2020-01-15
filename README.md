[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)

# Thermostat popup card (homekit style)
Popup lovelace card for thermostats.
Can be used in combination with thomas loven browser_mod or custom pop-up card or in combination with my homekit style card: https://github.com/DBuit/Homekit-panel-card

<a href="https://www.buymeacoffee.com/ZrUK14i" target="_blank"><img height="41px" width="167px" src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee"></a>

## Configuration

### Installation instructions

**HACS installation:**
Go to the hacs store and use the repo url `https://github.com/DBuit/thermostat-popup-card` and add this as a custom repository under settings.

Add the following to your ui-lovelace.yaml:
```yaml
resources:
  url: /community_plugin/thermostat-popup-card/thermostat-popup-card.js
  type: module
```

**Manual installation:**
Copy the .js file from the dist directory to your www directory and add the following to your ui-lovelace.yaml file:

```yaml
resources:
  url: /local/thermostat-popup-card.js
  type: module
```

### Main Options

| Name | Type | Default | Supported options | Description |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity` | string | **Required** | `climate.nest` | Entity of the thermostat |
| `fullscreen` | boolean | optional| true | If false it will remove the pop-up wrapper which makes it fullscreen |
| `stepSize` | number | optional| 1 | If your climate gives a target_temp_step in the attributes this will be used, fallback is 1 if you don't set in in your configuration. |


Example configuration in lovelace-ui.yaml
```
popup_cards:
  climate.test:
    title: ""
    style:
      position: fixed
      z-index: 999
      top: 0
      left: 0
      height: 100%
      width: 100%
      display: block
      align-items: center
      justify-content: center
      background: rgba(0, 0, 0, 0.8)
      flex-direction: column
      margin: 0
      "--iron-icon-fill-color": "#FFF"
    card:
      type: custom:thermostat-popup-card
      entity: climate.test
```
